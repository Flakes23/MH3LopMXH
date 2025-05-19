import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React, { useState, useEffect } from 'react';
import './Profilechat.css';
import Navbar from '../impl/Navbar';
import cover from "../../assets/Images/Icons/testa.jpg";
import avatar from "../../assets/Images/Icons/testa.jpg";
import face from "../../assets/Images/Icons/face.png";
import kinh from "../../assets/Images/Icons/kinh.svg";
import home from "../../assets/Images/Icons/home.svg";
import video from "../../assets/Images/Icons/video.svg";
import market from "../../assets/Images/Icons/market.svg";
import group from "../../assets/Images/Icons/group.svg";
import game from "../../assets/Images/Icons/game.svg";
import menu from "../../assets/Images/Icons/menu.svg";
import mess from "../../assets/Images/Icons/mess.svg";
import bell from "../../assets/Images/Icons/bell.svg";
import testa from "../../assets/Images/Icons/testa.jpg";
import picarrow from "../../assets/Images/Icons/picarrow.svg";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Post = ({ post, currentUserAvatar }) => (
  <div className="post-card">
    <div className="post-header">
      <img className="post-avatar" src={post.user?.profileImageUrl || avatar} alt={`${post.user?.firstName || 'User'} avatar`} />
      <div className="post-user-info">
        <strong>{post.user ? `${post.user.firstName} ${post.user.lastName}` : 'Unknown User'}</strong>
        <div className="post-meta">
          <span className="timestamp">{new Date(post.createAt).toLocaleDateString('vi-VN')}</span>
          <i className="fas fa-globe-americas privacy-icon"></i>
        </div>
      </div>
      <i className="fas fa-ellipsis-h post-options"></i>
    </div>

    <div className="post-content">
      {post.content && post.content.split('\n').map((line, i) => (
        <p key={i}>{line}</p>
      ))}
    </div>

    {post.imageUrl && (
      <div className="post-image">
        <img src={post.imageUrl || "/placeholder.svg"} alt="Post image" />
      </div>
    )}

    <div className="post-reactions">
      {post.likes > 0 && (
        <><i className="far fa-thumbs-up"></i> {post.likes} người đã bày tỏ cảm xúc</>
      )}
    </div>

    <div className="post-actions">
      <span><i className="far fa-thumbs-up"></i> Thích</span>
      <span><i className="far fa-comment"></i> Bình luận ({post.comments})</span>
      <span><i className="fas fa-share"></i> Chia sẻ ({post.shares})</span>
    </div>

    <div className="post-comment-box">
      <img className="comment-avatar" src={currentUserAvatar || "/placeholder.svg"} alt="Bạn avatar" />
      <input type="text" placeholder="Viết bình luận..." />
    </div>
  </div>
);

const Profilechat = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisibleavatar, setIsVisibleavatar] = useState(false);
 const Clickhienkc = () => {
    navigate("/mess");
  };
  // ID người dùng - có thể lấy từ URL hoặc từ context/redux store
    const location = useLocation();
