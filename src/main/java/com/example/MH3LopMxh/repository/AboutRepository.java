package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.About;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AboutRepository extends JpaRepository<About, Long> {
    
    Optional<About> findByName(String name);
}
