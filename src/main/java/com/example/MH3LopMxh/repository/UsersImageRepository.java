package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.UsersImage;
import com.example.MH3LopMxh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersImageRepository extends JpaRepository<UsersImage, Long> {
    
    Optional<UsersImage> findByUser(User user);
}
