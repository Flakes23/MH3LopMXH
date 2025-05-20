"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useState, useEffect } from "react"
import "./Profile.css"
import Navbar from "../impl/Navbar"
import cover from "../../assets/Images/Icons/testa.jpg"
import avatar from "../../assets/Images/default-avatar.jpg"
import axios from "axios"
import Post from "../impl/PostComment"
import EditProfileModal from "./EditProfileModal"
import videoo from "../../assets/images/Icons/video.png";
import abum from "../../assets/images/Icons/abum.png";
import camxuc from "../../assets/images/Icons/camxuc.png";
import arrowleft from "../../assets/images/Icons/arrowleft.svg";
import earthicon from "../../assets/images/Icons/earth.svg";
import fricon from "../../assets/images/Icons/friendicon.svg";
import lock from "../../assets/images/Icons/lockicon.svg";
import upicon from "../../assets/images/Icons/tanh.png";
import { Pencil, Camera } from "lucide-react"
import { useParams } from "react-router-dom"


const Profile = () => {
  const { userId } = useParams()
  const currentUserId = localStorage.getItem("idUser")
  const [privacy, setPrivacy] = useState("Công khai");
  const profileIdToLoad = userId || currentUserId
  const isOwner = profileIdToLoad === currentUserId
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isVisibleavatar, setIsVisibleavatar] = useState(false)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null)
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null)
  const [selectedCoverFile, setSelectedCoverFile] = useState(null)
  const [coverPreviewUrl, setcoverPreviewUrl] = useState(null)
  const [hienModal, setHienModal] = useState(false);
  const [noidung, setNoidung] = useState("");
  const [activeTab, setActiveTab] = useState("posts");
