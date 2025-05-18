package com.example.MH3LopMxh.dto;

public class UserDTO {
    private Long idUser;
    private String fullName;
    private String avatarUrl;
    private boolean requested;

    public UserDTO() {
    }

    public UserDTO(Long idUser, String fullName, String avatarUrl, boolean requested) {
        this.idUser = idUser;
        this.fullName = fullName;
        this.avatarUrl = avatarUrl;
        this.requested = requested;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
    }

    public boolean isRequested() {
        return requested;
    }

    public void setRequested(boolean requested) {
        this.requested = requested;
    }
}
