package com.example.MH3LopMxh.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "interaction")
public class Interaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_interaction")
    private Long idInteraction;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "id_interact")
    private Interact interact;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "id_post")
    private Post post;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    // Getters and Setters
    public Long getIdInteraction() {
        return idInteraction;
    }

    public void setIdInteraction(Long idInteraction) {
        this.idInteraction = idInteraction;
    }

    public Interact getInteract() {
        return interact;
    }

    public void setInteract(Interact interact) {
        this.interact = interact;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
