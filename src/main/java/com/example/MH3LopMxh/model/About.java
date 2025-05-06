package com.example.MH3LopMxh.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "about")
public class About {

    @Id
    @Column(name = "id_about")
    private Long idAbout;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "about")
    private Set<UserAbout> userAbouts = new HashSet<>();

    // Getters and Setters
    public Long getIdAbout() {
        return idAbout;
    }

    public void setIdAbout(Long idAbout) {
        this.idAbout = idAbout;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<UserAbout> getUserAbouts() {
        return userAbouts;
    }

    public void setUserAbouts(Set<UserAbout> userAbouts) {
        this.userAbouts = userAbouts;
    }
}
