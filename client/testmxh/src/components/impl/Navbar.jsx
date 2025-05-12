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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import cover from "../../assets/Images/Icons/testa.jpg";
import avatar from "../../assets/Images/Icons/testa.jpg";
import axios from "axios";

function Navbar() {
    const navigate = useNavigate();
  const Clickvaotc = () => {
    navigate("/home");
  };
  const hienkhunganh = () => {
    console.log("Avatar clicked!");
    // Bạn có thể mở menu user ở đây
  };
  const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
const userId = localStorage.getItem("idUser"); // ID người dùng bạn đã cung cấp
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        // Gọi API để lấy dữ liệu profile
        const response = await axios.get(
          `http://localhost:8080/api/profile/${userId}`
        );
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
  const userInfo = profileData?.userInfo || {};
const defaultCoverSrc = cover;
  const defaultAvatarSrc = avatar;
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
                <li onClick={Clickvaotc}>
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
                <li onClick={() => setshowmessage(true)}>
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
  );
}

export default Navbar;
