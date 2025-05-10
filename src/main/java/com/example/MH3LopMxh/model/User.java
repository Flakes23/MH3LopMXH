// User.java
package com.example.MH3LopMxh.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "user")
public class User {

	@Id
	@Column(name = "id_user")
	private Long idUser;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;

	@Column(name = "is_active")
	private Boolean isActive;

	@Column(name = "create_at")
	private LocalDateTime createAt;

	@OneToMany(mappedBy = "user")
	private Set<PostUser> posts = new HashSet<>();

	@OneToMany(mappedBy = "user")
	private Set<Interaction> interactions = new HashSet<>();

	@JsonManagedReference
	@OneToMany(mappedBy = "user")
	private Set<UserAbout> userAbouts = new HashSet<>();

	@OneToMany(mappedBy = "userSend")
	private Set<Comment> comments = new HashSet<>();

	@OneToMany(mappedBy = "userOne")
	private Set<Relationship> relationshipsAsUserOne = new HashSet<>();

	@OneToMany(mappedBy = "userTwo")
	private Set<Relationship> relationshipsAsUserTwo = new HashSet<>();

	@OneToMany(mappedBy = "fromUser")
	private Set<Message> sentMessages = new HashSet<>();

	@OneToMany(mappedBy = "toUser")
	private Set<Message> receivedMessages = new HashSet<>();

	@OneToMany(mappedBy = "user")
	private Set<Notification> notifications = new HashSet<>();

	@OneToMany(mappedBy = "userSend")
	private Set<Notification> sentNotifications = new HashSet<>();

	// Getters and Setters
	public Long getIdUser() {
		return idUser;
	}

	public void setIdUser(Long idUser) {
		this.idUser = idUser;
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getIsActive() {
		return isActive;
	}

	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}

	public LocalDateTime getCreateAt() {
		return createAt;
	}

	public void setCreateAt(LocalDateTime createAt) {
		this.createAt = createAt;
	}

	public Set<PostUser> getPosts() {
		return posts;
	}

	public void setPosts(Set<PostUser> posts) {
		this.posts = posts;
	}

	public Set<Interaction> getInteractions() {
		return interactions;
	}

	public void setInteractions(Set<Interaction> interactions) {
		this.interactions = interactions;
	}

	public Set<UserAbout> getUserAbouts() {
		return userAbouts;
	}

	public void setUserAbouts(Set<UserAbout> userAbouts) {
		this.userAbouts = userAbouts;
	}

	public Set<Comment> getComments() {
		return comments;
	}

	public void setComments(Set<Comment> comments) {
		this.comments = comments;
	}

	public Set<Relationship> getRelationshipsAsUserOne() {
		return relationshipsAsUserOne;
	}

	public void setRelationshipsAsUserOne(Set<Relationship> relationshipsAsUserOne) {
		this.relationshipsAsUserOne = relationshipsAsUserOne;
	}

	public Set<Relationship> getRelationshipsAsUserTwo() {
		return relationshipsAsUserTwo;
	}

	public void setRelationshipsAsUserTwo(Set<Relationship> relationshipsAsUserTwo) {
		this.relationshipsAsUserTwo = relationshipsAsUserTwo;
	}

	public Set<Message> getSentMessages() {
		return sentMessages;
	}

	public void setSentMessages(Set<Message> sentMessages) {
		this.sentMessages = sentMessages;
	}

	public Set<Message> getReceivedMessages() {
		return receivedMessages;
	}

	public void setReceivedMessages(Set<Message> receivedMessages) {
		this.receivedMessages = receivedMessages;
	}

	public Set<Notification> getNotifications() {
		return notifications;
	}

	public void setNotifications(Set<Notification> notifications) {
		this.notifications = notifications;
	}

	public Set<Notification> getSentNotifications() {
		return sentNotifications;
	}

	public void setSentNotifications(Set<Notification> sentNotifications) {
		this.sentNotifications = sentNotifications;
	}
}