package com.example.MH3LopMxh.controller;

import com.example.MH3LopMxh.dto.CommentDTO;
import com.example.MH3LopMxh.model.Comment;
import com.example.MH3LopMxh.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByPostId(@PathVariable Long postId) {
        List<CommentDTO> comments = commentService.getCommentDTOsByPostId(postId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/post/{postId}")
    public ResponseEntity<?> createComment(
            @PathVariable Long postId,
            @RequestBody CommentDTO commentDTO) {

        // Lấy userId từ UserProfileDTO
        Long userId = commentDTO.getUser().getId(); // Lấy idUser từ UserProfileDTO

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("userId không hợp lệ");
        }

        try {
            CommentDTO createdComment = commentService.createCommentDTO(commentDTO, postId, userId);
            return ResponseEntity.ok(createdComment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không thể tạo bình luận: " + e.getMessage());
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateComment(
            @PathVariable Long id,
            @RequestBody CommentDTO commentDTO) {

        // Lấy userId từ UserProfileDTO
        Long userId = commentDTO.getUser().getId(); // Lấy idUser từ UserProfileDTO

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("userId không hợp lệ");
        }

        try {
            Optional<Comment> existingComment = commentService.getCommentById(id);

            if (!existingComment.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy bình luận");
            }

            // Kiểm tra xem người dùng có quyền chỉnh sửa bình luận không
            if (!existingComment.get().getUserSend().getIdUser().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền chỉnh sửa bình luận này");
            }

            commentDTO.setId(id);
            CommentDTO updatedComment = commentService.updateCommentDTO(commentDTO);
            return ResponseEntity.ok(updatedComment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không thể cập nhật bình luận: " + e.getMessage());
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long id,
            @RequestBody CommentDTO commentDTO) {

        // Lấy userId từ UserProfileDTO
        Long userId = commentDTO.getUser().getId(); // Lấy idUser từ UserProfileDTO

        if (userId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("userId không hợp lệ");
        }

        try {
            Optional<Comment> existingComment = commentService.getCommentById(id);

            if (!existingComment.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy bình luận");
            }

            // Kiểm tra xem người dùng có quyền xóa bình luận không
            if (!existingComment.get().getUserSend().getIdUser().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Bạn không có quyền xóa bình luận này");
            }

            commentService.deleteComment(id);
            return ResponseEntity.ok("Bình luận đã được xóa");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không thể xóa bình luận: " + e.getMessage());
        }
    }

}
