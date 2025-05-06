package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.VerifycationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VerifycationTokenRepository extends JpaRepository<VerifycationToken, Long> {
    
    Optional<VerifycationToken> findByEmail(String email);
}
