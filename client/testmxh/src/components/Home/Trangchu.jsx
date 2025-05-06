import "./TrangChu.css";
// import "./Tc.css";
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
function Trangchu() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/trangcanhan");
  };
  const ClickSignOut = () => {
    navigate("/Facebook.com");
  };
  const [user, setUser] = useState(null);
  // useEffect(() => {
  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

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
  const [isVisibleavatar, setIsVisibleavatar] = useState(false);
  const hienkhunganh = () => {
    setIsVisibleavatar(!isVisibleavatar);
  };

  const [isVisiblebaidang, setIsVisiblebaidang] = useState(false);
  const hienbaidang = () => {
    setIsVisiblebaidang(!isVisiblebaidang);
  };

  // const [showForm, setShowForm] = useState(false);
  const [hienModal, setHienModal] = useState(false);
  const [hienTest, setHienTest] = useState(false);

  const [noidung, setNoidung] = useState("");
  const [dsBaiViet, setDsBaiViet] = useState([]);
  useEffect(() => {
    // Gọi API lấy danh sách bài viết từ database
    fetch("http://localhost:8080/api/baiviet")
      .then((response) => response.json())
      .then((data) => {
        console.log("Dữ liệu bài viết:", data);
        setDsBaiViet(data);
      })
      .catch((error) => console.error("Lỗi khi lấy bài viết:", error));
  }, []);
//   const handleDangBai = async () => {
//     const formData = new FormData();
//     formData.append("tennguoidung", user.tennguoidung);
//     formData.append("noidung", noidung);

//     // Nếu có URL của ảnh, chỉ gửi URL đó thay vì gửi file
//     if (anhDaTai) {
//         formData.append("image", anhDaTai);  // Gửi URL ảnh vào backend
//     }

//     try {
//         const response = await fetch("http://localhost:8080/api/baiviet/upload", {
//             method: "POST",
//             body: formData,
//         });

//         if (!response.ok) {
//             throw new Error("Đã xảy ra lỗi khi đăng bài");
//         }

//         const data = await response.json();
//         console.log("Bài viết đã được đăng:", data);
//     } catch (error) {
//         console.error("Lỗi khi đăng bài:", error);
//     }
// };

//   const handleDangBai = async () => {
//     const formData = new FormData();
//     formData.append("tennguoidung", user.tennguoidung);
//     formData.append("noidung", noidung);
//     if (anhDaTai) {
//         formData.append("image", anhDaTai); // Gửi file ảnh lên backend
//     }

//     try {
//         const response = await fetch("http://localhost:8080/api/baiviet/upload", {
//             method: "POST",
//             body: formData
//         });

