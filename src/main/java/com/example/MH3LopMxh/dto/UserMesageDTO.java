package com.example.MH3LopMxh.dto;

public class UserMesageDTO {
	private String firstName;
	private String lastName;
	private String linkanh;
	private String phuttin;
	private Long idnd;
	public UserMesageDTO() {
	}
	public UserMesageDTO(String firstName, String lastName, String linkanh) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.linkanh = linkanh;
	}
	public UserMesageDTO(String firstName, String lastName, String linkanh,String tintmp) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.linkanh = linkanh;
		this.phuttin=tintmp;
	}
	public UserMesageDTO(String firstName, String lastName, String linkanh,String tintmp,Long idnd) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.linkanh = linkanh;
		this.phuttin=tintmp;
		this.idnd=idnd;
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
	public String getLinkanh() {
		return linkanh;
	}
	public void setLinkanh(String linkanh) {
		this.linkanh = linkanh;
	}
	public String getPhuttin() {
		return phuttin;
	}
	public void setPhuttin(String phuttin) {
		this.phuttin = phuttin;
	}
	public Long getIdnd() {
		return idnd;
	}
	public void setIdnd(Long idnd) {
		this.idnd = idnd;
	}
	
}
