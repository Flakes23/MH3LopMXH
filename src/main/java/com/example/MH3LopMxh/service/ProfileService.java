package com.example.MH3LopMxh.service;

import com.example.MH3LopMxh.dto.*;
import com.example.MH3LopMxh.model.*;
import com.example.MH3LopMxh.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

        // Nếu có parentCommentId (cho bình luận phản hồi)
        // dto.setParentCommentId(comment.getParentComment() != null ? comment.getParentComment().getIdComment() : null);

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
        // Sử dụng trường trực tiếp hoặc phương thức getter thích hợp thay vì getValue()
        // Giả sử trường là 'content' hoặc 'aboutValue'
        dto.setValue(userAbout.getDescription()); // Thay đổi tên phương thức này theo mô hình của bạn
        return dto;
    }
}
