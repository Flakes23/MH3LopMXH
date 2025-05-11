package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.Message;
import com.example.MH3LopMxh.model.Relationship;
import com.example.MH3LopMxh.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    
    List<Message> findByRelationshipOrderByCreateAtAsc(Relationship relationship);
    
    Page<Message> findByRelationshipOrderByCreateAtDesc(Relationship relationship, Pageable pageable);
    
    @Query("SELECT m FROM Message m WHERE m.relationship.id = :relationshipId AND m.isSeen = false AND m.toUser.idUser = :userId")
    List<Message> findUnseenMessagesByRelationshipAndUser(@Param("relationshipId") Long relationshipId, @Param("userId") Long userId);
    
    @Query("SELECT COUNT(m) FROM Message m WHERE m.toUser.idUser = :userId AND m.isSeen = false")
    Long countUnseenMessagesByUser(@Param("userId") Long userId);
    
    @Query("SELECT DISTINCT m.relationship FROM Message m WHERE m.fromUser.idUser = :userId OR m.toUser.idUser = :userId ORDER BY m.createAt DESC")
    List<Relationship> findRecentConversations(@Param("userId") Long userId);
    
    List<Message> findByRelationshipId(Long relationshipId);

}
