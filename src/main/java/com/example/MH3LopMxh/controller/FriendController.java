package com.example.MH3LopMxh.controller;

import com.example.MH3LopMxh.dto.UserDTO;
import com.example.MH3LopMxh.model.Relationship;
import com.example.MH3LopMxh.model.User;
import com.example.MH3LopMxh.service.FriendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
@CrossOrigin(origins = "*") // Cho phép gọi từ frontend React
public class FriendController {

    @Autowired
    private FriendService friendService;

    // 1. Lấy danh sách lời mời kết bạn gửi đến user
    @GetMapping("/requests/{userId}")
    public List<UserDTO> getFriendRequests(@PathVariable Long userId) {
        return friendService.getPendingFriendRequests(userId);
    }

    // 2. Lấy danh sách gợi ý kết bạn
    @GetMapping("/suggested/{userId}")
    public List<UserDTO> getSuggestedFriends(@PathVariable Long userId) {
        return friendService.getSuggestedFriends(userId);
    }

    // 3. Gửi lời mời kết bạn
    @PostMapping("/send-request")
    public String sendFriendRequest(@RequestParam Long fromUserId, @RequestParam Long toUserId) {
        return friendService.sendFriendRequest(fromUserId, toUserId);
    }

    // 4. Chấp nhận lời mời kết bạn
    @PostMapping("/accept")
    public String acceptFriendRequest(@RequestParam Long fromUserId, @RequestParam Long toUserId) {
        return friendService.acceptFriendRequest(fromUserId, toUserId);
    }

    // 5. Xóa lời mời kết bạn
    @DeleteMapping("/delete")
    public String deleteFriendRequest(@RequestParam Long fromUserId, @RequestParam Long toUserId) {
        return friendService.deleteFriendRequest(fromUserId, toUserId);
    }
}
