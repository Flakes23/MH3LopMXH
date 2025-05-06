package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.Notification;
import com.example.MH3LopMxh.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    
    List<Notification> findByUserOrderByCreateAtDesc(User user);
    
    Page<Notification> findByUserOrderByCreateAtDesc(User user, Pageable pageable);
    
    @Query("SELECT n FROM Notification n WHERE n.user.idUser = :userId AND n.isChecked = false ORDER BY n.createAt DESC")
    List<Notification> findUnreadNotificationsByUserId(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(n) FROM Notification n WHERE n.user.idUser = :userId AND n.isChecked = false")
    Long countUnreadNotificationsByUserId(@Param("userId") Long userId);
}
