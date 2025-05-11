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

    // Người theo dõi (follower)
    @ManyToOne
    @JoinColumn(name = "idflower", referencedColumnName = "id_user")
    private User follower;

    // Người được theo dõi (following)
    @ManyToOne
    @JoinColumn(name = "idflowing", referencedColumnName = "id_user")
    private User following;
    
//    Image img = following.getUserimg().; // nếu quan hệ là OneToOne

//    @ManyToOne
//    @JoinColumn(name = "idflowing", referencedColumnName = "id_user", insertable = false, updatable = false)
//    private UsersImage useranh;

    
    // Getters và Setters
    public Long getId() {
        return id;
    }

    public User getFollower() {
        return follower;
    }

    public void setFollower(User follower) {
        this.follower = follower;
    }

    public User getFollowing() {
        return following;
    }

    public void setFollowing(User following) {
        this.following = following;
    }

//	public UsersImage getUseranh() {
//		return useranh;
//	}
//
//	public void setUseranh(UsersImage useranh) {
//		this.useranh = useranh;
//	}
    
}
