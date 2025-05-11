package com.example.MH3LopMxh.dto;

public class UserFlowingDTO {
	private String firstName;
	private String lastName;
    private String imageUrl;
    public UserFlowingDTO() {
    	
    }
	public UserFlowingDTO(String firstName, String lastName, String imageUrl) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.imageUrl = imageUrl;
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
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
    
    
}
