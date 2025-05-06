package com.example.MH3LopMxh.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "verifycation_token")
public class VerifycationToken {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "password")
    private String password;

    @Column(name = "set_expiry_date")
    private LocalDateTime setExpiryDate;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getSetExpiryDate() {
        return setExpiryDate;
    }

    public void setSetExpiryDate(LocalDateTime setExpiryDate) {
        this.setExpiryDate = setExpiryDate;
    }
}