// tan
  const [showprivacyhome, setshowprivacyhome] = useState(false);
  const [privacywrite, setprivacywrite] = useState("Công khai");
  const handleChangewrite = (value) => {
    setPrivacy(value);
  };
  const handleChange = (value) => {
    setPrivacy(value);
  };
  const [anhDaTai, setAnhDaTai] = useState(null);
  const triggerImageInput = () => {
    document.getElementById("image-input").click()
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedImageFile(file);
      setimagePreviewUrl(URL.createObjectURL(file));
    }
  }
  const [imagePreviewUrl, setimagePreviewUrl] = useState(null)
  const [selectedImageFile, setSelectedImageFile] = useState(null)
  const handlePaste = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
    for (let item of items) {
      if (item.type.indexOf("image") !== -1) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (e) => {
          setAnhDaTai(e.target.result); // Lưu URL ảnh để hiển thị
        };
        reader.readAsDataURL(file);
      }
    }
    // console.log(anhDaTai)
  };
    const handleDangBai = async () => {
  if (!noidung.trim()) return;

  const baiviet = {
    iduser: userId,
    content: noidung,
  };

  const formData = new FormData();
  formData.append("postDto", new Blob([JSON.stringify(baiviet)], { type: "application/json" }));
  console.log("formData", formData);
  
  // Nếu có file ảnh thì thêm vào
  if (selectedImageFile) {
    formData.append("image", selectedImageFile);
  }

  try {
    const response = await fetch(`http://localhost:8080/api/home/postwrite`, {
      method: "POST",
      body: formData, // KHÔNG set Content-Type — trình duyệt sẽ tự động thêm boundary cho multipart/form-data
    });

    const rawText = await response.text();

    if (response.ok) {
      try {
        const newPost = JSON.parse(rawText);
        setDsBaiViet([newPost, ...dsBaiViet]);
        setNoidung("");
        setSelectedImageFile(null);
        setHienModal(false);
        location.reload();
      } catch (jsonError) {
        console.error("Lỗi khi parse JSON:", jsonError);
      }
    } else {
      console.error("Lỗi từ server:", response.status);
    }
  } catch (error) {
    console.error("Lỗi khi đăng bài:", error);
  }
};
// tan

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true)
        // Gọi API để lấy dữ liệu profile
        const response = await axios.get(`http://localhost:8080/api/profile/${profileIdToLoad}`)
        setProfileData(response.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching profile data:", err)
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.")
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [userId])

  const handleAddComment = async (postId, commentText) => {
    try {
      const userId = localStorage.getItem("idUser")

      if (!userId) {
        alert("Bạn cần đăng nhập để bình luận")
        return
      }

      // Gọi API để thêm bình luận
      const response = await axios.post(
        `http://localhost:8080/api/comments/post/${postId}`,
        {
          content: commentText,
          user: { id: userId }
        },
        {
          headers: { Authorization: userId },
        }
      );

      // Cập nhật state để hiển thị bình luận mới
      if (response.data) {
        // Tìm bài đăng cần cập nhật
        const updatedPosts = profileData.posts.map((post) => {
          if (post.id === postId) {
            // Thêm bình luận mới vào danh sách
            const updatedCommentList = [...(post.commentList || []), response.data]
            return {
              ...post,
              commentList: updatedCommentList,
              comments: (post.comments || 0) + 1,
            }
          }
          return post
        })

        // Cập nhật state
        setProfileData({
          ...profileData,
          posts: updatedPosts,
        })
      }
    } catch (err) {
      console.error("Error adding comment:", err)
      alert("Không thể thêm bình luận. Vui lòng thử lại sau.")
    }
  }

  const hienkhunganh = () => {
    setIsVisibleavatar(!isVisibleavatar)
  }

  const handleProfileUpdate = (updatedInfo) => {
    setProfileData(updatedInfo)
    location.reload()
  }

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedAvatarFile(file);
      setAvatarPreviewUrl(URL.createObjectURL(file));
    }
  }

  const triggerFileInput = () => {
    document.getElementById('avatar-input').click();
  };

  const handleCoverChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setSelectedCoverFile(file);
      setcoverPreviewUrl(URL.createObjectURL(file))
    }
  }

  const triggerCoverInput = () => {
    document.getElementById("cover-input").click()
  }

  const uploadAvatar = async () => {
    if (!selectedAvatarFile) {
      alert("Vui lòng chọn ảnh trước.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", selectedAvatarFile);
      formData.append("userId", localStorage.getItem("idUser")); // Thêm userId vào
      for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
      const response = await axios.post("http://localhost:8080/api/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfileData((prevData) => ({
        ...prevData,
        userInfo: {
          ...prevData.userInfo,
          profileImageUrl: response.data.profileImageUrl,
        },
      }));

      setIsVisibleavatar(false);
      setSelectedAvatarFile(null);
      location.reload();
    } catch (err) {
      console.error("Upload avatar failed:", err);
      alert("Không thể cập nhật ảnh đại diện.");
    }
  };
  const uploadCover = async () => {
    if (!selectedCoverFile) {
      alert("Vui lòng chọn ảnh bìa trước.")
      return
    }

    try {
      const formData = new FormData()
      formData.append("cover", selectedCoverFile)
      formData.append("userId", localStorage.getItem("idUser"))

      const response = await axios.post("http://localhost:8080/api/profile/cover", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      setProfileData((prevData) => ({
        ...prevData,
        userInfo: {
          ...prevData.userInfo,
          coverImageUrl: response.data.coverImageUrl,
        },
      }))

      setSelectedCoverFile(null)
      location.reload()
    } catch (err) {
      console.error("Upload cover failed:", err)
      alert("Không thể cập nhật ảnh bìa.")
    }
  }




  // Fallback data khi API chưa trả về kết quả
  const defaultCoverSrc = cover
  const defaultAvatarSrc = avatar

  if (loading) {
    return (
      <div className="app-root">
        <Navbar />
        <div className="loading-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Đang tải...</span>
          </div>
          <p>Đang tải thông tin cá nhân...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-root">
        <Navbar />
        <div className="profile-error-container">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Thử lại
          </button>
        </div>
      </div>
    )
  }

  // Sử dụng dữ liệu từ API hoặc dữ liệu mặc định nếu chưa có
  const userInfo = profileData?.userInfo || {}
  const posts = profileData?.posts || []
  const friends = profileData?.friends || []
  const photos = profileData?.photos || []
  const aboutInfo = profileData?.aboutInfo || []

  return (
    <>
      <div className="app-root">
        <Navbar />
        <div className="profile-bgTop">
          <div className="profile-containerTop">
            <div className="profile-header">
              <div
                className="cover-photo"
                style={{
                  backgroundImage: `url(${coverPreviewUrl || userInfo.coverImageUrl || defaultCoverSrc})`,
                }}
                aria-label="Ảnh bìa cá nhân"
              />
              <div className="edit-buttons-container">
                {
                  isOwner && (
                    <button className="edit-cover-btn" onClick={triggerCoverInput}>
                      <Camera className="h-4 w-4 mr-2" />
                      Chỉnh sửa ảnh bìa
                    </button>
                  )
                }
                <input
                  type="file"
                  id="cover-input"
                  accept="image/*"
                  onChange={handleCoverChange}
                  style={{ display: "none" }}
                />
                {selectedCoverFile && (
                  <button className="btn btn-success mt-2" onClick={uploadCover}>
                    Cập nhật ảnh bìa
                  </button>
                )}
              </div>
              <img
                className="avatar"
                src={userInfo.profileImageUrl || defaultAvatarSrc}
                alt="Avatar cá nhân"
                onClick={hienkhunganh}
              />
            </div>
            <div className="profile-info">
              <div className="profile-name-container">
                <h1>
                  {userInfo.firstName} {userInfo.lastName}
                </h1>
                {isOwner && (
                  <button className="edit-profile-btn" onClick={() => setIsEditProfileModalOpen(true)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Chỉnh sửa thông tin cá nhân
                  </button>
                )}
              </div>
              <p>{profileData?.totalFriends || 0} người bạn</p>
              <div>
                <h4>Giới thiệu</h4>
                <p>
                  <strong>Tiểu sử: </strong>
                  {userInfo.bio || "Chưa cập nhật trạng thái"}
                </p>
                <div className="info-details">
                  {aboutInfo
                    .filter((info) => ["Giới tính", "Sống tại"].includes(info.type))
                    .map((info, index) => (
                      <div key={index}>
                        <strong>{info.type}:</strong> {info.value}
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className="actions-menubar">
              <a
                href="#"
                className={activeTab === "posts" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("posts");
                }}
              >
                Bài viết
              </a>
              <a
                href="#"
                className={activeTab === "friends" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("friends");
                }}
              >
                Bạn bè ({profileData?.totalFriends || 0})
              </a>
              <a
                href="#"
                className={activeTab === "photos" ? "active" : ""}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab("photos");
                }}
              >
                Hình ảnh ({profileData?.totalPhotos || 0})
              </a>
            </div>
          </div>
        </div>
        {activeTab === "posts" && (
          <div className="profile-container">
            {isOwner && (
              <div className="post-box">
                <div className="post-header">
                  <img
                    src={userInfo.profileImageUrl || defaultAvatarSrc}
                    className="avatarhomewriter"
                  />
                  <input
                    type="text"
                    className="input-box"
                    placeholder={
                      userInfo
                        ? `${userInfo.firstName} ${userInfo.lastName} ơi, bạn đang nghĩ gì thế?`
                        : "Đang tải..."
                    }
                    onClick={() => setHienModal(true)}
                  />
                </div>
                <div className="actions">
                  <div className="action-btn">
                    <img src={videoo} />
                    Video trực tiếp
                  </div>
                  <div className="action-btn">
                    <img src={abum} />
                    Ảnh/video
                  </div>
                  <div className="action-btn">
                    <img src={camxuc} />
                    Cảm xúc/hoạt động
                  </div>
                </div>
              </div>
            )}
            <div className="profile-posts">
              {posts.length > 0 ? (
                posts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    currentUserAvatar={userInfo.profileImageUrl || defaultAvatarSrc}
                    onAddComment={handleAddComment}
                  />
                ))
              ) : (
                <div className="no-posts-message">
                  <p>Chưa có bài viết nào.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "friends" && (
          <div className="profile-container">
            <div className="friend-list">
              <h3 className="mb-3">Bạn bè</h3>
              {profileData?.friends?.length > 0 ? (
                <ul className="friend-grid">
                  {profileData.friends.map((friend) => (
                    <li key={friend.id} className="friend-card" onClick={() => window.location.href = `/trangcanhan/${friend.id}`}>
                      <img
                        src={friend.profileImageUrl || defaultAvatarSrc}
                        alt={friend.username}
                        className="friend-avatar"
                      />
                      <p className="friend-name">{friend.firstName} {friend.lastName}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Không có bạn bè nào.</p>
              )}
            </div>
          </div>
        )}


        {activeTab === "photos" && (
          <div className="profile-container">
            <div className="photo-list">
              <p>Chức năng hình ảnh đang được phát triển...</p>
            </div>
          </div>
        )}
      </div>

      {isVisibleavatar && (
        <div className="avatar-modal" onClick={() => setIsVisibleavatar(false)}>
          <div className="avatar-modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Hiển thị ảnh đại diện, nếu đã có ảnh chọn thì dùng ảnh đó */}
            <img
              src={avatarPreviewUrl || userInfo.profileImageUrl || defaultAvatarSrc}
              alt="Avatar cá nhân"
              className="rounded-circle mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover" }}
            />
            <div className="avatar-modal-actions">
              {/* Nút Tải ảnh lên */}
              <button className="btn btn-primary" onClick={triggerFileInput}>
                Tải ảnh lên
              </button>

              {/* Input ẩn */}
              <input
                type="file"
                id="avatar-input"
                accept="image/*"
                onChange={handleAvatarChange}
                style={{ display: 'none' }} // Ẩn input đi
              />

              {/* Nút Cập nhật */}
              <button className="btn btn-success" onClick={uploadAvatar}>
                Cập nhật ảnh đại diện
              </button>

              {/* Nút Đóng */}
              <button className="btn btn-secondary" onClick={() => setIsVisibleavatar(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      <EditProfileModal
        isOpen={isEditProfileModalOpen}
        onClose={() => setIsEditProfileModalOpen(false)}
        userInfo={profileData}
        onProfileUpdate={handleProfileUpdate}
      />
      {hienModal && (
              <div className="modal">
                <div
                  className="modal_overlay"
                  onClick={() => setHienModal(false)}
                ></div>
                {/* -------- */}
      
                {/* ------------- */}
                <div className="modal_body" onClick={(e) => e.stopPropagation()}>
                  <div className="modal-titlechinh">
                    <p>Tạo bài viết</p>
                    <div
                      className="modaltitlebackchinh"
                      onClick={() => setHienModal(false)}
                    >
                      <img src={close} alt="" />
                    </div>
                  </div>
      
                  <div className="gachngang"></div>
      
                  <div className="modalinforuse">
                    <div className="modalinforuseavatar">
                      <img
                        // src={`/Images/Imgbia/${user?.tenanhdaidien || "default.png"}`}
                        // src={hthanh}
                        src={userInfo.profileImageUrl || defaultAvatarSrc}
                        className="picavatatcn"
                        alt="Ảnh bìa"
                      />
                    </div>
                    <div className="modalinforuseahaichucnang">
                      <p>
                        {userInfo.firstName} {userInfo.lastName}
                      </p>
                      <button
                        className="cong-khai-btn"
                        onClick={() => {
                          setHienModal(false); // đóng modal hiện tại
                          setshowprivacyhome(true); // mở modal mới
                        }}
                      >
                        {/* <img src={`/Images/Icons/earth.svg`} alt="" /> */}
                        <img src={earthicon} alt="" />
                        <p>&nbsp;{privacywrite}</p>
                        <span className="dropdown-arrow">▼</span>
                      </button>
                    </div>
                  </div>
                  <div className="modaluserwrite">
                    <textarea
                      style={{
                        resize: "none",
                        outline: "none",
                        borderColor: "white",
                      }}
                      rows="5"
                      cols="66"
                      name="comment"
                      placeholder={
                        userInfo
                          ? `${userInfo.firstName} ${userInfo.lastName} ơi, bạn đang nghĩ gì thế?`
                          : "Đang tải..."
                      }
                      value={noidung}
                      onChange={(e) => setNoidung(e.target.value)}
                      onPaste={handlePaste}
                    ></textarea>
                    {anhDaTai && (
                      <img
                        src={anhDaTai}
                        alt="Ảnh đã dán"
                        style={{ width: "490px", height: "300px" }}
                      />
                    )}
                  </div>
      
                  <div className="modaladdpostcover">
                    <div className="modaladdpost">
                      <p>Thêm vào bài viết của bạn</p>
                      <div className="modalpostmenu">
                        <ul>
                          <li onClick={triggerImageInput}>
                            <img src={upicon} alt="" />
                            <input
                              type="file"
                              id="image-input"
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{ display: "none" }}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <img src={imagePreviewUrl} alt="" className="imagepreview" />
      
                  <div className="modalbamdangcover">
                    <button onClick={handleDangBai}>Đăng</button>
                  </div>
                </div>
              </div>
            )}
    </>
  )
}

export default Profile
