package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.UserAbout;
import com.example.MH3LopMxh.model.User;
import com.example.MH3LopMxh.model.About;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserAboutRepository extends JpaRepository<UserAbout, Long> {
    
    List<UserAbout> findByUser(User user);
    
    Optional<UserAbout> findByUserAndAbout(User user, About about);
}
