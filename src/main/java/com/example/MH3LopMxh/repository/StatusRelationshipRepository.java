package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.StatusRelationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatusRelationshipRepository extends JpaRepository<StatusRelationship, Long> {
    
    Optional<StatusRelationship> findByStatus(String status);
}
