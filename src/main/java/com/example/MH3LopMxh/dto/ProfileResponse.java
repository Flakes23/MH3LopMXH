package com.example.MH3LopMxh.dto;

import java.util.List;

public class ProfileResponse {
    private UserProfileDTO userInfo;
    private List<PostDTO> posts;
    private List<FriendDTO> friends;
    private List<ImageDTO> photos;
    private List<AboutDTO> aboutInfo;
    private int totalPosts;
    private int totalFriends;
    private int totalPhotos;

    // Getters and Setters
    public UserProfileDTO getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserProfileDTO userInfo) {
        this.userInfo = userInfo;
    }

    public List<PostDTO> getPosts() {
        return posts;
    }

    public void setPosts(List<PostDTO> posts) {
        this.posts = posts;
    }

    public List<FriendDTO> getFriends() {
        return friends;
    }

    public void setFriends(List<FriendDTO> friends) {
        this.friends = friends;
    }

    public List<ImageDTO> getPhotos() {
        return photos;
    }

    public void setPhotos(List<ImageDTO> photos) {
        this.photos = photos;
    }

    public List<AboutDTO> getAboutInfo() {
        return aboutInfo;
    }

    public void setAboutInfo(List<AboutDTO> aboutInfo) {
        this.aboutInfo = aboutInfo;
    }

    public int getTotalPosts() {
        return totalPosts;
    }

    public void setTotalPosts(int totalPosts) {
        this.totalPosts = totalPosts;
    }

    public int getTotalFriends() {
        return totalFriends;
    }

    public void setTotalFriends(int totalFriends) {
        this.totalFriends = totalFriends;
    }

    public int getTotalPhotos() {
        return totalPhotos;
    }

    public void setTotalPhotos(int totalPhotos) {
        this.totalPhotos = totalPhotos;
    }
}
