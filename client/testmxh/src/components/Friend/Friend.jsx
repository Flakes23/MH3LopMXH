import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Friend.css';
import Navbar from '../impl/Navbar';

function Friend() {
    return (
        <div>
            <Navbar/>

            <div class="container-fluid">
                <div class="left-panel">
                    <ul>
                        <li>
                            <span>Bạn bè</span>
                        </li>
                        <li>
                            <div class="icon-circle1"><i class="fa fa-user"></i></div>
                            <span>Trang chủ</span>
                        </li>
                    </ul>
                </div>

                <div class="right-panel">
                    {/* Section Lời mời kết bạn */}
                    <div className="section">
                        <div className="section-header">
                            <h3>Lời mời kết bạn</h3>
                            <button className="see-all">Xem tất cả</button>
                        </div>
                        
                        <div className="user-cards">
                            {/* User Card 1 */}
                            <div className="user-card">
                                <div className="user-image"></div>
                                <div className="user-info">
                                    <h4>User A</h4>
                                    <p>3 bạn chung</p>
                                    <div className="user-actions">
                                        <button className="delete-btn">Xóa</button>
                                        <button className="accept-btn">Chấp nhận</button>
                                    </div>
                                </div>
                            </div>
                            
                            {/* User Card 2 */}
                            <div className="user-card">
                                <div className="user-image"></div>
                                <div className="user-info">
                                    <h4>User B</h4>
                                    <p>5 bạn chung</p>
                                    <div className="user-actions">
                                        <button className="delete-btn">Xóa</button>
                                        <button className="accept-btn">Chấp nhận</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <button className="see-more">Xem thêm</button>
                    </div>

                    {/* Section Những người bạn có thể biết */}
                    <div className="section">
                        <div className="section-header">
                            <h3>Những người bạn có thể biết</h3>
                            <button className="see-all">Xem tất cả</button>
                        </div>
                        
                        <div className="user-cards">
                            {/* User Card 1 */}
                            <div className="user-card">
                                <div className="user-image"></div>
                                <div className="user-info">
                                    <h4>User C</h4>
                                    <p>2 bạn chung</p>
                                    <button className="add-btn">Thêm bạn bè</button>
                                </div>
                            </div>
                            
                            {/* User Card 2 */}
                            <div className="user-card">
                                <div className="user-image"></div>
                                <div className="user-info">
                                    <h4>User D</h4>
                                    <p>4 bạn chung</p>
                                    <button className="add-btn">Thêm bạn bè</button>
                                </div>
                            </div>
                        </div>
                        
                        <button className="see-more">Xem thêm</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Friend;