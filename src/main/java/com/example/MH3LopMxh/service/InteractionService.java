package com.example.MH3LopMxh.service;

import com.example.MH3LopMxh.dto.PostDTO;
import com.example.MH3LopMxh.model.Interact;
import com.example.MH3LopMxh.model.Interaction;
import com.example.MH3LopMxh.model.Post;
import com.example.MH3LopMxh.model.User;
import com.example.MH3LopMxh.repository.InteractRepository;
import com.example.MH3LopMxh.repository.InteractionRepository;
import com.example.MH3LopMxh.repository.PostRepository;
import com.example.MH3LopMxh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class InteractionService {
    
    @Autowired
    private InteractionRepository interactionRepository;
    
    @Autowired
    private InteractRepository interactRepository;
    
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Interaction> getInteractionsByPostId(Long postId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        return optionalPost.map(interactionRepository::findByPost).orElse(null);
    }
    
    @Transactional
    public Interaction createOrUpdateInteraction(Long postId, Long userId, Long interactId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<Interact> optionalInteract = interactRepository.findById(interactId);
        
        if (optionalPost.isPresent() && optionalUser.isPresent() && optionalInteract.isPresent()) {
            Post post = optionalPost.get();
            User user = optionalUser.get();
            Interact interact = optionalInteract.get();
            
            Optional<Interaction> optionalInteraction = interactionRepository.findByPostAndUser(post, user);
            
            if (optionalInteraction.isPresent()) {
                Interaction interaction = optionalInteraction.get();
                if (interaction.getInteract().getIdInteract().equals(interactId)) {
                    // Cùng loại cảm xúc → xóa (bỏ cảm xúc)
                    interactionRepository.delete(interaction);
                    return null; // hoặc throw custom "removed" nếu cần
                } else {
                    // Khác loại → cập nhật
                    interaction.setInteract(interact);
                    return interactionRepository.save(interaction);
                }
            } else {
                Interaction interaction = new Interaction();
                interaction.setPost(post);
                interaction.setUser(user);
                interaction.setInteract(interact);
                return interactionRepository.save(interaction);
            }
        } else {
            throw new RuntimeException("Không tìm thấy bài đăng, người dùng hoặc loại tương tác");
        }
    }
    
    @Transactional
    public void deleteInteraction(Long postId, Long userId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        Optional<User> optionalUser = userRepository.findById(userId);
        
        if (optionalPost.isPresent() && optionalUser.isPresent()) {
            Post post = optionalPost.get();
            User user = optionalUser.get();
            
            Optional<Interaction> optionalInteraction = interactionRepository.findByPostAndUser(post, user);
            
            optionalInteraction.ifPresent(interactionRepository::delete);
        }
    }
    
    public Long countInteractionsByPostId(Long postId) {
        return interactionRepository.countByPostId(postId);
    }
    
    public Long countInteractionsByPostIdAndInteractId(Long postId, Long interactId) {
        return interactionRepository.countByPostIdAndInteractId(postId, interactId);
    }
    public Map<String, Long> getReactionStatistics(Long postId) {
        List<Interaction> interactions = getInteractionsByPostId(postId);
        Map<String, Long> stats = new HashMap<>();

        for (Interaction i : interactions) {
            String type = i.getInteract().getInteractType();
            stats.put(type, stats.getOrDefault(type, 0L) + 1);
        }

        return stats;
    }
    public Long getUserReaction(Long postId, Long userId) {
        return interactionRepository
                .findByPostAndUser(
                        postRepository.findById(postId).get(),
                        userRepository.findById(userId).get()
                )
                .map(i -> i.getInteract().getIdInteract())
                .orElse(null);
    }
}
