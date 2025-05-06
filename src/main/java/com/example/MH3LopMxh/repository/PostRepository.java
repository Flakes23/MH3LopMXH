package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    
    @Query("SELECT p FROM Post p WHERE p.isActive = true ORDER BY p.createAt DESC")
    Page<Post> findAllActivePosts(Pageable pageable);
    
    @Query("SELECT p FROM Post p JOIN p.postUser pu WHERE pu.user.idUser = :userId AND p.isActive = true ORDER BY p.createAt DESC")
    List<Post> findByUserIdOrderByCreateAtDesc(@Param("userId") Long userId);
    
    @Query("SELECT p FROM Post p WHERE p.content LIKE %:keyword% AND p.isActive = true ORDER BY p.createAt DESC")
    List<Post> searchPosts(@Param("keyword") String keyword);
}
