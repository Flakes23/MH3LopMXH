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

function Navbar() {
  const hienkhunganh = () => {
    console.log("Avatar clicked!");
    // Bạn có thể mở menu user ở đây
  };

  return (
    <div className="Homebanner">
      <div className="search-container">
        <img src={face} alt="Facebook Logo" className="logo" />
        <div className="search-box">
          <i>
            <img
              src={kinh}
              alt="Search Icon"
              style={{ width: "15px", height: "15px" }}
            />
          </i>
          <input type="text" placeholder="Tìm kiếm trên Facebook" />
        </div>
      </div>

      <div className="Bannercenter">
        <ul>
          <li>
            <img src={home} alt="Home" />
          </li>
          <li>
            <img src={video} alt="Video" />
          </li>
          <li>
            <img src={market} alt="Marketplace" />
          </li>
          <li>
            <img src={group} alt="Groups" />
          </li>
          <li>
            <img src={game} alt="Gaming" />
          </li>
        </ul>
      </div>

      <div className="Bannerright">
        <ul>
          <li>
            <img src={menu} alt="Menu" />
          </li>
          <li>
            <img src={mess} alt="Messenger" />
          </li>
          <li>
            <img src={bell} alt="Notifications" />
          </li>
        </ul>
        <div className="Bannerrightanh">
          <img
            src={testa}
            className="picavata"
            alt="User Avatar"
            onClick={hienkhunganh}
          />
          <div className="Bannerrightanhduoi">
            <img src={picarrow} className="picavatedown" alt="Dropdown Arrow" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
