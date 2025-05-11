package com.example.MH3LopMxh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.MH3LopMxh.model.UserFollow;


@Repository
public interface UserFollowRepository  extends JpaRepository<UserFollow, Long>{
    List<UserFollow> findByFollowing_IdUser(Long userId);    // Lấy danh sách người đang theo dõi userId
    List<UserFollow> findByFollower_IdUser(Long userId);     // Lấy danh sách người userId đang theo dõi

}
