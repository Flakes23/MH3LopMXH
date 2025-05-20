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
import arrowright from "../../assets/images/Icons/arrowright.svg";
import caidat from "../../assets/images/Icons/caidat.svg";
import help from "../../assets/images/Icons/help.svg";
import moon from "../../assets/images/Icons/moon.svg";
import mark from "../../assets/images/Icons/mark.svg";
import closeface from "../../assets/images/Icons/enter.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
   const quatcn = () => {
    navigate("/finduse", {
      state: { findchat: valfind.valuefind },
    });
  };
  const [showmessageuse, setshowmessageuse] = useState(false);
  const [isVisibleavata, setIsVisibleavata] = useState(false);
  const [showtronang, setshowtronang] = useState(false);
  const ClickSignOut = () => {
    navigate("/login");
  };
  const hienkhunganh = () => {
    setIsVisibleavata(!isVisibleavata);
  };
      const navigate = useNavigate();

  const handleClick = () => {
    navigate("/trangcanhan");
  };
  const Clickhienprivacy = () => {
    navigate("/privacy");
  };
  const Clickhienkc = () => {
    navigate("/mess");
    window.location.reload();
  };
  const ClickHome = () => {
    navigate("/home");
  };
 const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userInfo = profileData?.userInfo || {};
    const userId = 4638422354641785; // ID người dùng bạn đã cung cấp
 const [valfind, setvalfind] = useState({
    valuefind: "",
  });
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
          <i
          onClick={quatcn}>
            <img
              src={kinh}
              style={{ width: "15px", height: "15px", fill: "blue" }}
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
            // onClick={() => {
            //   setHienModal(true);
            //   setshowprivacyhome(false);
            //   setprivacywrite(privacy); // cập nhật giá trị cuối cùng
            //   handleChangewrite(privacy);
            // }}
                        onClick={ClickHome}

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
          {/* <li>
            <img src={menu} />
          </li> */}
          {/* <li onClick={() => setshowmessage(true)}> */}
          <li onClick={Clickhienkc}>
            <img src={mess} />
          </li>
          {/* <li>
            <img src={bell} />
          </li> */}
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
      <div className="HomeCenterPhai">
      {/* <h1>HELLO</h1> */}
      <>
        {showmessageuse && (
          <div className="screenmessuser">
            <div
              className="screenmess_overlayuser"
              onClick={() => setshowmessage(false)}
            ></div>
            <div className="screenmesscoveruse">
              <div className="screenmesscoverusetitle">
                <ul>
                  <li
                    key={
                      dschatmess.id ||
                      `default-${dschatmess.index || Math.random()}`
                    }
                  >
                    <div className="screenmesscoveruseimg">
                      <img
                        src={dschatmess.linkanh || defaultAvatarSrc}
                        alt=""
                      />{" "}
                    </div>
                    <p>
                      {dschatmess.lastName} {dschatmess.firstName}
                    </p>
                  </li>

                  {/* {dschatmess.length > 0 ? (
                    dschatmess.map((post) => (
                      <li
                        key={
                          post.id ||
                          `default-${post.index || Math.random()}`
                        }
                          
                      >
                        <div className="screenmesscoveruseimg">
                          <img
                            src={
                              post.linkanh || defaultAvatarSrc
                            }
                            alt=""
                          />{" "}
                        </div>
                        <p>
                          {post.lastName} {post.firstName}
                        </p>
                      </li>
                    ))
                  ) : (
                    <p>Chưa có bài viết nào.</p>
                  )} */}
                </ul>

                <img
                  src={close}
                  alt=""
                  className="screenmesscoverusetitleclose"
                  onClick={() => {
                    setshowmessageuse(false);
                  }}
                />
              </div>
              <div className="screenmesscoverusechat">
                {/* <div className="screenmesscoverusechatfollowing">
                  <div className="screenmesscoverusechatfollowingimg">
                    <img
                      src={userInfo.profileImageUrl || defaultAvatarSrc}
                      alt=""
                    />
                  </div>
                  <div className="screenmesscoverusechatfollowingchat">
                    <p>helo em</p>
                  </div>
                </div>

                <div className="screenmesscoverusechatfollower">
                  <div className="screenmesscoverusechatfollowerchat">
                    <p>helo gì ba?</p>
                  </div>
                </div> */}

                {dstinchat.map((post, index) => {
                  if (post.idUser === valuechat.iduserd) {
                    return (
                      <>
                        <div
                          key={
                            index ||
                            `default-${post.index || Math.random()}`
                          }
                          className="screenmesscoverusechatfollowing"
                        >
                          <div className="screenmesscoverusechatfollowingimg">
                            <img
                              src={
                                post.linkanh || defaultAvatarSrc
                              }
                              alt="User Avatar"
                            />
                          </div>
                          <div className="screenmesscoverusechatfollowingchat">
                            <p>{post.content || "Nội dung không có sẵn"}</p>
                          </div>
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div
                          key={
                            index ||
                            `default-${post.index || Math.random()}`
                          }
                          className="screenmesscoverusechatfollower"
                        >
                          <div className="screenmesscoverusechatfollowerchat">
                            <p>{post.content || "Nội dung không có sẵn"}</p>
                          </div>
                        </div>
                      </>
                    );
                  }
                })}
              </div>
              <div className="gachngangg"></div>
              <div className="screenmesscoverusewritechat">
                <input
                  type="text"
                  className="inputbox1"
                  placeholder={"Aa"}
                  // value={""}
                  // onClick={() => setHienModal(true)}
                  value={chatfollowing.writechat}
                  onChange={(e) =>
                    setchatfollowing({
                      ...chatfollowing,
                      writechat: e.target.value,
                    })
                  }
                />
                <img
                  src={send}
                  alt=""
                  onClick={() => {
                    // setHienModal(true);
                    // setshowprivacyhome(false);
                    // setprivacywrite(privacy); // cập nhật giá trị cuối cùng
                    // handleChangewrite(privacy);
                    userchatusefollow(valuechat);
                    // setchatfollowing({ iduserd: post.idus });
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </>
      {isVisibleavata && (
        <div className="khungpicavata">
          <div className="khungpicavatatren">
            <div className="khungpicavatatrenavatar" onClick={handleClick}>
              <div className="khungpicavatatanh">
                <img
                  // src={"/Images/Icons/testa.jpg"}
                  // src={hthanh}
                  src={userInfo.profileImageUrl || defaultAvatarSrc}
                  style={{ width: 38, height: 38, borderRadius: "50%" }}
                />
                <p>
                  {userInfo.firstName} {userInfo.lastName}
                </p>
              </div>
            </div>
            <div className="khungpicavatatrentatcatrang">
              <button>Xem tất cả trang cá nhân</button>
            </div>
          </div>

          <div className="khungpicavataduoi">
            <ul>
              <li onClick={Clickhienprivacy}>
                <div className="coverkhungpicavataduoi">
                  <img src={caidat} />
                </div>
                <p>Cài đặt và quyền riêng tư</p>
                <img src={arrowright} className="settingarrow" />
              </li>
              <li>
                <div className="coverkhungpicavataduoi">
                  <img src={help} />
                </div>
                <p>Trợ giúp và hỗ trợ</p>
                <img src={arrowright} className="settingarrow" />
              </li>
              <li
                onClick={() => {
                  setIsVisibleavatar(false);
                  setshowtronang(true);
                }}
              >
                <div className="coverkhungpicavataduoi">
                  <img src={moon} />
                </div>
                <p>Màn hình & trợ năng</p>
                <img src={arrowright} className="settingarrow" />
              </li>
              <li>
                <div className="coverkhungpicavataduoi">
                  <img src={mark} />
                </div>
                <div className="coverkhungpicavataduoip">
                  <p>Đóng góp ý kiến</p>
                  <p>CRT B</p>
                </div>
                {/* <p>Đóng góp ý kiến</p>                    */}
                {/* <p>CRT+B</p> */}
                <img src={arrowright} className="settingarrow" />
              </li>
              <li onClick={ClickSignOut}>
                <div className="coverkhungpicavataduoi">
                  <img
                    src={closeface}
                    style={{ width: "18px", height: "18px" }}
                  />
                </div>
                <p>Đăng xuất</p>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* --------------------- */}
      {showtronang && (
        <div className="screenaccessibility">
          <button style={{ backgroundColor: "blue", marginLeft: "130px" }}>
            Trợ năng
          </button>
        </div>
      )}
      </div>
    </div>
  );
}

export default Navbar;
