package com.example.MH3LopMxh.controller;

import com.example.MH3LopMxh.dto.ProfileResponse;
import com.example.MH3LopMxh.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> getMyProfile(@RequestHeader("Authorization") String token) {
        // Lấy userId từ token (giả sử có một phương thức để lấy userId từ token)
        Long userId = getUserIdFromToken(token);

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

    // Phương thức giả định để lấy userId từ token
    private Long getUserIdFromToken(String token) {
        // Trong thực tế, bạn sẽ giải mã token để lấy userId
        // Đây chỉ là một phương thức giả định
        try {
            // Giả sử token có định dạng "userId:randomString"
            String[] parts = token.split(":");
            return Long.parseLong(parts[0]);
        } catch (Exception e) {
            return null;
        }
    }
}
