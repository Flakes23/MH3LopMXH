package com.example.MH3LopMxh.service;

import com.example.MH3LopMxh.model.Relationship;
import com.example.MH3LopMxh.model.StatusRelationship;
import com.example.MH3LopMxh.model.User;
import com.example.MH3LopMxh.repository.RelationshipRepository;
import com.example.MH3LopMxh.repository.StatusRelationshipRepository;
import com.example.MH3LopMxh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class RelationshipService {
    
    @Autowired
    private RelationshipRepository relationshipRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private StatusRelationshipRepository statusRelationshipRepository;
    
    public List<Relationship> getFriendsByUserId(Long userId) {
        return relationshipRepository.findFriendsByUserId(userId);
    }
    
    public List<Relationship> getPendingRequestsForUser(Long userId) {
        return relationshipRepository.findPendingRequestsForUser(userId);
    }
    
    public List<Relationship> getSentRequestsByUser(Long userId) {
        return relationshipRepository.findSentRequestsByUser(userId);
    }
    
    @Transactional
    public Relationship sendFriendRequest(Long userOneId, Long userTwoId) {
        Optional<User> optionalUserOne = userRepository.findById(userOneId);
        Optional<User> optionalUserTwo = userRepository.findById(userTwoId);
        Optional<StatusRelationship> optionalStatus = statusRelationshipRepository.findByStatus("dagui");
        
        if (optionalUserOne.isPresent() && optionalUserTwo.isPresent() && optionalStatus.isPresent()) {
            User userOne = optionalUserOne.get();
            User userTwo = optionalUserTwo.get();
            StatusRelationship status = optionalStatus.get();
            
            // Kiểm tra xem đã có mối quan hệ nào chưa
            Optional<Relationship> optionalRelationship = relationshipRepository.findRelationship(userOne, userTwo);
            
            if (optionalRelationship.isPresent()) {
                Relationship relationship = optionalRelationship.get();
                relationship.setStatus(status);
                return relationshipRepository.save(relationship);
            } else {
                Relationship relationship = new Relationship();
                relationship.setUserOne(userOne);
                relationship.setUserTwo(userTwo);
                relationship.setStatus(status);
                return relationshipRepository.save(relationship);
            }
        } else {
            throw new RuntimeException("Không tìm thấy người dùng hoặc trạng thái mối quan hệ");
        }
    }
    
    @Transactional
    public Relationship acceptFriendRequest(Long relationshipId) {
        Optional<Relationship> optionalRelationship = relationshipRepository.findById(relationshipId);
        Optional<StatusRelationship> optionalStatus = statusRelationshipRepository.findByStatus("banbe");
        
        if (optionalRelationship.isPresent() && optionalStatus.isPresent()) {
            Relationship relationship = optionalRelationship.get();
            StatusRelationship status = optionalStatus.get();
            
            relationship.setStatus(status);
            return relationshipRepository.save(relationship);
        } else {
            throw new RuntimeException("Không tìm thấy yêu cầu kết bạn hoặc trạng thái mối quan hệ");
        }
    }
    
    @Transactional
    public Relationship rejectFriendRequest(Long relationshipId) {
        Optional<Relationship> optionalRelationship = relationshipRepository.findById(relationshipId);
        Optional<StatusRelationship> optionalStatus = statusRelationshipRepository.findByStatus("nguoila");
        
        if (optionalRelationship.isPresent() && optionalStatus.isPresent()) {
            Relationship relationship = optionalRelationship.get();
            StatusRelationship status = optionalStatus.get();
            
            relationship.setStatus(status);
            return relationshipRepository.save(relationship);
        } else {
            throw new RuntimeException("Không tìm thấy yêu cầu kết bạn hoặc trạng thái mối quan hệ");
        }
    }
    
    @Transactional
    public void unfriend(Long relationshipId) {
        Optional<Relationship> optionalRelationship = relationshipRepository.findById(relationshipId);
        Optional<StatusRelationship> optionalStatus = statusRelationshipRepository.findByStatus("nguoila");
        
        if (optionalRelationship.isPresent() && optionalStatus.isPresent()) {
            Relationship relationship = optionalRelationship.get();
            StatusRelationship status = optionalStatus.get();
            
            relationship.setStatus(status);
            relationshipRepository.save(relationship);
        } else {
            throw new RuntimeException("Không tìm thấy mối quan hệ bạn bè");
        }
    }
}
