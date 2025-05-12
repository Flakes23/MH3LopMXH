package com.example.MH3LopMxh.model;

import jakarta.persistence.*;

@Entity
@Table(name = "users_image")
public class UsersImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Tạo khóa chính tự động
    private Long id;

    @OneToOne
    @JoinColumn(name = "id_user")
    private User user;

    @OneToOne
    @JoinColumn(name = "id_image", unique = true)
    private Image image;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}