//         const data = await response.json();
//         console.log("Bài viết đã được đăng:", data);
//     } catch (error) {
//         console.error("Lỗi khi đăng bài:", error);
//     }
// };

  const handleDangBai = async () => {
    if (!noidung.trim()) return; // Kiểm tra nếu nội dung rỗng

    const newPostData = {
      tennguoidung: user.tennguoidung,
      noidung: noidung, // Đúng biến
      thoigian: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:8080/api/baiviet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPostData),
      });

      if (response.ok) {
        const savedPost = await response.json();
        setDsBaiViet([savedPost, ...dsBaiViet]); // Cập nhật danh sách bài viết
        setNoidung(""); // Xóa nội dung input sau khi đăng
        setHienModal(false); // Ẩn modal sau khi đăng bài
      } else {
        console.error("Lỗi khi đăng bài");
      }
    } catch (error) {
      console.error("Lỗi kết nối API:", error);
    }
  };

  const [anhDaTai, setAnhDaTai] = useState(null);
  const handlePaste = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items;
    for (let item of items) {
      if (item.type.indexOf("image") !== -1) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (e) => {
          setAnhDaTai(e.target.result); // Lưu URL ảnh để hiển thị
        };
        reader.readAsDataURL(file);
      }
    }
  };

  // const handleDangBai = async () => {
  //   if (!noidung.trim()) return; // Kiểm tra nội dung không rỗng
  //   const baiviet = {
  //     tennguoidung: user.tennguoidung,
  //     noidung,
  //     thoigian: new Date().toISOString(),
  //   };
  //   try {
  //     const response = await fetch("http://localhost:8080/api/baiviet", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(baiviet),
  //     });
  //     if (response.ok) {
  //       const newPost = await response.json();
  //       setDsBaiViet([newPost, ...dsBaiViet]); // Cập nhật danh sách bài viết
  //       setNoidung(""); // Reset nội dung sau khi đăng
  //       setHienModal(false); // Ẩn modal
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi đăng bài:", error);
  //   }
  // };

  return (
    <div className="HomeCenterGiuaFromDang">
      {hienModal && (
        <div className="modal" >
          <div className="modal_overlay" onClick={() => setHienModal(false)}></div>
          <div className="modal_body"  onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">
              <p>Tạo bài viết</p>
            </div>

            <div className="gachngang"></div>

            <div className="modalinforuse">
              <div className="modalinforuseavatar">
                <img
                  src={`/Images/Imgbia/${user?.tenanhdaidien || "default.png"}`}
                  className="picavatatcn"
                  alt="Ảnh bìa"
                />
              </div>
              <div className="modalinforuseahaichucnang">
                <p>{user ? user.tennguoidung : "Đang tải..."}</p>
                <button className="cong-khai-btn">
                  <img src={`/Images/Icons/earth.svg`} alt="" />
                  Công khai
                  <span className="dropdown-arrow">▼</span>
                </button>
              </div>
            </div>

            <div className="modaluserwrite">
              <textarea
                style={{
                  resize: "none",
                  outline: "none",
                  borderColor: "white",
                }}
                rows="5"
                cols="66"
                name="comment"
                placeholder={
                  user ? user.tennd + " ơi, bạn đang nghĩ gì?" : "Đang tải..."
                }
                value={noidung}
                onChange={(e) => setNoidung(e.target.value)}
                onPaste={handlePaste} 
              ></textarea>
              {anhDaTai && <img src={anhDaTai} alt="Ảnh đã dán" style={{ width: "490px", height: "300px" }} />}
            </div>

            <div className="modaladdpostcover">
              <div className="modaladdpost">
                <p>Thêm vào bài viết của bạn</p>
              </div>
            </div>

            <div className="modalbamdangcover">
              <button onClick={handleDangBai}>Đăng</button>
            </div>
          </div>
        </div>
      )}
      {/* {showForm && (
      <div className="post-form-overlay">
        <div className="post-form">
          <h3>Tạo bài viết</h3>
          <textarea placeholder="Bạn đang nghĩ gì?" autoFocus />
          <button onClick={() => setShowForm(false)}>Đóng</button>
        </div>
      </div>
    )}; */}
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
            <li>
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
            <img src={testa} className="picavata" onClick={hienkhunganh} />
            <div className="Bannerrightanhduoi">
              <img src={picarrow} className="picavatedown" />
            </div>
          </div>
        </div>
      </div>
      <div className="HomeCenter">
        <div className="HomeCenterTrai">
          <div className="HomeCenterTraiTren">
            <ul>
              <li className="liavatar" onClick={handleClick}>
                <div className="centraiavatar">
                  <img src={testa} />
                </div>
                {/* <p>Trọng Tấn Dương</p> */}
                <p>{user ? user.tennguoidung : "Đang tải..."}</p>
              </li>
              <li>
                <div className="menu1"></div>
                <p>Bạn bè</p>
              </li>
              <li>
                <div className="menu2"></div>
                <p>Kỷ niệm</p>
              </li>

              <li>
                <div className="menu3"></div>
                <p>Đã lưu</p>
              </li>
              <li>
                <div className="menu4"></div>
                <p>Nhóm</p>
              </li>
              <li>
                <div className="menu5"></div>
                <p>Video</p>
              </li>
              <li>
                <div className="menu6"></div>
                <p>Marketplace</p>
              </li>
              <li>
                <div className="centraiavatar">
                  <img src={feed} />
                </div>
                <p>Bảng feed</p>
              </li>

              <li>
                <div className="leftcenter">
                  <img src={picarrow} className="leftcenterarrow" />
                </div>
                <p>Xem thêm</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="HomeCenterGiua">
          <div className="post-box">
            <div className="post-header">
              <img src={testa} className="avatar" />
              <input
                type="text"
                className="input-box"
                placeholder="Dương ơi, bạn đang nghĩ gì thế?"
                onClick={() => setHienModal(true)}
              />
            </div>
            <div className="actions">
              <div className="action-btn">
                <img src={videoo} />
                Video trực tiếp
              </div>
              <div className="action-btn">
                <img src={abum} />
                Ảnh/video
              </div>
              <div className="action-btn">
                <img src={camxuc} />
                Cảm xúc/hoạt động
              </div>
            </div>
          </div>
          <div className="postall">
            {dsBaiViet.length > 0 ? (
              dsBaiViet.map((post) => (
                <div key={post.id} className="postitem">
                  <div className="postitemup">
                    <img
                      src={`/Images/Imgbia/${
                        user?.tenanhdaidien || "default.png"
                      }`}
                      className="avatar"
                    />
                    <div className="postitemupright">
                      <p className="postname">{post.tennguoidung}</p>
                      <p className="postdate">
                        {/* {new Date(post.thoigian).toLocaleString("vi-VN")} */}
                        {(() => {
                          const now = new Date();
                          const postDate = new Date(post.thoigian);

                          // Tính khoảng cách thời gian (miliseconds)
                          const diffMs = now - postDate;

                          // Chuyển đổi mili giây thành giây, phút, giờ, ngày
                          const diffSeconds = Math.floor(diffMs / 1000);
                          const diffMinutes = Math.floor(diffSeconds / 60);
                          const diffHours = Math.floor(diffMinutes / 60);
                          const diffDays = Math.floor(diffHours / 24);

                          if (diffDays > 0) {
                            return `${diffDays} ngày trước`;
                          } else if (diffHours > 0) {
                            return `${diffHours} giờ trước`;
                          } else if (diffMinutes > 0) {
                            return `${diffMinutes} phút trước`;
                          } else {
                            return `Vừa xong`;
                          }
                        })()}
                      </p>
                    </div>
                    <div className="postitemore">
                      <img src={`/Images/Icons/more.svg`} alt="" onClick={() => setHienTest(true)}/>
                    </div>
                  </div>

                  <div className="postinput">
                    <p>{post.noidung}</p>
                    {/* {hienTest && (
                <div className="postitemchucnangcover">
                    <div className="postitemchucnangbody">
                        
                        </div>
                </div>
                  )} */}
                  </div>

                  <div className="gachngang1"></div>

                  <div className="postemotion">
                    <div className="postemotionlike">
                      <img src={`/Images/Icons/like.svg`} alt="" />
                      <p>Thích</p>
                    </div>

                    <div className="postemotioncmt">
                      <img src={`/Images/Icons/cmt.svg`} alt="" />
                      <p>Bình luận</p>
                    </div>

                    <div className="postemotionshare">
                      <img src={`/Images/Icons/share.svg`} alt="" />
                      <p>Chia sẻ</p>
                    </div>
                  </div>

                 
                </div>
              ))
            ) : (
              <p>Chưa có bài viết nào.</p>
            )}
          </div>
        </div>

        <div className="HomeCenterPhai">
          {/* <h1>HELLO</h1> */}

          {isVisibleavatar && (
            <div className="khungpicavata">
              <div className="khungpicavatatren">
                <div className="khungpicavatatrenavatar" onClick={handleClick}>
                  <div className="khungpicavatatanh">
                    <img
                      src={testa}
                      style={{ width: 38, height: 38, borderRadius: "50%" }}
                    />
                    <p>{user ? user.tennguoidung : "Đang tải..."}</p>
                  </div>
                </div>
                <div className="khungpicavatatrentatcatrang">
                  <button>Xem tất cả trang cá nhân</button>
                </div>
              </div>

              <div className="khungpicavataduoi">
                <ul>
                  <li>
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
                  <li>
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
        </div>
      </div>
    </div>
  );
}

export default Trangchu;
