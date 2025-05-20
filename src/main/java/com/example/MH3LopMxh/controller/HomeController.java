package com.example.MH3LopMxh.controller;


import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import com.example.MH3LopMxh.dto.FriendDTO;
import com.example.MH3LopMxh.dto.ImageDTO;
import com.example.MH3LopMxh.dto.MessageDTO;
import com.example.MH3LopMxh.dto.PostDTO;
import com.example.MH3LopMxh.dto.PostUserDTO;
import com.example.MH3LopMxh.dto.RelationshipDTO;
import com.example.MH3LopMxh.dto.UserMesageDTO;
import com.example.MH3LopMxh.dto.UserFlowingDTO;
import com.example.MH3LopMxh.model.Image;
import com.example.MH3LopMxh.model.Message;
import com.example.MH3LopMxh.model.Post;
import com.example.MH3LopMxh.model.PostImage;
import com.example.MH3LopMxh.model.PostUser;
import com.example.MH3LopMxh.model.Relationship;
import com.example.MH3LopMxh.model.User;
import com.example.MH3LopMxh.model.UserAbout;
import com.example.MH3LopMxh.model.UserFollow;
import com.example.MH3LopMxh.model.UsersImage;
import com.example.MH3LopMxh.repository.ImageRepository;
import com.example.MH3LopMxh.repository.MessageRepository;
import com.example.MH3LopMxh.repository.PostImageRepository;
import com.example.MH3LopMxh.repository.PostRepository;
import com.example.MH3LopMxh.repository.RelationshipRepository;
import com.example.MH3LopMxh.repository.UserAboutRepository;
import com.example.MH3LopMxh.repository.UserFollowRepository;
import com.example.MH3LopMxh.repository.UserRepository;
import com.example.MH3LopMxh.repository.UsersImageRepository;
import com.example.MH3LopMxh.service.HomeService;
import com.example.MH3LopMxh.service.MessageService;
import com.example.MH3LopMxh.service.PostService;
import com.example.MH3LopMxh.service.UserService;
import org.springframework.web.multipart.MultipartFile;


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
	   
	   @Autowired
	    private MessageService messservice;
	   
	    @Autowired
	    private MessageRepository messageRepository;
	    
	    @Autowired
	    private RelationshipRepository relationshipRepository;
	    
	    @Autowired
	    private UserService userService;
	    
	    @Autowired
	    private UserAboutRepository useraboutrepository;
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

	@PostMapping(value = "/postwrite", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public Post createPost(
			@RequestPart("postDto") PostDTO postDto,
			@RequestPart(value = "image", required = false) MultipartFile imageFile
	) throws IOException {
		System.out.println("Nội dung: " + postDto.getContent());
		System.out.println("User ID: " + postDto.getIduser());

		// Tạo bài viết và lưu
		long idPost = 100000 + new Random().nextInt(900000);
		Post post = new Post(idPost, postDto.getContent(), LocalDateTime.now(), LocalDateTime.now(), true);
		postService.save(post);
		postService.savepersonpost(idPost, postDto.getIduser());
		if (imageFile != null) {
			System.out.println("Tên file ảnh: " + imageFile.getOriginalFilename());
			postService.updatePostImage(idPost,imageFile);
		}
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

	   @GetMapping("/getuser")
	   public UserMesageDTO haveonefriend(@RequestParam long userId) {
           Optional<User> optionalUser = userRepository.findById(userId);
           User usertmp = optionalUser.get();
           UserMesageDTO userdto=new UserMesageDTO();
           userdto.setFirstName(usertmp.getFirstName());
           userdto.setLastName(usertmp.getLastName());
//           userdto.setLinkanh(usertmp.get)
       	Optional<UsersImage> profileImage1 = usersImageRepository.findByUser(usertmp);
       	if (profileImage1.isPresent()) {
            ImageDTO imageDTO1 = new ImageDTO();
            imageDTO1.setImageUrl(profileImage1.get().getImage().getUrlImage());
            userdto.setLinkanh(imageDTO1.getImageUrl());
        }
           return userdto;
	   }
	   
	   @GetMapping("/messfri")
	   public List<UserFlowingDTO> havemessfriend(@RequestParam long userId) {
		   List<UserFollow> dsuser = ufr.findByFollower_IdUser(userId);
		   List<UserFlowingDTO> dsuldto = new ArrayList<>();
	        for(int i=0;i<dsuser.size();i++) {
	        	UserFlowingDTO utmp=new UserFlowingDTO();
	        	Long id=dsuser.get(i).getFollowing().getIdUser(); 
	            Optional<User> optionalUser = userRepository.findById(id);
	            User user = optionalUser.get();
	            utmp.setIdus(user.getIdUser());
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
	   
	   @GetMapping("/hienchat")
	   public List<MessageDTO> havemessfriend(@RequestParam long userId, @RequestParam long userIdflo) {
	       // Lấy người dùng từ cơ sở dữ liệu
	       Optional<User> optionalUser1 = userRepository.findById(userId);
	       Optional<User> optionalUser2 = userRepository.findById(userIdflo);
	       if (!optionalUser1.isPresent() || !optionalUser2.isPresent()) {
	           // Nếu không tìm thấy người dùng, trả về danh sách rỗng hoặc xử lý lỗi theo cách khác
	           return new ArrayList<>();
	       }
	       User user1 = optionalUser1.get();
	       User user2 = optionalUser2.get();
	       // Lấy mối quan hệ giữa 2 người dùng
	       Optional<Relationship> relationshipOpt = relationshipRepository.findByUserOneAndUserTwo(user1, user2);
	       if (!relationshipOpt.isPresent()) {
	           // Nếu không có mối quan hệ giữa 2 người dùng, trả về danh sách rỗng
	           return new ArrayList<>();
	       }
	       Relationship relationship = relationshipOpt.get();
	       // Lấy danh sách tin nhắn dựa trên mối quan hệ
	       List<Message> messages = messageRepository.findMessagesBetweenUsers(userId,userIdflo);
       	Optional<UsersImage> profileImage = usersImageRepository.findByUser(user2);
	       // Chuyển các tin nhắn sang MessageDTO
	       List<MessageDTO> messageDTOList = new ArrayList<>();
	       for (Message message : messages) {
	           MessageDTO messageDTO = new MessageDTO();
	           messageDTO.setId(message.getId());
	           messageDTO.setContent(message.getContent());
	           messageDTO.setCreateAt(message.getCreateAt());
	           messageDTO.setIdUser(message.getFromUser().getIdUser());
	           
	           // Chuyển đổi RelationshipDTO
	           RelationshipDTO relationshipDTO = new RelationshipDTO();
	           relationshipDTO.setId(relationship.getId());
	           relationshipDTO.setStatus(relationship.getStatus().getStatus()); // Cập nhật theo thuộc tính của Relationship
	           messageDTO.setRelationship(relationshipDTO);
	           messageDTO.setLinkanh(profileImage.get().getImage().getUrlImage());

	           messageDTOList.add(messageDTO);
	       }
	       return messageDTOList;
	   }
	   
	   @PostMapping("/doimk")
	   public ResponseEntity<?> Doimktc(@RequestParam long userId, @RequestParam String mk,@RequestParam String mknew,@RequestParam String mknewagain) {
		   if(!mknew.equals(mknewagain)) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không thể thay đổi mật khẩu");
		   }
		   else {
		   boolean success = userService.changePassword(userId, mk, mknew);
	        if (success) {
	            return ResponseEntity.ok("Mật khẩu đã được thay đổi");
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Không thể thay đổi mật khẩu");
	        }
		   }
	   }

	   @GetMapping("/vietchat")
	   	public MessageDTO Chatmess(@RequestParam long userId, @RequestParam long userIdflo,@RequestParam String content){
		   MessageDTO messtmpdto=new MessageDTO(); 
		   LocalDateTime now = LocalDateTime.now();
		   Optional<User> optionalUser1 = userRepository.findById(userId);
		   Optional<User> optionalUser2 = userRepository.findById(userIdflo);
	       User user1 = optionalUser1.get();
	       User user2 = optionalUser2.get();
	       // Lấy mối quan hệ giữa 2 người dùng
	       Optional<Relationship> relationshipOpt = relationshipRepository.findByUserOneAndUserTwo(user1, user2);
	       if (!relationshipOpt.isPresent()) {
	           return  null;
	       }
	       Relationship relationship = relationshipOpt.get();
	       Message messdto =new Message();
//	       messdto.setId(6L);
	       messdto.setFromUser(user1);
	       messdto.setToUser(user2);
	       messdto.setCreateAt(now);
	       messdto.setContent(content);
	       messdto.setRelationship(relationship);
	       messageRepository.save(messdto);
	       
	       messtmpdto.setId(messdto.getId());
	       messtmpdto.setCreateAt(now);
	       messtmpdto.setContent(content);
	       messtmpdto.setIdUser(userId);
	       
           return messtmpdto;
	   }
	   
	   @GetMapping("/layallnd")
	   List<UserMesageDTO> Haveallfr() {
		   List<UserMesageDTO> dsusedto=new ArrayList<UserMesageDTO>();
		   List<User> dsuse=userRepository.findAll();
		   for (User users : dsuse) {
			   UserMesageDTO usedto=new UserMesageDTO();
		       	Optional<UsersImage> profileImage = usersImageRepository.findByUser(users);
		       	if (profileImage.isPresent()) {
		            usedto.setLinkanh(profileImage.get().getImage().getUrlImage());
		        } else {
		            usedto.setLinkanh(null); // hoặc set một ảnh mặc định nếu bạn muốn
		        }		       	usedto.setFirstName(users.getFirstName());
		       	usedto.setLastName(users.getLastName());
		       	List<UserAbout> ab=useraboutrepository.findByUser(users);
		       	if (ab != null && ab.size() > 1) {
		       	    usedto.setPhuttin(ab.get(1).getDescription());
		       	} else if (ab != null && !ab.isEmpty()) {
		       	    usedto.setPhuttin(ab.get(0).getDescription());
		       	} else {
		       	    usedto.setPhuttin("Sống tại Hồ Chí Minh");
		       	}
		       	usedto.setIdnd(users.getIdUser());
		       	dsusedto.add(usedto);
		   }
		   return dsusedto;
	   }
}
