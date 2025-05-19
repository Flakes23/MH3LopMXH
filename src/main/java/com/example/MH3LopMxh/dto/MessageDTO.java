package com.example.MH3LopMxh.dto;

import java.time.LocalDateTime;

public class MessageDTO {
	 private Long id;
	    private String content;
	    private LocalDateTime createAt;
	    private RelationshipDTO relationship;
	    private Long idUser;
		private String linkanh;

		public String getLinkanh() {
			return linkanh;
		}
		public void setLinkanh(String linkanh) {
			this.linkanh = linkanh;
		}
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public String getContent() {
			return content;
		}
		public void setContent(String content) {
			this.content = content;
		}
		public LocalDateTime getCreateAt() {
			return createAt;
		}
		public void setCreateAt(LocalDateTime createAt) {
			this.createAt = createAt;
		}
		public RelationshipDTO getRelationship() {
			return relationship;
		}
		public void setRelationship(RelationshipDTO relationship) {
			this.relationship = relationship;
		}
		public Long getIdUser() {
			return idUser;
		}
		public void setIdUser(Long idUser) {
			this.idUser = idUser;
		}
	    
}
