package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.UsersPost;
import com.example.MH3LopMxh.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersPostRepository extends JpaRepository<UsersPost, Long> {
    
    List<UsersPost> findByUser(User user);
}
