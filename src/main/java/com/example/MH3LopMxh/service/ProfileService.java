package com.example.MH3LopMxh.service;

import com.example.MH3LopMxh.dto.*;
import com.example.MH3LopMxh.model.*;
import com.example.MH3LopMxh.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProfileService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private RelationshipRepository relationshipRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private UserAboutRepository userAboutRepository;

    @Autowired
    private UsersImageRepository usersImageRepository;

    @Autowired
    private PostImageRepository postImageRepository;

    @Autowired
    private InteractionRepository interactionRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostUserRepository postUserRepository;

    @Autowired
    private PostCommentRepository postCommentRepository;

    @Autowired
    private AboutRepository aboutRepository;

    @Autowired
    private CloudinaryService cloudinaryService;

    public ProfileResponse getUserProfile(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (!optionalUser.isPresent()) {
            return null;
        }

        User user = optionalUser.get();
        ProfileResponse profileResponse = new ProfileResponse();

        // Thiết lập thông tin người dùng
        UserProfileDTO userProfileDTO = convertToUserProfileDTO(user);
        profileResponse.setUserInfo(userProfileDTO);

        // Lấy bài đăng của người dùng
        List<Post> userPosts = postRepository.findByUserIdOrderByCreateAtDesc(userId);
        List<PostDTO> postDTOs = userPosts.stream()
                .map(this::convertToPostDTO)
                .collect(Collectors.toList());
        profileResponse.setPosts(postDTOs);
        profileResponse.setTotalPosts(postDTOs.size());

        // Lấy danh sách bạn bè
        List<Relationship> friendRelationships = relationshipRepository.findFriendsByUserId(userId);
        List<FriendDTO> friendDTOs = friendRelationships.stream()
                .map(relationship -> {
                    User friend = relationship.getUserOne().getIdUser().equals(userId)
                            ? relationship.getUserTwo()
                            : relationship.getUserOne();
                    return convertToFriendDTO(friend);
                })
                .collect(Collectors.toList());
        profileResponse.setFriends(friendDTOs);
        profileResponse.setTotalFriends(friendDTOs.size());

        // Lấy hình ảnh của người dùng
        List<ImageDTO> imageDTOs = new ArrayList<>();
        // Ảnh đại diện
        Optional<UsersImage> profileImage = usersImageRepository.findByUser(user);
        if (profileImage.isPresent()) {
            ImageDTO imageDTO = new ImageDTO();
            imageDTO.setId(profileImage.get().getImage().getId());
            imageDTO.setImageUrl(profileImage.get().getImage().getUrlImage());
            imageDTO.setCaption("Ảnh đại diện");
            imageDTOs.add(imageDTO);
        }

        // Ảnh từ bài đăng
        for (Post post : userPosts) {
            Optional<PostImage> postImage = postImageRepository.findByPost(post);
            if (postImage.isPresent()) {
                ImageDTO imageDTO = new ImageDTO();
                imageDTO.setId(postImage.get().getImage().getId());
                imageDTO.setImageUrl(postImage.get().getImage().getUrlImage());
                imageDTO.setCaption(post.getContent());
                imageDTOs.add(imageDTO);
            }
        }

        profileResponse.setPhotos(imageDTOs);
        profileResponse.setTotalPhotos(imageDTOs.size());

        // Lấy thông tin giới thiệu
        List<UserAbout> userAbouts = userAboutRepository.findByUser(user);
        List<AboutDTO> aboutDTOs = userAbouts.stream()
                .map(this::convertToAboutDTO)
                .collect(Collectors.toList());
        profileResponse.setAboutInfo(aboutDTOs);

        return profileResponse;
    }

    private UserProfileDTO convertToUserProfileDTO(User user) {
        UserProfileDTO dto = new UserProfileDTO();
        dto.setId(user.getIdUser());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());

        // Lấy ảnh đại diện
        Optional<UsersImage> profileImage = usersImageRepository.findByUser(user);
        if (profileImage.isPresent()) {
            dto.setProfileImageUrl(profileImage.get().getImage().getUrlImage());
        } else {
            dto.setProfileImageUrl("/default-avatar.jpg");
        }

        List<UserAbout> userAbouts = userAboutRepository.findByUser(user);
        dto.setCoverImageUrl("/default-cover.jpg");
        for (UserAbout userAbout : userAbouts) {
            if(userAbout.getAbout().getName().equals("Cover Image")) {
                dto.setCoverImageUrl(userAbout.getDescription());
            }
            if(userAbout.getAbout().getName().equals("Bio")) {
                dto.setBio(userAbout.getDescription());
            }
        }

        return dto;
    }

    private PostDTO convertToPostDTO(Post post) {
        PostDTO dto = new PostDTO();
        dto.setId(post.getIdPost());
        dto.setContent(post.getContent());
        dto.setCreateAt(post.getCreateAt());

        // Lấy ảnh của bài đăng
        Optional<PostImage> postImage = postImageRepository.findByPost(post);
        if (postImage.isPresent()) {
            dto.setImageUrl(postImage.get().getImage().getUrlImage());
        }

        // Đếm số lượt thích
        Long likes = interactionRepository.countByPostId(post.getIdPost());
        dto.setLikes(likes.intValue());

        // Lấy danh sách bình luận
        List<Comment> comments = commentRepository.findByPostIdOrderByCreateAtAsc(post.getIdPost());
        List<CommentDTO> commentDTOs = comments.stream()
                .map(this::convertToCommentDTO)
                .collect(Collectors.toList());

        dto.setCommentList(commentDTOs);
        dto.setComments(commentDTOs.size()); // Vẫn giữ số lượng bình luận

        // Số lượt chia sẻ (giả định là 0)
        dto.setShares(0);

        // Thông tin người đăng - Sử dụng PostUserRepository thay vì getPostUsers()
        List<PostUser> postUsers = postUserRepository.findAllByPost(post);
        if (!postUsers.isEmpty()) {
            User postUser = postUsers.get(0).getUser();
            dto.setUser(convertToUserProfileDTO(postUser));
        }

        return dto;
    }

    private CommentDTO convertToCommentDTO(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getIdComment());
        dto.setContent(comment.getContent());
        dto.setCreateAt(comment.getCreateAt());

        // Thông tin người bình luận
        User user = comment.getUserSend();
        if (user != null) {
            dto.setUser(convertToUserProfileDTO(user));
        }

        // Lấy postId từ PostComment
        Optional<PostComment> postComment = postCommentRepository.findByComment(comment);
        if (postComment.isPresent()) {
            dto.setPostId(postComment.get().getPost().getIdPost());
        }

        return dto;
    }

    private FriendDTO convertToFriendDTO(User user) {
        FriendDTO dto = new FriendDTO();
        dto.setId(user.getIdUser());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());

        // Lấy ảnh đại diện
        Optional<UsersImage> profileImage = usersImageRepository.findByUser(user);
        if (profileImage.isPresent()) {
            dto.setProfileImageUrl(profileImage.get().getImage().getUrlImage());
        } else {
            dto.setProfileImageUrl("/default-avatar.jpg");
        }

        // Số bạn chung (giả định là 0, có thể tính toán sau)
        dto.setMutualFriends(0);

        return dto;
    }

    private AboutDTO convertToAboutDTO(UserAbout userAbout) {
        AboutDTO dto = new AboutDTO();
        dto.setType(userAbout.getAbout().getName());
        dto.setValue(userAbout.getDescription());
        return dto;
    }

    @Transactional
    public boolean updateUserProfile(Long userId, ProfileUpdateRequest request) {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (!optionalUser.isPresent()) {
            return false;
        }

        User user = optionalUser.get();

        // Cập nhật tiểu sử
        updateOrCreateUserAbout(user, "Bio", request.getBio());

        // Cập nhật giới tính
        updateOrCreateUserAbout(user, "Giới tính", request.getGender());

        // Cập nhật nơi sống
        updateOrCreateUserAbout(user, "Sống tại", request.getLocation());

        return true;
    }

    private void updateOrCreateUserAbout(User user, String aboutType, String value) {
        if (value == null || value.trim().isEmpty()) {
            return;
        }

        // Tìm About theo tên
        Optional<About> optionalAbout = aboutRepository.findByName(aboutType);
        About about;

        if (!optionalAbout.isPresent()) {
            // Nếu không tồn tại, tạo mới
            about = new About();
            about.setName(aboutType);
            about = aboutRepository.save(about);
        } else {
            about = optionalAbout.get();
        }

        // Tìm UserAbout hiện có
        Optional<UserAbout> optionalUserAbout = userAboutRepository.findByUserAndAbout(user, about);

        if (optionalUserAbout.isPresent()) {
            // Cập nhật nếu đã tồn tại
            UserAbout userAbout = optionalUserAbout.get();
            userAbout.setDescription(value);
            userAboutRepository.save(userAbout);
        } else {
            // Tạo mới nếu chưa tồn tại
            UserAbout userAbout = new UserAbout();
            userAbout.setUser(user);
            userAbout.setAbout(about);
            userAbout.setDescription(value);
            userAboutRepository.save(userAbout);
        }
    }

    public String updateUserAvatar(Long userId, MultipartFile avatarFile) throws IOException {
        // Tìm người dùng theo userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        // Kiểm tra xem người dùng đã có ảnh đại diện chưa
        Optional<UsersImage> optionalUsersImage = usersImageRepository.findByUser(user);

        String imageUrl = cloudinaryService.uploadImage(avatarFile);

        if (optionalUsersImage.isPresent()) {
            // Nếu đã có ảnh đại diện, cập nhật ảnh mới
            UsersImage usersImage = optionalUsersImage.get();
            Image image = usersImage.getImage();
            image.setUrlImage(imageUrl);
            imageRepository.save(image);
        } else {
            // Nếu chưa có ảnh đại diện, tạo mới ảnh và thêm vào bảng users_image
            Image newImage = new Image();
            newImage.setUrlImage(imageUrl);
            imageRepository.save(newImage);

            // Tạo mới bản ghi trong bảng users_image
            UsersImage usersImage = new UsersImage();
            usersImage.setUser(user);
            usersImage.setImage(newImage);
            usersImageRepository.save(usersImage);
        }

        return imageUrl;  // Trả về URL ảnh mới
    }
    public String updateCoverImage(Long userId, MultipartFile coverFile) throws IOException {
        // Tìm người dùng theo userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy người dùng"));

        // Kiểm tra sự tồn tại của About với tên "CoverImage"
        Optional<About> aboutOptional = aboutRepository.findByName("Cover Image");
        if (!aboutOptional.isPresent()) {
            throw new RuntimeException("Không tìm thấy thông tin về ảnh bìa");
        }
        About about = aboutOptional.get();

        // Kiểm tra xem người dùng đã có ảnh bìa chưa
        Optional<UserAbout> optionalUserAbout = userAboutRepository.findByUserAndAbout(user, about);

        // Tải ảnh lên Cloudinary và nhận URL
        String imageUrl = cloudinaryService.uploadImage(coverFile);

        if (optionalUserAbout.isPresent()) {
            // Nếu đã có ảnh bìa, cập nhật ảnh mới
            UserAbout userAbout = optionalUserAbout.get();
            userAbout.setDescription(imageUrl);
            userAboutRepository.save(userAbout);
        } else {
            // Nếu chưa có ảnh bìa, tạo mới bản ghi UserAbout
            UserAbout newUserAbout = new UserAbout();
            newUserAbout.setUser(user);
            newUserAbout.setAbout(about);
            newUserAbout.setDescription(imageUrl);
            userAboutRepository.save(newUserAbout);
        }

        return imageUrl;  // Trả về URL ảnh mới
    }

}
