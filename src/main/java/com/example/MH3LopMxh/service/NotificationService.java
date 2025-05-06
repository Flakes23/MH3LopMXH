package com.example.MH3LopMxh.service;

import com.example.MH3LopMxh.model.Notification;
import com.example.MH3LopMxh.model.User;
import com.example.MH3LopMxh.repository.NotificationRepository;
import com.example.MH3LopMxh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {
    
    @Autowired
    private NotificationRepository notificationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    public List<Notification> getNotificationsByUser(User user) {
        return notificationRepository.findByUserOrderByCreateAtDesc(user);
    }
    
    public Page<Notification> getNotificationsByUserPaged(User user, Pageable pageable) {
        return notificationRepository.findByUserOrderByCreateAtDesc(user, pageable);
    }
    
    public List<Notification> getUnreadNotificationsByUserId(Long userId) {
        return notificationRepository.findUnreadNotificationsByUserId(userId);
    }
    
    public Long countUnreadNotificationsByUserId(Long userId) {
        return notificationRepository.countUnreadNotificationsByUserId(userId);
    }
    
    @Transactional
    public Notification createNotification(Long userId, Long userSendId, String message, String url) {
        Optional<User> optionalUser = userRepository.findById(userId);
        Optional<User> optionalUserSend = userRepository.findById(userSendId);
        
        if (optionalUser.isPresent() && optionalUserSend.isPresent()) {
            User user = optionalUser.get();
            User userSend = optionalUserSend.get();
            
            Notification notification = new Notification();
            notification.setMessage(message);
            notification.setUrl(url);
            notification.setChecked(false);
            notification.setCreateAt(LocalDateTime.now());
            notification.setUser(user);
            notification.setUserSend(userSend);
            
            return notificationRepository.save(notification);
        } else {
            throw new RuntimeException("Không tìm thấy người dùng");
        }
    }
    
    @Transactional
    public void markNotificationAsRead(Long notificationId) {
        Optional<Notification> optionalNotification = notificationRepository.findById(notificationId);
        
        if (optionalNotification.isPresent()) {
            Notification notification = optionalNotification.get();
            notification.setChecked(true);
            notificationRepository.save(notification);
        }
    }
    
    @Transactional
    public void markAllNotificationsAsRead(Long userId) {
        List<Notification> unreadNotifications = notificationRepository.findUnreadNotificationsByUserId(userId);
        
        for (Notification notification : unreadNotifications) {
            notification.setChecked(true);
            notificationRepository.save(notification);
        }
    }
}
