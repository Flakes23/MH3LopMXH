package com.example.MH3LopMxh.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "relationship")
public class Relationship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_status")
    private StatusRelationship status;

    @ManyToOne
    @JoinColumn(name = "user_one_id", nullable = false)
    private User userOne;

    @ManyToOne
    @JoinColumn(name = "user_two_id", nullable = false)
    private User userTwo;

    @OneToMany(mappedBy = "relationship")
    private Set<Message> messages = new HashSet<>();

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public StatusRelationship getStatus() {
        return status;
    }

    public void setStatus(StatusRelationship status) {
        this.status = status;
    }

    public User getUserOne() {
        return userOne;
    }

    public void setUserOne(User userOne) {
        this.userOne = userOne;
    }

    public User getUserTwo() {
        return userTwo;
    }

    public void setUserTwo(User userTwo) {
        this.userTwo = userTwo;
    }

    public Set<Message> getMessages() {
        return messages;
    }

    public void setMessages(Set<Message> messages) {
        this.messages = messages;
    }
}
