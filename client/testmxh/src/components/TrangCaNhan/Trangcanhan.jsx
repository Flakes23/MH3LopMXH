import "./TrangCaNhan.css";
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
import videoo from "../../assets/Images/Icons/video.png";
import abum from "../../assets/Images/Icons/abum.png";
import camxuc from "../../assets/Images/Icons/camxuc.png";
import feed from "../../assets/Images/Icons/feed.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import caidat from "../../assets/Images/Icons/caidat.svg";
import arrowright from "../../assets/Images/Icons/arrowright.svg";
import help from "../../assets/Images/Icons/help.svg";
import moon from "../../assets/Images/Icons/moon.svg";
import mark from "../../assets/Images/Icons/mark.svg";
import closeface from "../../assets/Images/Icons/enter.png";
const Trangcanhan = () => {
  const navigate = useNavigate();
  const ClickHome = () => {
    navigate("/trangchu");
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Lỗi khi parse dữ liệu:", error);
    }
  }, []);
  return (
    <div className="containerhome">
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
            <li onClick={ClickHome}>
              <img src={home} />
            </li>
            <li>
              <img src={video} />
            </li>
            <li>
              <img src={market} />
            </li>
            <li>
              <img src={group} />
            </li>
            <li>
              <img src={game} />
            </li>
          </ul>
        </div>

        <div className="Bannerright">
          <ul>
            <li>
              <img src={menu} />
            </li>
            <li>
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
            {/* <img src={testa} className="picavata" /> */}
            <img
              src={`/Images/Imgbia/${user?.tenanhdaidien || "default.png"}`}
              className="picavata"
              alt="Ảnh bìa"
            />
            <div className="Bannerrightanhduoi">
              <img src={picarrow} className="picavatedown" />
            </div>
          </div>
        </div>
      </div>

      <div className="HomeCenterTrangCaNhan">
        <div className="HomeCenterPersonalpage">
          <div className="HomeCenterPersonal1">
            <div className="HomeCenterPersonalPictureCover">
              <div className="HomeCenterPersonalPicture">
                {/* <img src={`../../assets/Images/Imgbia/${user ? user.tenanhbia : "Đang tải..."}`} alt="" /> */}
                {/* <img src={`Images/Imagesbia/${user?.tenanhbia || "default.png"}`} alt="" /> */}
                {/* <img src={testa} /> */}
                <img
                  src={`/Images/Imgbia/${user?.tenanhbia || "default.png"}`}
                  alt="Ảnh bìa"
                />
              </div>
            </div>

            <div className="HomeCenterPersonalCenter">
              <div className="HomeCenterPersonalCenterUpCover">
                {/* <div className="HomeCenterPersonalCenterUp"> */}
                <div className="HomeCenterPersonalAvatar">
                  <img
                    src={`/Images/Imgbia/${
                      user?.tenanhdaidien || "default.png"
                    }`}
                    className="picavatatcn"
                    alt="Ảnh bìa"
                  />
                  {/* </div> */}
                </div>

                <div className="HomeCenterPersonalName">
                  <h1 className="NameAvatar">
                    {user ? user.tennguoidung : "Đang tải..."}
                  </h1>
                  <p className="AmountFriends">
                    {user ? user.soluongb + " người bạn" : "Đang tải..."}
                  </p>
                </div>

                <div class="button-container">
                  <button class="blue-button">+ Thêm vào tin</button>
                  <button class="gray-button">✏ Chỉnh sửa trang cá nhân</button>
                  {/* <button class="dropdown-button">▼</button> */}
                </div>
              </div>

              {/* <div className="gachngang">

              </div> */}
              <div className="HomeCenterPersonalCenterDown">
                    <div className="HomeCenterPersonalListChucnang">
                      <ul>
                        <li className="HomeCenterPersonalListChucnangColor">Bài viết</li>
                        <li>Giới thiệu</li>
                        <li>Bạn bè</li>
                        <li>Ảnh</li>
                        <li>Video</li>
                        <li>Check in</li>
                        <li className="buttonseemore">
                          <p style={{fontSize:"15px"}}>Xem thêm</p>
                        <img src={picarrow} className="arrowseemore" />
                        </li>
                      </ul>
                    </div>
                    <div className="HomeCenterPersonalSeeMore">
                    <button class="ButtonSeeMore">...</button>

                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Trangcanhan;
