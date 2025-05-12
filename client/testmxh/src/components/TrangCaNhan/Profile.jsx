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
import { Pencil, Camera } from "lucide-react"

const Profile = () => {
  const [profileData, setProfileData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isVisibleavatar, setIsVisibleavatar] = useState(false)
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false)
  const [selectedAvatarFile, setSelectedAvatarFile] = useState(null)
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(null)
  const [selectedCoverFile, setSelectedCoverFile] = useState(null)
  const [coverPreviewUrl, setcoverPreviewUrl] = useState(null)

  const userId = localStorage.getItem("idUser")

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true)
        // Gọi API để lấy dữ liệu profile
        const response = await axios.get(`http://localhost:8080/api/profile/${userId}`)
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
                <button className="edit-cover-btn" onClick={triggerCoverInput}>
                  <Camera className="h-4 w-4 mr-2" />
                  Chỉnh sửa ảnh bìa
                </button>
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
                <button className="edit-profile-btn" onClick={() => setIsEditProfileModalOpen(true)}>
                  <Pencil className="h-4 w-4 mr-2" />
                   Chỉnh sửa thông tin cá nhân
                </button>
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
              <a href="#" className="active">
                Bài viết
              </a>
              <a href="#">Bạn bè ({profileData?.totalFriends || 0})</a>
              <a href="#">Hình ảnh ({profileData?.totalPhotos || 0})</a>
              <a href="#" onClick={() => setIsEditProfileModalOpen(true)}>
                Chỉnh sửa cá nhân
              </a>
            </div>
          </div>
        </div>

        <div className="profile-container">
          <div className="create-profile-posts">
            <div className="new-posts">
              <span className="profile"></span>
              <input type="text" placeholder="Bạn đang nghĩ gì?" />
            </div>
          </div>

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
    </>
  )
}

export default Profile
