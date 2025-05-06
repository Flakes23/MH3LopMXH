package com.example.MH3LopMxh.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "status_relationship")
public class StatusRelationship {

    @Id
    @Column(name = "id_status")
    private Long idStatus;

    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "status")
    private Set<Relationship> relationships = new HashSet<>();

    // Getters and Setters
    public Long getIdStatus() {
        return idStatus;
    }

    public void setIdStatus(Long idStatus) {
        this.idStatus = idStatus;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<Relationship> getRelationships() {
        return relationships;
    }

    public void setRelationships(Set<Relationship> relationships) {
        this.relationships = relationships;
    }
}
