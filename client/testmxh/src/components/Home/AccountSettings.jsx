// import React, { useState } from 'react';
import "./AccountSettings.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const profiles = [
  {
    id: 1,
    name: "Hiếu Ngô",
    platform: "Facebook, Instagram",
    avatar: "/images/avatar1.jpg",
  },
];
const sidebarItems = [
  { key: "Trang cá nhân", icon: "fa-user" },
  { key: "Mật khẩu và bảo mật", icon: "fa-shield-alt" },
];

const AccountSettings = () => {
  const navigate = useNavigate();
   const handleClick = () => {
    navigate("/trangcanhan");
  };
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("Trang cá nhân");
  const [showModal, setShowModal] = useState(false);
  const userId = 4638422354641785; // ID người dùng bạn đã cung cấp
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const userInfo = profileData?.userInfo || {};
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // Gọi API để lấy dữ liệu profile
        const response = await axios.get(
          `http://localhost:8080/api/profile/${userId}`
        );
        console.log(response.data);
        setProfileData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId]);

  const [taikhoan, settaikhoan] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordAgain: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    settaikhoan((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Current Password:", taikhoan.currentPassword);
    console.log("New Password:", taikhoan.newPassword);
    console.log("New Password Again:", taikhoan.newPasswordAgain);

    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `http://localhost:8080/api/home/doimk`,
            {}, // body rỗng vì bạn dùng @RequestParam

          {
            params: {
            userId:userId,
              mk: taikhoan.currentPassword,
              mknew: taikhoan.newPassword,
              mknewagain:taikhoan.newPasswordAgain
            },
          }
        );
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchProfileData();
    }
  };

  return (
    <div className="settings-root">
      <aside className="settings-sidebar">
        <div className="sidebar-header">
          <i className="fab fa-meta"></i>
          <h2>Trung tâm tài khoản</h2>
          <p>
            Quản lý phần cài đặt tài khoản và trải nghiệm kết nối trên Meta như
            Facebook, Instagram và Meta Horizon. <a href="#">Tìm hiểu thêm</a>
          </p>
        </div>
        <ul>
          {sidebarItems.map((item) => (
            <li
              key={item.key}
              className={activeSection === item.key ? "active" : ""}
              onClick={() => setActiveSection(item.key)}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.key}</span>
            </li>
          ))}
        </ul>
      </aside>

      <main className="settings-content">
        {activeSection === "Trang cá nhân" && (
          <>
            <h3>Trang cá nhân</h3>
            <p>
              Quản lý thông tin trên trang cá nhân và dùng chung thông tin trên
              Facebook, Instagram và Meta Horizon.
            </p>
            <div className="profiles-list">
              {profiles.map((p) => (
                <div key={p.id} className="profile-card" onClick={handleClick}>
                  <img src={userInfo.profileImageUrl} />
                  <div className="info">
                    <strong>
                      {userInfo.firstName} {userInfo.lastName}
                    </strong>
                    <span>{p.platform}</span>
                  </div>
                  <i className="fas fa-chevron-right"></i>
                </div>
              ))}
              {/* <button className="add-profile">Thêm tài khoản</button> */}
            </div>
          </>
        )}

        {activeSection === "Mật khẩu và bảo mật" && (
          <>
            <h3>Mật khẩu và bảo mật</h3>
            <p>Đổi mật khẩu để bảo vệ tài khoản của bạn.</p>
            <div className="password-section">
              <button onClick={openModal}>Đổi mật khẩu</button>
            </div>
          </>
        )}
      </main>

      {showModal && (
        <div className="modal-overlayy" onClick={closeModal}>
          <div className="modall" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="back-btn" onClick={closeModal}>
                &larr;
              </button>
              <h4>Đổi mật khẩu</h4>
              <button className="close-btn" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-user-info">
                <span className="modal-username">
                  {userInfo.firstName} {userInfo.lastName}
                </span>
                <span className="modal-platform">Facebook</span>
              </div>
              <p className="modal-desc">
                Mật khẩu của bạn phải có tối thiểu 6 ký tự, đồng thời bao gồm cả
                chữ số, chữ cái và ký tự đặc biệt (!@$@%).
              </p>
              <input
                type="password"
                placeholder="Mật khẩu hiện tại (Ngày cập nhật: 14/11/2024)"
                name="currentPassword"
                value={taikhoan.currentPassword}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Mật khẩu mới"
                name="newPassword"
                value={taikhoan.newPassword}
                onChange={handleChange}
              />
              <input
                type="password"
                placeholder="Nhập lại mật khẩu mới"
                name="newPasswordAgain"
                value={taikhoan.newPasswordAgain}
                onChange={handleChange}
              />
              <a href="#" className="forgot-link">
                Bạn quên mật khẩu?
              </a>
              <label className="logout-checkbox">
                <input type="checkbox" /> Đăng xuất khỏi các thiết bị khác. Hãy
                chọn mục này nếu người khác từng dùng tài khoản của bạn.
              </label>
            </div>
            <div className="modal-footer">
              <button className="primary full" onClick={handleSubmit}>
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
