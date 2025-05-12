package com.example.MH3LopMxh.service;

import com.example.MH3LopMxh.dto.CommentDTO;
import com.example.MH3LopMxh.dto.UserProfileDTO;
import com.example.MH3LopMxh.model.*;
import com.example.MH3LopMxh.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UsersImageRepository usersImageRepository;

    @Autowired
    private UserAboutRepository userAboutRepository;

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostIdOrderByCreateAtAsc(postId);
    }

    public List<CommentDTO> getCommentDTOsByPostId(Long postId) {
        List<Comment> comments = getCommentsByPostId(postId);
        return comments.stream()
                .map(this::convertToCommentDTO)
                .collect(Collectors.toList());
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

            UUID uuid = UUID.randomUUID();
            comment.setIdComment(uuid.getMostSignificantBits() & 0x1FFFFFFFFFFFFFL);
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
    public CommentDTO createCommentDTO(CommentDTO commentDTO, Long postId, Long userId) {
        Comment comment = new Comment();
        comment.setContent(commentDTO.getContent());

        Comment createdComment = createComment(comment, postId, userId);
        return convertToCommentDTO(createdComment);
    }

    @Transactional
    public Comment updateComment(Comment comment) {
        return commentRepository.save(comment);
    }

    @Transactional
    public CommentDTO updateCommentDTO(CommentDTO commentDTO) {
        Optional<Comment> optionalComment = commentRepository.findById(commentDTO.getId());

        if (optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            comment.setContent(commentDTO.getContent());

            Comment updatedComment = updateComment(comment);
            return convertToCommentDTO(updatedComment);
        } else {
            throw new RuntimeException("Không tìm thấy bình luận");
        }
    }

    @Transactional
    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }

    public Long countCommentsByPostId(Long postId) {
        return commentRepository.countByPostId(postId);
    }

    private CommentDTO convertToCommentDTO(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getIdComment());
        dto.setContent(comment.getContent());
        dto.setCreateAt(comment.getCreateAt());

        // Thông tin người bình luận
        User user = comment.getUserSend();
        if (user != null) {
            UserProfileDTO userDTO = new UserProfileDTO();
            userDTO.setId(user.getIdUser());
            userDTO.setFirstName(user.getFirstName());
            userDTO.setLastName(user.getLastName());
            userDTO.setEmail(user.getEmail());
            // Lấy ảnh đại diện
            Optional<UsersImage> profileImage = usersImageRepository.findByUser(user);
            if (profileImage.isPresent()) {
                userDTO.setProfileImageUrl(profileImage.get().getImage().getUrlImage());
            } else {
                userDTO.setProfileImageUrl("/default-avatar.jpg");
            }

            List<UserAbout> userAbouts = userAboutRepository.findByUser(user);
            userDTO.setCoverImageUrl("/default-cover.jpg");
            for (UserAbout userAbout : userAbouts) {
                if(userAbout.getAbout().getName().equals("Cover Image")) {
                    userDTO.setCoverImageUrl(userAbout.getDescription());
                }
                if(userAbout.getAbout().getName().equals("Bio")) {
                    userDTO.setBio(userAbout.getDescription());
                }
            }

            dto.setUser(userDTO);
        }

        // Lấy postId từ PostComment
        Optional<PostComment> postComment = postCommentRepository.findByComment(comment);
        if (postComment.isPresent()) {
            dto.setPostId(postComment.get().getPost().getIdPost());
        }

        return dto;
    }
}
