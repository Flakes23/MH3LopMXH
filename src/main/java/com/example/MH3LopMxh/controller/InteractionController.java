package com.example.MH3LopMxh.controller;

import com.example.MH3LopMxh.model.Interaction;
import com.example.MH3LopMxh.service.InteractionService;
import com.example.MH3LopMxh.service.PostService;
import com.example.MH3LopMxh.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "*")
public class InteractionController {

    @Autowired
    private InteractionService interactionService;
    @Autowired
    private PostService postService;
    @Autowired
    private ProfileService profileService;

    // ✅ Gửi / thay đổi / gỡ cảm xúc
    @PostMapping("/{postId}/react")
    public ResponseEntity<?> reactToPost(
            @PathVariable Long postId,
            @RequestParam Long userId,
            @RequestParam Long interactId
    ) {
        Interaction interaction = interactionService.createOrUpdateInteraction(postId, userId, interactId);
        if (interaction == null) {
            return ResponseEntity.ok().body("Cảm xúc đã được gỡ bỏ");
        }
        return ResponseEntity.ok(interaction);
    }

    @DeleteMapping("/{postId}/react")
    public ResponseEntity<?> removeReaction(
            @PathVariable Long postId,
            @RequestParam Long userId
    ) {
        interactionService.deleteInteraction(postId, userId);
        return ResponseEntity.ok("Đã xoá cảm xúc");
    }

    // ✅ Lấy tất cả cảm xúc bài viết
    @GetMapping("/{postId}/reactions")
    public ResponseEntity<Map<String, Long>> getReactionStats(@PathVariable Long postId) {
        Map<String, Long> stats = interactionService.getReactionStatistics(postId);
        return ResponseEntity.ok(stats);
    }
    @GetMapping("{postId}/{userId}")
    public ResponseEntity<?> getInteractions(@PathVariable Long postId, @PathVariable Long userId) {
        return ResponseEntity.ok(interactionService.getUserReaction(postId, userId));
    }

    @GetMapping("/getallpost")
    public ResponseEntity<?> getAllPosts() {
        return ResponseEntity.ok(
                postService.getAllPosts().stream()
                        .map(post -> profileService.convertToPostDTO(post)) // trả về kết quả convert
                        .collect(Collectors.toList())  // collect stream thành list
        );
    }
}
