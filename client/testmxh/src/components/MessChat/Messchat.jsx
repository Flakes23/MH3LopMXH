import React from 'react';
import './Messchat.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from '../impl/Navbar';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Messchat() {
  return (
    <div className="messenger-page">
      <Navbar />

      <div className="mes-container">
        {/* Left Panel */}
        <div className="left-panel">
        <ul className="tabs">
            <li className="tab active"><b>Hộp thư </b><span className="badge">4</span></li>
        </ul>

        <div className="search-bar">
            <div className="search-input">
            <i className="fas fa-search" />
            <input type="text" placeholder="Tìm kiếm trên Messenger" />
            </div>
        </div>

        <div className="chat-list">
        {[
            {name: "Hiếu Ngô", message: "Hello World", time: "15 phút", unread: 1},
            {name: "Ngu Ngơ :v", message: "Lmao", time: "2 giờ"},
            {name: "Ngu Ngơ part 2", message: "Ối giồi ôi", time: "1 ngày"},
            {name: "Bộ từ siêu dẳng", message: "Check Check Check", time: "1 ngày"},
        ].map((user, index) => (
            <div key={index} className="chat-item">
            <div className="user-avatar">{user.name[0]}</div>
            <div className="chat-info">
                <div className="info-header">
                <h4>{user.name}</h4>
                <span className="time">{user.time}</span>
                </div>
                <p className="last-message">
                {user.message}
                {user.unread && <span className="unread-badge">{user.unread}</span>}
                </p>
            </div>
            </div>
        ))}
        </div>
        </div>

        {/* Middle Panel (chat-detail) */}
        <div className="middle-panel">
          <div className="chat-header">
            <div className="user-info">
              <div className="avatar-large" />
              <div className="title">
                <h2><b>Hiếu Ngô</b></h2>
                <p className="subtitle">Được mã hóa đầu cuối</p>
              </div>
            </div>
            <div className="header-icons">
              <i className="fas fa-phone" />
              <i className="fas fa-video" />
              <i className="fas fa-search" />
              <i className="fas fa-ellipsis-h" />
            </div>
          </div>

          <div className="chat-history">
            {/* TODO: render history messages */}
            <div className="message">
              <div className="msg-content">
                <p>Hello</p>
                <span>9:00 AM</span>
              </div>
            </div>
            <div className="message user">
              <div className="msg-content">
                <p>Hello World</p>
                <span>9:01 AM</span>
              </div>
            </div>
          </div>

          <div className="chat-input">
            <i className="fas fa-plus" />
            <input type="text" placeholder="Aa" />
            <i className="fas fa-thumbs-up" />
          </div>
        </div>

        {/* Right Panel (info sidebar) */}
        <div className="right-panel">
          <div className="sidebar-avatar" />
          <h3><b>Hiếu Ngô</b></h3>
          <p className="sidebar-subtitle">Được mã hóa đầu cuối</p>

          <div className="sidebar-buttons">
            <button><i className="fas fa-user" /> Trang cá nhân</button>
            <button><i className="fas fa-bell-slash" /> Tắt thông báo</button>
            <button><i className="fas fa-search" /> Tìm kiếm</button>
          </div>

          <div className="accordion">
            <div className="acc-item">
              <div className="acc-header">Thông tin về đoạn chat</div>
              <div className="acc-body">{/* nội dung */}</div>
            </div>
            <div className="acc-item">
              <div className="acc-header">Tùy chỉnh đoạn chat</div>
              <div className="acc-body">{/* nội dung */}</div>
            </div>
            <div className="acc-item">
              <div className="acc-header">File phương tiện & file</div>
              <div className="acc-body">{/* nội dung */}</div>
            </div>
            <div className="acc-item">
              <div className="acc-header">Quyền riêng tư và hỗ trợ</div>
              <div className="acc-body">{/* nội dung */}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messchat;