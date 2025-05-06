package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.Interact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InteractRepository extends JpaRepository<Interact, Long> {
    
    Optional<Interact> findByInteractType(String interactType);
}
