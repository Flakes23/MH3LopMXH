package com.example.MH3LopMxh.service;

import com.example.MH3LopMxh.dto.UserDTO;
import com.example.MH3LopMxh.model.Relationship;
import com.example.MH3LopMxh.model.StatusRelationship;
import com.example.MH3LopMxh.model.User;
import com.example.MH3LopMxh.model.UsersImage;
import com.example.MH3LopMxh.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class FriendService{

    @Autowired
    private RelationshipRepository relationshipRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StatusRelationshipRepository statusRelationshipRepository;

    @Autowired
    private UsersImageRepository usersImageRepository;

    public List<UserDTO> getPendingFriendRequests(Long userId) {
        return relationshipRepository.findPendingRequestsForUser(userId)
            .stream()
            .map(relationship -> {
                User user = relationship.getUserOne();

                String avatarUrl = usersImageRepository.findByUser(user)
                        .map(usersImage -> usersImage.getImage())
                        .map(image -> image.getUrlImage())
                        .orElse("null");

                String fullName = user.getFirstName() + " " + user.getLastName();

                return new UserDTO(user.getIdUser(), fullName, avatarUrl,false);
            })
            .collect(Collectors.toList());
    }


    public List<UserDTO> getSuggestedFriends(Long userId) {
        List<User> allUsers = userRepository.findAll();

        // Lấy danh sách bạn bè hiện tại
        List<User> friends = relationshipRepository.findFriendsByUserId(userId).stream()
                .map(r -> r.getUserOne().getIdUser().equals(userId) ? r.getUserTwo() : r.getUserOne())
                .collect(Collectors.toList());

        List<User> pendingUsers = relationshipRepository.findPendingRequestsForUser(userId).stream().map(request -> request.getUserOne()).collect(Collectors.toList());
        // Tạo set id bạn bè + userId để loại bỏ
        Set<Long> excludeIds = friends.stream().map(User::getIdUser).collect(Collectors.toSet());
        excludeIds.add(userId);
        excludeIds.addAll(pendingUsers.stream().map(User::getIdUser).collect(Collectors.toSet()));

        return allUsers.stream()
                .filter(user -> !excludeIds.contains(user.getIdUser()))
                .map(user -> {
                    String avatarUrl = usersImageRepository.findByUser(user)
                            .map(usersImage -> usersImage.getImage())
                            .map(image -> image.getUrlImage())
                            .orElse("null");

                    String fullName = user.getFirstName() + " " + user.getLastName();

                    // Kiểm tra xem userId đã gửi lời mời đến user này chưa
                    boolean requested = relationshipRepository.existsSentRequest(userId, user.getIdUser());

                    return new UserDTO(user.getIdUser(), fullName, avatarUrl, requested);
                })
                .collect(Collectors.toList());
    }

    public String sendFriendRequest(Long fromUserId, Long toUserId) {
        if (relationshipRepository.findRelationship(
                userRepository.findById(fromUserId).orElse(null),
                userRepository.findById(toUserId).orElse(null)
        ).isPresent()) {
            return "Đã tồn tại lời mời hoặc bạn bè.";
        }

        User fromUser = userRepository.findById(fromUserId).orElseThrow();
        User toUser = userRepository.findById(toUserId).orElseThrow();
        StatusRelationship status = statusRelationshipRepository.findById(2L).orElseThrow(); // 'dagui'

        Relationship r = new Relationship();
        r.setUserOne(fromUser);
        r.setUserTwo(toUser);
        r.setStatus(status);

        relationshipRepository.save(r);

        return "Đã gửi lời mời kết bạn.";
    }

    public String acceptFriendRequest(Long fromUserId, Long toUserId) {
        Relationship relationship = relationshipRepository
                .findByUserOneIdAndUserTwoId(fromUserId, toUserId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy lời mời"));

        StatusRelationship accepted = statusRelationshipRepository.findById(3L).orElseThrow(); // 'banbe'
        relationship.setStatus(accepted);

        relationshipRepository.save(relationship);

        return "Đã chấp nhận lời mời.";
    }

    public String deleteFriendRequest(Long fromUserId, Long toUserId) {
        Optional<Relationship> rel = relationshipRepository.findByUserOneIdAndUserTwoId(fromUserId, toUserId);
        if (rel.isPresent()) {
            relationshipRepository.delete(rel.get());
            return "Đã xóa lời mời kết bạn.";
        }
        return "Không tìm thấy lời mời.";
    }
}
