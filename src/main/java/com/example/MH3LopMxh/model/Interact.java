package com.example.MH3LopMxh.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "interact")
public class Interact {

    @Id
    @Column(name = "id_interact")
    private Long idInteract;

    @Column(name = "interact_type")
    private String interactType;

    @OneToMany(mappedBy = "interact")
    private Set<Interaction> interactions = new HashSet<>();

    // Getters and Setters
    public Long getIdInteract() {
        return idInteract;
    }

    public void setIdInteract(Long idInteract) {
        this.idInteract = idInteract;
    }

    public String getInteractType() {
        return interactType;
    }

    public void setInteractType(String interactType) {
        this.interactType = interactType;
    }

    public Set<Interaction> getInteractions() {
        return interactions;
    }

    public void setInteractions(Set<Interaction> interactions) {
        this.interactions = interactions;
    }
}