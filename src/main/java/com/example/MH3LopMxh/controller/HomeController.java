package com.example.MH3LopMxh.controller;


import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.MH3LopMxh.dto.FriendDTO;
import com.example.MH3LopMxh.dto.ImageDTO;
import com.example.MH3LopMxh.dto.PostDTO;
import com.example.MH3LopMxh.dto.PostUserDTO;
import com.example.MH3LopMxh.dto.UserFlowingDTO;
import com.example.MH3LopMxh.model.Image;
import com.example.MH3LopMxh.model.Post;
import com.example.MH3LopMxh.model.PostImage;
import com.example.MH3LopMxh.model.PostUser;
import com.example.MH3LopMxh.model.User;
import com.example.MH3LopMxh.model.UserFollow;
import com.example.MH3LopMxh.model.UsersImage;
import com.example.MH3LopMxh.repository.ImageRepository;
import com.example.MH3LopMxh.repository.PostImageRepository;
import com.example.MH3LopMxh.repository.PostRepository;
import com.example.MH3LopMxh.repository.UserFollowRepository;
import com.example.MH3LopMxh.repository.UserRepository;
import com.example.MH3LopMxh.repository.UsersImageRepository;
import com.example.MH3LopMxh.service.HomeService;
import com.example.MH3LopMxh.service.PostService;


@RestController
@RequestMapping("/api/home")
@CrossOrigin(origins = "*")
public class HomeController {
	   @Autowired
	    private HomeService homeService;
	   
	   @Autowired
	    private PostService postService;
	   @Autowired
	    private PostImageRepository postimagereposi;
	   @Autowired
	    private ImageRepository imareposi;
	   @Autowired
	    private UserFollowRepository ufr;
	   
	   @Autowired
	    private UsersImageRepository usersImageRepository;
	   
	   @Autowired
	    private UserRepository userRepository;
//	   @PostMapping("/postwrite")
//	   public PostUser createBaiViet(@RequestBody PostDTO postDto) {
//		   Random random = new Random();
//		   long idPost = 100000 + random.nextInt(900000);
//		   System.out.println("ID POST: "+idPost);
//	       Post post = new Post(
//	    		   idPost,
//	           postDto.getContent(),
//	           LocalDateTime.now(),  LocalDateTime.now(), true
//	       );
//	       postService.save(post);
//	       return  postService.savepersonpost(idPost,postDto.getIduser());
//	   }

	   @PostMapping("/postwrite")
	   public Post createBaiViet(@RequestBody PostDTO postDto) {
	       long idPost = 100000 + new Random().nextInt(900000);
	       Post post = new Post(idPost, postDto.getContent(), LocalDateTime.now(), LocalDateTime.now(), true);
	       postService.save(post);
	       PostUser saved = postService.savepersonpost(idPost, postDto.getIduser());
	       return post; 
	   }

	   @PostMapping("/postwritepic")
	   public Post createBaiVietcopic(@RequestBody PostDTO postDto) {
	       long idPost = 100000 + new Random().nextInt(900000);
	       Image imgpo=new Image();
	       imgpo.setUrlImage(postDto.getImageUrl());
//	       imgpo.setId(idPost);
	       System.out.println("ID: "+imgpo.getId());
	       Post post = new Post(idPost, postDto.getContent(), LocalDateTime.now(), LocalDateTime.now(), true);
	       postService.save(post);
	       PostUser saved = postService.savepersonpost(idPost, postDto.getIduser());
	       return post;
	   }
	   
//	   @PostMapping("/postwritepic")
//	   @Transactional
//	   public Post createBaiVietcopic(@RequestBody PostDTO postDto) {
//	       if (postDto.getImageUrl() == null) {
//	           throw new IllegalArgumentException("Image URL and user ID are required.");
//	       }
//	       long idPost = 100000 + new Random().nextInt(900000);
//	       long idPost2 = 100000 + new Random().nextInt(900000);
//	       Image img = new Image();
//	       img.setId(idPost2);
//	       img.setUrlImage(postDto.getImageUrl());
//	       imareposi.save(img); // Lưu Image trước
//
//	       Post post = new Post(idPost, postDto.getContent(), LocalDateTime.now(), LocalDateTime.now(), true);
//
//	       
//	       PostImage postImage = new PostImage(img,post);
//	       postimagereposi.save(postImage); // Lưu PostImage sau
//
////	       Post post = new Post();
////	       post.setIdPost(idPost);
////	       post.setContent(postDto.getContent());
////	       post.setCreateAt(LocalDateTime.now());
////	       post.setUpdateAt(LocalDateTime.now());
////	       post.setActive(true);
//	       post.setPostImage(postImage);
//	       postService.save(post); // Lưu Post sau khi đã có PostImage
//
//	       postService.savepersonpost(idPost, postDto.getIduser()); // Lưu PostUser
//
//	       return post;
//	   }

	   @GetMapping("/messfri")
	   public List<UserFlowingDTO> havemessfriend(@RequestParam long userId) {
		   List<UserFollow> dsuser = ufr.findByFollower_IdUser(userId);
		   List<UserFlowingDTO> dsuldto = new ArrayList<>();
	        for(int i=0;i<dsuser.size();i++) {
	        	UserFlowingDTO utmp=new UserFlowingDTO();
	        	Long id=dsuser.get(i).getFollowing().getIdUser(); 
	            Optional<User> optionalUser = userRepository.findById(id);
	            User user = optionalUser.get();
	            utmp.setFirstName(user.getFirstName());
	            utmp.setLastName(user.getLastName());
	        	Optional<UsersImage> profileImage = usersImageRepository.findByUser(user);
		        if (profileImage.isPresent()) {
		            ImageDTO imageDTO = new ImageDTO();
		            imageDTO.setId(profileImage.get().getImage().getId());
		            imageDTO.setImageUrl(profileImage.get().getImage().getUrlImage());
		            imageDTO.setCaption("Ảnh đại diện");
		            utmp.setImageUrl(imageDTO.getImageUrl());
		        }
		        dsuldto.add(utmp);
	        }
	        
	       return dsuldto;
	   }

}