const userId = location.state?.userId;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // Gọi API để lấy dữ liệu profile
        const response = await axios.get(`http://localhost:8080/api/profile/${userId}`);
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Không thể tải dữ liệu. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  const hienkhunganh = () => {
    setIsVisibleavatar(!isVisibleavatar);
  };

  // Fallback data khi API chưa trả về kết quả
  const defaultCoverSrc = cover;
  const defaultAvatarSrc = avatar;

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
    );
  }

  if (error) {
    return (
      <div className="app-root">
        <Navbar />
        <div className="error-container">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Sử dụng dữ liệu từ API hoặc dữ liệu mặc định nếu chưa có
  const userInfo = profileData?.userInfo || {};
  const posts = profileData?.posts || [];
  const friends = profileData?.friends || [];
  const photos = profileData?.photos || [];
  const aboutInfo = profileData?.aboutInfo || [];

  return (
    <>
      <div className="app-root">
<div className="Homebanner">
        <div className="search-container">
          <img src={face} alt="Facebook Logo" className="logo" />
          <div className="search-box">
            <i>
              <img
                src={kinh}
                style={{ width: "15px", height: "15px", fill: "blue" }}
              />
            </i>
            <input type="text" placeholder="Tìm kiếm trên Facebook" />
          </div>
        </div>

        <div className="Bannercenter">
          <ul>
            <li
              onClick={() => {
                setHienModal(true);
                setshowprivacyhome(false);
                setprivacywrite(privacy); // cập nhật giá trị cuối cùng
                handleChangewrite(privacy);
              }}
            >
              <img src={home} />
            </li>
            <li>
              <img src={video} />
            </li>
            {/* <li>
              <img src={market} />
            </li> */}
            <li>
              <img src={group} />
            </li>
            {/* <li>
              <img src={game} />
            </li> */}
          </ul>
        </div>

        <div className="Bannerright">
          <ul>
            <li>
              <img src={menu} />
            </li>
            {/* <li onClick={() => setshowmessage(true)}> */}
            <li onClick={Clickhienkc}>
              <img src={mess} />
            </li>
            <li>
              <img src={bell} />
            </li>
            {/* <li>
            <img src={testa} />
            </li> */}
          </ul>
          <div className="Bannerrightanh">
            <img
              // src={"/Images/Icons/testa.jpg"}
              // src={hthanh}
              src={userInfo.profileImageUrl || defaultAvatarSrc}
              className="picavata"
              onClick={hienkhunganh}
            />
            <div className="Bannerrightanhduoi">
              <img src={picarrow} className="picavatedown" />
            </div>
          </div>
        </div>
      </div>    
          <div className="profile-bgTop">
          <div className="profile-containerTop">
            <div className="profile-header">
              <div
                className="cover-photo"
                style={{ backgroundImage: `url(${userInfo.coverImageUrl || defaultCoverSrc})` }}
                aria-label="Ảnh bìa cá nhân"
              />
              <button className="edit-cover-btn">Chỉnh sửa ảnh bìa</button>
              <img 
                className="avatar" 
                src={userInfo.profileImageUrl || defaultAvatarSrc} 
                alt="Avatar cá nhân" 
                onClick={hienkhunganh}
              />
            </div>
            <div className="profile-info">
              <h1>{userInfo.firstName} {userInfo.lastName}</h1>
              <p>{profileData?.totalFriends || 0} người bạn</p>
              <div>
                <h4>Giới thiệu</h4>
                <p><strong>Tiểu sử: </strong>{userInfo.bio || 'Chưa cập nhật trạng thái'}</p>
                <div className="info-details">
                  {aboutInfo
                    .filter(info => ['Giới tính', 'Sống tại'].includes(info.type))
                    .map((info, index) => (
                      <div key={index}>
                        <strong>{info.type}:</strong> {info.value}
                      </div>
                    ))}
                </div>
              </div>
          </div>

            <div className="actions-menubar">
              <a href="#" className="active">Bài viết</a>
              <a href="#">Bạn bè ({profileData?.totalFriends || 0})</a>
              <a href="#">Hình ảnh ({profileData?.totalPhotos || 0})</a>
              <a href="#">Chỉnh sửa cá nhân</a>
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
              posts.map(post => (
                <Post 
                  key={post.id} 
                  post={post} 
                  currentUserAvatar={userInfo.profileImageUrl || defaultAvatarSrc} 
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
          <div className="avatar-modal-content" onClick={e => e.stopPropagation()}>
            <img src={userInfo.profileImageUrl || defaultAvatarSrc} alt="Avatar cá nhân" />
            <div className="avatar-modal-actions">
              <button className="btn btn-primary">Cập nhật ảnh đại diện</button>
              <button className="btn btn-secondary" onClick={() => setIsVisibleavatar(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profilechat;