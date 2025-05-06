package com.example.MH3LopMxh.model;

import jakarta.persistence.*;

@Entity
@Table(name = "image")
public class Image {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "url_image")
    private String urlImage;

    @OneToOne(mappedBy = "image")
    private PostImage postImage;

    @OneToOne(mappedBy = "image")
    private UsersImage userImage;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public PostImage getPostImage() {
        return postImage;
    }

    public void setPostImage(PostImage postImage) {
        this.postImage = postImage;
    }

    public UsersImage getUserImage() {
        return userImage;
    }

    public void setUserImage(UsersImage userImage) {
        this.userImage = userImage;
    }
}