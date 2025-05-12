import React, { useState } from 'react';
import './AccountSettings.css';

const sidebarItems = [
    { key: 'Trang cá nhân', icon: 'fa-user' },
    { key: 'Mật khẩu và bảo mật', icon: 'fa-shield-alt' }
];

// Mock data cho phần 'Trang cá nhân'
const profiles = [
    { id: 1, name: 'Hiếu Ngô', platform: 'Facebook, Instagram', avatar: '/images/avatar1.jpg' },
];

const AccountSettings = () => {
    const [activeSection, setActiveSection] = useState('Trang cá nhân');
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

    return (
        <div className="settings-root">
            <aside className="settings-sidebar">
                <div className="sidebar-header">
                    <i className="fab fa-meta"></i>
                    <h2>Trung tâm tài khoản</h2>
                    <p>Quản lý phần cài đặt tài khoản và trải nghiệm kết nối trên Meta như Facebook, Instagram và Meta Horizon. <a href="#">Tìm hiểu thêm</a></p>
                </div>
                <ul>
                    {sidebarItems.map(item => (
                        <li
                            key={item.key}
                            className={activeSection === item.key ? 'active' : ''}
                            onClick={() => setActiveSection(item.key)}
                        >
                            <i className={`fas ${item.icon}`}></i>
                            <span>{item.key}</span>
                        </li>
                    ))}
                </ul>
            </aside>

            <main className="settings-content">
                {activeSection === 'Trang cá nhân' && (
                    <>
                        <h3>Trang cá nhân</h3>
                        <p>Quản lý thông tin trên trang cá nhân và dùng chung thông tin trên Facebook, Instagram và Meta Horizon.</p>
                        <div className="profiles-list">
                            {profiles.map(p => (
                                <div key={p.id} className="profile-card">
                                    <img src={p.avatar} alt={p.name} />
                                    <div className="info">
                                        <strong>{p.name}</strong>
                                        <span>{p.platform}</span>
                                    </div>
                                    <i className="fas fa-chevron-right"></i>
                                </div>
                            ))}
                            <button className="add-profile">Thêm tài khoản</button>
                        </div>
                    </>
                )}

                {activeSection === 'Mật khẩu và bảo mật' && (
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
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <button className="back-btn" onClick={closeModal}>&larr;</button>
                            <h4>Đổi mật khẩu</h4>
                            <button className="close-btn" onClick={closeModal}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <div className="modal-user-info">
                                <span className="modal-username">Trọng Tấn Dương</span>
                                <span className="modal-platform">Facebook</span>
                            </div>
                            <p className="modal-desc">Mật khẩu của bạn phải có tối thiểu 6 ký tự, đồng thời bao gồm cả chữ số, chữ cái và ký tự đặc biệt (!@$@%).</p>
                            <input type="password" placeholder="Mật khẩu hiện tại (Ngày cập nhật: 14/11/2024)" />
                            <input type="password" placeholder="Mật khẩu mới" />
                            <input type="password" placeholder="Nhập lại mật khẩu mới" />
                            <a href="#" className="forgot-link">Bạn quên mật khẩu?</a>
                            <label className="logout-checkbox">
                                <input type="checkbox" /> Đăng xuất khỏi các thiết bị khác. Hãy chọn mục này nếu người khác từng dùng tài khoản của bạn.
                            </label>
                        </div>
                        <div className="modal-footer">
                            <button className="primary full">Đổi mật khẩu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountSettings;