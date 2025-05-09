package com.example.MH3LopMxh.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_follow")
public class UserFollow {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	 	
	 	 @ManyToOne
	     @JoinColumn(name = "idflower", referencedColumnName = "id_user")
	     private User follower; // người theo dõi

	     @ManyToOne
	     @JoinColumn(name = "idflowing", referencedColumnName = "id_user")
	     private User following; // người được theo dõi
	 	
	     
	 	
}