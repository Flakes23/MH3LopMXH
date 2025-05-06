package com.example.MH3LopMxh.service;

import com.example.MH3LopMxh.model.Comment;
import com.example.MH3LopMxh.model.Post;
import com.example.MH3LopMxh.model.PostComment;
import com.example.MH3LopMxh.model.User;
import com.example.MH3LopMxh.repository.CommentRepository;
import com.example.MH3LopMxh.repository.PostCommentRepository;
import com.example.MH3LopMxh.repository.PostRepository;
import com.example.MH3LopMxh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    
    @Autowired
    private CommentRepository commentRepository;
    
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PostCommentRepository postCommentRepository;
    
    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostIdOrderByCreateAtAsc(postId);
    }
    
    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }
    
    @Transactional
    public Comment createComment(Comment comment, Long postId, Long userId) {
        Optional<Post> optionalPost = postRepository.findById(postId);
        Optional<User> optionalUser = userRepository.findById(userId);
        
        if (optionalPost.isPresent() && optionalUser.isPresent()) {
            Post post = optionalPost.get();
            User user = optionalUser.get();
            
            comment.setCreateAt(LocalDateTime.now());
            comment.setUserSend(user);
            
            Comment savedComment = commentRepository.save(comment);
            
            PostComment postComment = new PostComment();
            postComment.setComment(savedComment);
            postComment.setPost(post);
            
            postCommentRepository.save(postComment);
            
            return savedComment;
        } else {
            throw new RuntimeException("Không tìm thấy bài đăng hoặc người dùng");
        }
    }
    
    @Transactional
    public Comment updateComment(Comment comment) {
        return commentRepository.save(comment);
    }
    
    @Transactional
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }
    
    public Long countCommentsByPostId(Long postId) {
        return commentRepository.countByPostId(postId);
    }
}
