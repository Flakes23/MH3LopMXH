package com.example.MH3LopMxh.service;

import com.example.MH3LopMxh.model.Message;
import com.example.MH3LopMxh.model.Relationship;
import com.example.MH3LopMxh.model.User;
import com.example.MH3LopMxh.repository.MessageRepository;
import com.example.MH3LopMxh.repository.RelationshipRepository;
import com.example.MH3LopMxh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class MessageService {
    
    @Autowired
    private MessageRepository messageRepository;
    
    @Autowired
    private RelationshipRepository relationshipRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Message> getMessagesByRelationship(Relationship relationship) {
        return messageRepository.findByRelationshipOrderByCreateAtAsc(relationship);
    }
    
    public Page<Message> getMessagesByRelationshipPaged(Relationship relationship, Pageable pageable) {
        return messageRepository.findByRelationshipOrderByCreateAtDesc(relationship, pageable);
    }
    
    @Transactional
    public Message sendMessage(Long fromUserId, Long toUserId, String content) {
        Optional<User> optionalFromUser = userRepository.findById(fromUserId);
        Optional<User> optionalToUser = userRepository.findById(toUserId);
        
        if (optionalFromUser.isPresent() && optionalToUser.isPresent()) {
            User fromUser = optionalFromUser.get();
            User toUser = optionalToUser.get();
            
            // Tìm mối quan hệ giữa hai người dùng
            Optional<Relationship> optionalRelationship = relationshipRepository.findRelationship(fromUser, toUser);
            
            if (optionalRelationship.isPresent()) {
                Relationship relationship = optionalRelationship.get();
                
                Message message = new Message();
                message.setContent(content);
                message.setCreateAt(LocalDateTime.now());
                message.setSeen(false);
                message.setRelationship(relationship);
                message.setFromUser(fromUser);
                message.setToUser(toUser);
                
                return messageRepository.save(message);
            } else {
                throw new RuntimeException("Không tìm thấy mối quan hệ giữa hai người dùng");
            }
        } else {
            throw new RuntimeException("Không tìm thấy người dùng");
        }
    }
    
    @Transactional
    public void markMessagesAsSeen(Long relationshipId, Long userId) {
        List<Message> unseenMessages = messageRepository.findUnseenMessagesByRelationshipAndUser(relationshipId, userId);
        
        for (Message message : unseenMessages) {
            message.setSeen(true);
            messageRepository.save(message);
        }
    }
    
    public Long countUnseenMessagesByUser(Long userId) {
        return messageRepository.countUnseenMessagesByUser(userId);
    }
    
    public List<Relationship> getRecentConversations(Long userId) {
        return messageRepository.findRecentConversations(userId);
    }
}
