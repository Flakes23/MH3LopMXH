package com.example.MH3LopMxh.dto;

public class FriendDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String profileImageUrl;
    private int mutualFriends;
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
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
    
    public String getProfileImageUrl() {
        return profileImageUrl;
    }
    
    public void setProfileImageUrl(String profileImageUrl) {
        this.profileImageUrl = profileImageUrl;
    }
    
    public int getMutualFriends() {
        return mutualFriends;
    }
    
    public void setMutualFriends(int mutualFriends) {
        this.mutualFriends = mutualFriends;
    }
}
