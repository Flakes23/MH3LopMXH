package com.example.MH3LopMxh.controller;

import com.example.MH3LopMxh.dto.LoginRequest;
import com.example.MH3LopMxh.dto.LoginResponse;
import com.example.MH3LopMxh.dto.RegisterRequest;
import com.example.MH3LopMxh.model.User;
import com.example.MH3LopMxh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
import java.util.UUID;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private static final Map<String, Long> activeTokens = new HashMap<>();

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            if (userService.getUserByEmail(registerRequest.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Email đã được sử dụng");
            }

            User user = new User();
            UUID uuid = UUID.randomUUID();
            user.setIdUser(uuid.getMostSignificantBits() & 0x1FFFFFFFFFFFFFL);
            user.setFirstName(registerRequest.getFirstName());
            user.setLastName(registerRequest.getLastName());
            user.setEmail(registerRequest.getEmail());
            user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Mã hóa mật khẩu trước khi lưu

            System.out.println(user.toString());
            User createdUser = userService.createUser(user);

            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đăng ký thất bại: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<User> optionalUser = userService.getUserByEmail(loginRequest.getEmail());

            if (optionalUser.isPresent()) {
                User user = optionalUser.get();

                // Kiểm tra mật khẩu với mã hóa
                if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                    // Tạo token và trả về
                    String token = UUID.randomUUID().toString();
                    activeTokens.put(token, user.getIdUser());
                    return ResponseEntity.ok(new LoginResponse(token, user));
                }
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email hoặc mật khẩu không đúng");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Đăng nhập thất bại: " + e.getMessage());
        }
    }

    // Phương thức kiểm tra token (có thể sử dụng trong các controller khác)
    public static Long getUserIdFromToken(String token) {
        return activeTokens.get(token);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        if (token != null && !token.isEmpty()) {
            activeTokens.remove(token);
        }
        return ResponseEntity.ok("Đăng xuất thành công");
    }
}