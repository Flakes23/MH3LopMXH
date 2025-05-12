package com.example.MH3LopMxh.controller;

import com.example.MH3LopMxh.dto.ProfileResponse;
import com.example.MH3LopMxh.dto.ProfileUpdateRequest;
import com.example.MH3LopMxh.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long userId) {
        ProfileResponse profileResponse = profileService.getUserProfile(userId);

        if (profileResponse != null) {
            return ResponseEntity.ok(profileResponse);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy người dùng");
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyProfile(@PathVariable Long userId) {
        // Lấy userId từ token (giả sử có một phương thức để lấy userId từ token)
        if (userId != null) {
            ProfileResponse profileResponse = profileService.getUserProfile(userId);

            if (profileResponse != null) {
                return ResponseEntity.ok(profileResponse);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy người dùng");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token không hợp lệ");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody ProfileUpdateRequest request) {
        Long userId = request.getUserId();  // Lấy userId trực tiếp từ request body

        try {
            boolean updated = profileService.updateUserProfile(userId, request);

            if (updated) {
                return ResponseEntity.ok("Cập nhật thông tin thành công");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Không tìm thấy người dùng");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Không thể cập nhật thông tin: " + e.getMessage());
        }
    }

    @PostMapping("/avatar")
    public ResponseEntity<?> uploadAvatar(
            @RequestParam("avatar") MultipartFile avatarFile,
            @RequestParam("userId") Long userId) {

        try {
            String imageUrl = profileService.updateUserAvatar(userId, avatarFile);

            Map<String, String> response = new HashMap<>();
            response.put("profileImageUrl", imageUrl);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Không thể cập nhật ảnh đại diện: " + e.getMessage());
        }
    }

    @PostMapping("/cover")
    public ResponseEntity<?> updateCoverImage(
            @RequestParam("cover") MultipartFile coverImage,
            @RequestParam("userId") Long userId) {

        try {
            String imageUrl = profileService.updateCoverImage(userId, coverImage);
            System.out.println(imageUrl);
            if (imageUrl == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Upload failed");
            }

            Map<String, String> response = new HashMap<>();
            response.put("coverImageUrl", imageUrl);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Không thể cập nhật ảnh bìa: " + e.getMessage());
        }
    }
}
