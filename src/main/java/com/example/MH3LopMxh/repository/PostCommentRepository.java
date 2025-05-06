package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.PostComment;
import com.example.MH3LopMxh.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PostCommentRepository extends JpaRepository<PostComment, Long> {
    
    Optional<PostComment> findByComment(Comment comment);
}
