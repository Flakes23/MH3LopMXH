import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Find.css';
import { useEffect, useState } from "react";
import Navbar from '../impl/Navbar';

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
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Find() {
      const navigate = useNavigate();

  const Clickhienkc = () => {
    navigate("/mess");
  };
const ClickHome = () => {
    navigate("/home");
  };
  const quatcn = () => {
   navigate("/finduse", {
    state: { findchat: valfind.valuefind},
  });
}


 const location = useLocation();
  const findchat = location.state?.findchat;
        const [Allgetuse, setAllgetuse] = useState([]);

        const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = profileData?.userInfo || {};
    const userId = 4638422354641785; // ID người dùng bạn đã cung cấp

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

      useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/home/layallnd");
      setAllgetuse(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching profile data:", err);
    } 
  };

  fetchProfileData(); 
}, []);
const [valfind,setvalfind]= useState({
    valuefind: "",
  });

   const sendRequest = async (toUserId) => {
    try {
      await axios.post(`http://localhost:8080/api/friends/send-request`, null, {
        params: { fromUserId: userId, toUserId },
      })
      setSuggested((prev) =>
        prev.map((user) =>
          user.idUser === toUserId ? { ...user, requested: true } : user
        )
      )
    } catch (error) {
      console.error("Lỗi khi gửi lời mời:", error)
    }
  }
    return (
        <div>
                    {/* <Navbar /> */}
<div className="Homebanner">
            <div className="search-container">
              <img src={face} alt="Facebook Logo" className="logo" />
              <div className="search-box">
                <i>
                  <img
                    src={kinh}
                    style={{ width: "15px", height: "15px", fill: "blue" }}
                    onClick={quatcn}
                  />
                </i>
                <input type="text" placeholder="Tìm kiếm trên Facebook" 
                value={valfind.valuefind}
  onChange={(e) =>
    setvalfind({
      ...valfind,
      valuefind: e.target.value,
    })
  }
                />
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
                  <img src={home} 
                  onClick={ClickHome}
                  />
                </li>
                {/* <li>
                  <img src={video} />
                </li> */}
                {/* <li>
                  <img src={market} />
                </li> */}
                {/* <li>
                  <img src={group} />
                </li> */}
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
                  src={userInfo.profileImageUrl}
                  className="picavata"
                  // onClick={hienkhunganh}
                />
                <div className="Bannerrightanhduoi">
                  <img src={picarrow} className="picavatedown" />
                </div>
              </div>
            </div>
          </div>

            <div className="container-fluidd">
                <div className="left-panel">
                    <ul>
                        <li>
                            <span>Bạn bè</span>
                        </li>
                        <li>
                            <div className="icon-circle1"><i className="fa fa-user"></i></div>
                            <span>Trang chủ</span>
                        </li>
                        <li>
                            <div className="icon-circle"><i className="fa fa-user-plus"></i></div>
                            <span>Lời mời kết bạn</span>
                        </li>
                        <li>
                            <div className="icon-circle"><i className="fa fa-user-friends"></i></div>
                            <span>Gợi ý</span>
                        </li>
                        <li>
                            <div className="icon-circle"><i className="fa fa-flag"></i></div>
                            <span>Tất cả bạn bè</span>
                        </li>
                        <li>
                            <div className="icon-circle"><i className="fa fa-gift"></i></div>
                            <span>Sinh nhật</span>
                        </li>
                        <li>
                            <div className="icon-circle"><i className="fa fa-list"></i></div>
                            <span>Danh sách tùy chỉnh</span>
                        </li>
                    </ul>
                </div>

                <div className="right-panell">
                   {/* <div class="cardd">
                            <div className="cardimg">
                                <img src={avatar} alt="" />
                            </div>
                            <div className="cardtitle">
                                <p className="cardtitlenum1">Trọng Tấn Dương</p>
                                <p className='cardtitlenum2'>Sống tại Hồ Chí Minh</p>
                            </div>
                              <button class="carddbtnadd">Thêm bạn bè</button>

                    </div> */}
                        {Allgetuse.map((post, index) => {
                      if (post.lastName == findchat || post.firstName==findchat) {
                        return (
                          <>
                            <div className="cardd" key={index || `default-${post.index || Math.random()}`}>
                            <div className="cardimg">
                                <img src={post.linkanh} alt="" />
                            </div>
                            <div className="cardtitle">
                                <p className="cardtitlenum1">{post.firstName}&nbsp;{post.lastName}</p>
                                <p className='cardtitlenum2'>{post.phuttin}</p>
                            </div>
                              <button className="carddbtnadd">Thêm bạn bè</button>

                    </div>
                          </>
                        );
                      } else {
                        return (
                          <>
                            {/* <div
                              key={
                                index ||
                                `default-${post.index || Math.random()}`
                              }
                              className="screenmesscoverusechatfollower"
                            >
                              <div className="screenmesscoverusechatfollowerchat">
                                <p>{post.content || "Nội dung không có sẵn"}</p>
                              </div>
                            </div> */}
                          </>
                        );
                      }
                    })}
                </div>
            </div>
        </div>
    );
}

export default Find;