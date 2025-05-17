package com.example.MH3LopMxh.repository;

import com.example.MH3LopMxh.model.Relationship;
import com.example.MH3LopMxh.model.User;
import com.example.MH3LopMxh.model.StatusRelationship;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RelationshipRepository extends JpaRepository<Relationship, Long> {
    
    @Query("SELECT r FROM Relationship r WHERE (r.userOne = :user1 AND r.userTwo = :user2) OR (r.userOne = :user2 AND r.userTwo = :user1)")
    Optional<Relationship> findRelationship(@Param("user1") User user1, @Param("user2") User user2);
    
    @Query("SELECT r FROM Relationship r WHERE (r.userOne.idUser = :userId OR r.userTwo.idUser = :userId) AND r.status.idStatus = :statusId")
    List<Relationship> findByUserIdAndStatusId(@Param("userId") Long userId, @Param("statusId") Long statusId);
    
    @Query("SELECT r FROM Relationship r WHERE r.userOne.idUser = :userId1 AND r.userTwo.idUser = :userId2")
    Optional<Relationship> findByUserOneIdAndUserTwoId(@Param("userId1") Long userId1, @Param("userId2") Long userId2);
    
    @Query("SELECT r FROM Relationship r WHERE r.userTwo.idUser = :userId AND r.status.status = 'dagui'")
    List<Relationship> findPendingRequestsForUser(@Param("userId") Long userId);
    
    @Query("SELECT r FROM Relationship r WHERE r.userOne.idUser = :userId AND r.status.status = 'dagui'")
    List<Relationship> findSentRequestsByUser(@Param("userId") Long userId);
    
    @Query("SELECT r FROM Relationship r WHERE (r.userOne.idUser = :userId OR r.userTwo.idUser = :userId) AND r.status.status = 'banbe'")
    List<Relationship> findFriendsByUserId(@Param("userId") Long userId);

    @Query("SELECT r FROM Relationship r WHERE (r.userOne.idUser = :userId1 AND r.userTwo.idUser = :userId2) OR (r.userOne.idUser = :userId2 AND r.userTwo.idUser = :userId1)")
    Optional<Relationship> findExactRelationshipByUserIds(@Param("userId1") Long userId1, @Param("userId2") Long userId2);

    Optional<Relationship> findByUserOneAndUserTwo(User userOne, User userTwo);

}
