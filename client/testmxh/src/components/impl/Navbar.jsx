import React from "react";
import "./Navbar.css";
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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const hienkhunganh = () => {
    console.log("Avatar clicked!");
    // Bạn có thể mở menu user ở đây
  };
      const navigate = useNavigate();

  const Clickhienkc = () => {
    navigate("/mess");
  };
  const ClickHome = () => {
    navigate("/home");
  };
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
  return (
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
                  onClick={hienkhunganh}
                />
                <div className="Bannerrightanhduoi">
                  <img src={picarrow} className="picavatedown" />
                </div>
              </div>
            </div>
          </div>
  );
}

export default Navbar;
