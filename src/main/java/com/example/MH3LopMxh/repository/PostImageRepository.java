package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.PostImage;
import com.example.MH3LopMxh.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostImageRepository extends JpaRepository<PostImage, Long> {
    
    Optional<PostImage> findByPost(Post post);
}
