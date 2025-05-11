package com.example.MH3LopMxh.model;

import jakarta.persistence.*;

@Entity
@Table(name = "post_user")
public class PostUser {

    @Id
    @Column(name = "id_post")
    private Long idPost;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User user;

    @OneToOne
    @JoinColumn(name = "id_post", insertable = false, updatable = false)
    private Post post;

    // Getters and Setters
    public Long getIdPost() {
        return idPost;
    }

    public void setIdPost(Long idPost) {
        this.idPost = idPost;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
