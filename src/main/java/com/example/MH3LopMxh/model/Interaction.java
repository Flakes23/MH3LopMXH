package com.example.MH3LopMxh.model;

import jakarta.persistence.*;

@Entity
@Table(name = "interaction")
public class Interaction {

    @Id
    @Column(name = "id_interaction")
    private Long idInteraction;

    @ManyToOne
    @JoinColumn(name = "id_interact")
    private Interact interact;

    @ManyToOne
    @JoinColumn(name = "id_post")
    private Post post;

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
