package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.Interaction;
import com.example.MH3LopMxh.model.Post;
import com.example.MH3LopMxh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InteractionRepository extends JpaRepository<Interaction, Long> {
    
    List<Interaction> findByPost(Post post);
    
    List<Interaction> findByUser(User user);
    
    Optional<Interaction> findByPostAndUser(Post post, User user);
    
    @Query("SELECT COUNT(i) FROM Interaction i WHERE i.post.idPost = :postId")
    Long countByPostId(@Param("postId") Long postId);
    
    @Query("SELECT COUNT(i) FROM Interaction i WHERE i.post.idPost = :postId AND i.interact.idInteract = :interactId")
    Long countByPostIdAndInteractId(@Param("postId") Long postId, @Param("interactId") Long interactId);
}
