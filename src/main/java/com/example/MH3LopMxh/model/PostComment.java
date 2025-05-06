package com.example.MH3LopMxh.model;

import jakarta.persistence.*;

@Entity
@Table(name = "post_comment")
public class PostComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động tăng
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_comment", unique = true)
    private Comment comment;

    @ManyToOne
    @JoinColumn(name = "id_post", nullable = false)
    private Post post;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
