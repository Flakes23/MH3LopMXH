import "./TrangChu.css";
// import testa from "../../assets/public/images/Icons/testa.jpg";
import face from "../../assets/images/Icons/face.png";
import kinh from "../../assets/images/Icons/kinh.svg";
import home from "../../assets/images/Icons/home.svg";
import video from "../../assets/images/Icons/video.svg";
import market from "../../assets/images/Icons/market.svg";
import group from "../../assets/images/Icons/group.svg";
import game from "../../assets/images/Icons/game.svg";
import menu from "../../assets/images/Icons/menu.svg";
import mess from "../../assets/images/Icons/mess.svg";
import bell from "../../assets/images/Icons/bell.svg";

import testa from "../../assets/images/Icons/testa.jpg";
import picarrow from "../../assets/images/Icons/picarrow.svg";
import videoo from "../../assets/images/Icons/video.png";
import abum from "../../assets/images/Icons/abum.png";
import camxuc from "../../assets/images/Icons/camxuc.png";
import feed from "../../assets/images/Icons/feed.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import caidat from "../../assets/images/Icons/caidat.svg";
import arrowright from "../../assets/images/Icons/arrowright.svg";
import help from "../../assets/images/Icons/help.svg";
import moon from "../../assets/images/Icons/moon.svg";
import mark from "../../assets/images/Icons/mark.svg";
import closeface from "../../assets/images/Icons/enter.png";
import upicon from "../../assets/images/Icons/tanh.png";
import friendicon from "../../assets/images/Icons/ngdung.png";
import earthicon from "../../assets/images/Icons/earth.svg";
import fricon from "../../assets/images/Icons/friendicon.svg";
import lock from "../../assets/images/Icons/lockicon.svg";
import arrowleft from "../../assets/images/Icons/arrowleft.svg";
import threedot from "../../assets/images/Icons/threedots.svg";
import sellall from "../../assets/images/Icons/maximize.svg";
import newchat from "../../assets/images/Icons/penv.svg";
import hthanh from "../../assets/images/thanh.jpg";
import close from "../../assets/images//Icons/closew.svg";
import cover from "../../assets/Images/Icons/testa.jpg";
import avatar from "../../assets/Images/Icons/testa.jpg";
import qc1 from "../../assets/Images/Imgkhac/qc1.jpg";
import qc2 from "../../assets/Images/Imgkhac/lq.jpg";
import send from "../../assets/Images/Icons/send.svg";
import axios from "axios";
function Trangchu() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/trangcanhan");
  };
  const ClickSignOut = () => {
    navigate("/login");
  };
    const showfri = () => {
    navigate("/friend");
  };
  const Clickhienkc = () => {
    navigate("/mess");
  };
  const Clickhienprivacy = () => {
    navigate("/privacy");
  };
  const quatcn = () => {
   navigate("/finduse", {
    state: { findchat: valfind.valuefind},
  });
}
 const ClickHome = () => {
    navigate("/home");
  };

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultCoverSrc = cover;
  const defaultAvatarSrc = avatar;
  const userId = localStorage.getItem("idUser")
  const userId1 = 213004106418984;
  //   const userId = 2698894998064136; // ID người dùng bạn đã cung cấp
  // const userId1 = 4638422354641785;
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

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
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

  const [isVisibleprivacy, setIsVisibleprivacy] = useState(false);
  const showprivacy = () => {
    // setIsVisiblebaidang(isVisibleprivacy);
    setIsVisibleprivacy(!isVisibleprivacy);
  };

  // const [showForm, setShowForm] = useState(false);
  const [hienModal, setHienModal] = useState(false);
  const [hienTest, setHienTest] = useState(false);
  const [showprivacyhome, setshowprivacyhome] = useState(false);
  const [showmessage, setshowmessage] = useState(false);
  const [showmessageuse, setshowmessageuse] = useState(false);
  const [showtronang, setshowtronang] = useState(false);

  const [noidung, setNoidung] = useState("");
  const [dsBaiViet, setDsBaiViet] = useState([]);
  const [dsMesstc, setdsMesstc] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/profile/${userId}`
        );
        // const response = await axios.get("http://localhost:8080/post"); // nhớ đúng URL backend bạn nhé
        setDsBaiViet(response.data.posts); // response.data.posts là mảng bài viết
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài viết:", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:8080/api/home/messfri`,
          {
            params: { userId: userId }, // truyền userId dưới dạng query param
          }
        );
        setdsMesstc(response.data);
        console.log(response.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      // Đảm bảo userId đã có giá trị
      fetchProfileData();
    }
  }, [userId]); // useEffect sẽ chạy lại khi userId thay đổi

  const [dschatmess, setdschatmess] = useState([]);
  const showchatwithfollowing = async (iduserd) => {
    // const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/home/getuser`,
        {
          params: { userId: iduserd }, // truyền userId dưới dạng query param
        }
      );
      setdschatmess(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
    // };
  };

  // -----TEST
  const [dstinchat, setdstinchat] = useState([]);
  const submitsaveid = async (iduserd) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/home/hienchat`,
        {
          params: {
            userId: userId,
            userIdflo: iduserd, // lấy trực tiếp từ tham số
          },
        }
      );
      setdstinchat(response.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  const handleDangBai = async () => {
  if (!noidung.trim()) return;

  const baiviet = {
    iduser: userId,
    content: noidung,
  };

  const formData = new FormData();
  formData.append("postDto", new Blob([JSON.stringify(baiviet)], { type: "application/json" }));
  console.log("formData", formData);
  
  // Nếu có file ảnh thì thêm vào
  if (selectedImageFile) {
    formData.append("image", selectedImageFile);
  }

  try {
    const response = await fetch(`http://localhost:8080/api/home/postwrite`, {
      method: "POST",
      body: formData, // KHÔNG set Content-Type — trình duyệt sẽ tự động thêm boundary cho multipart/form-data
    });

    const rawText = await response.text();

    if (response.ok) {
      try {
        const newPost = JSON.parse(rawText);
        setDsBaiViet([newPost, ...dsBaiViet]);
        setNoidung("");
        setSelectedImageFile(null);
        setHienModal(false);
        location.reload();
      } catch (jsonError) {
        console.error("Lỗi khi parse JSON:", jsonError);
      }
    } else {
      console.error("Lỗi từ server:", response.status);
    }
  } catch (error) {
    console.error("Lỗi khi đăng bài:", error);
  }
};


  const [anhDaTai, setAnhDaTai] = useState(null);
  const handlePaste = (event) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;
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
    // console.log(anhDaTai)
  };
  useEffect(() => {
    // Mỗi khi anhDaTai thay đổi, sẽ in giá trị mới của anhDaTai
    if (anhDaTai) {
      console.log(anhDaTai); // Đây sẽ in giá trị ảnh sau khi đã được lưu trữ vào anhDaTai
    }
  }, [anhDaTai]); // Chạy mỗi khi anhDaTai thay đổi

  const userchatusefollow = async (iduserd) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/home/vietchat`,
        {
          params: {
            userId: userId,
            userIdflo: valuechat.iduserd,
            content: chatfollowing.writechat,
          },
        }
      );
setdstinchat([...dstinchat, response.data]);
    } catch (err) {
      console.error("Error fetching profile data:", err);
    } finally {
      setLoading(false);
    }
  };

  const [privacy, setPrivacy] = useState("Công khai");
  const handleChange = (value) => {
    setPrivacy(value);
  };
  const [privacywrite, setprivacywrite] = useState("Công khai");
  const handleChangewrite = (value) => {
    setPrivacy(value);
  };
  const userInfo = profileData?.userInfo || {};
  const [tronang, settronang] = useState({
    maus: "",
  });
  const [valuechat, setvaluechat] = useState({
    iduserd: "213004106418984",
  });
  const [chatfollowing, setchatfollowing] = useState({
    writechat: "",
  });
  const [valfind,setvalfind]= useState({
    valuefind: "",
  });
  return (
    <div className="HomeCenterGiuaFromDang">
      {showprivacyhome && (
        <div className="modal">
          <div
            className="modal_overlay"
            onClick={() => {
              setHienModal(false); // đóng modal hiện tại
              setshowprivacyhome(false); // mở modal mới
            }}
          ></div>
          <div className="modalprivacy">
            <div className="modal-title">
              <div
                className="modaltitleback"
                onClick={() => {
                  setHienModal(true);
                  setshowprivacyhome(false);
                }}
              >
                <img src={arrowleft} alt="" />
              </div>
              <p>Đối tượng của bài viết</p>
            </div>
            <div className="modalintroduce">
              <div className="modalintroducetitleup">
                <p className="titleup1">Ai có thể xem bài viết của bạn</p>
                <p className="titleup2">
                  Bài viết của bạn sẽ hiển thị trên Bảng feed, trang cá nhân và
                </p>
                <p className="titleup3">trong kết quả tìm kiếm.</p>
              </div>
              <div className="modalintroducetitledown">
                <div className="modalintroducetitledowncover">
                  <p className="titledown1">Tuy đối tượng mặc định là</p>
                  <p className="titledowntmp">&nbsp;{privacy}</p>
                  <p>, nhưng bạn có thể thay đổi</p>
                </div>
                <p className="titledown2">đối tượng của riêng bài viết này.</p>
              </div>
            </div>
            <div className="modalmenuprivate">
              <ul>
                <li>
                  <div className="menuprivateleft">
                    <div className="menuprivateicons">
                      <img src={earthicon} alt="" className="menuprivateicon" />
                    </div>
                  </div>
                  <div className="menuprivatewrite">
                    <p className="menuprivatewriteup">Công khai</p>
                    <p className="menuprivatewritedown">
                      Bất kỳ ai ở trên hoặc ngoài Facebook
                    </p>
                  </div>
                  <label className="menuprivatetick">
                    {/* <div classname="menuprivatetick"> */}
                    <input
                      type="radio"
                      checked={privacy === "Công khai"}
                      onChange={() => handleChange("Công khai")}
                    />
                    {/* </div> */}
                  </label>
                </li>
                <li>
                  <div className="menuprivateleft">
                    <div className="menuprivateicons">
                      <img src={fricon} alt="" className="menuprivateicon" />
                    </div>
                  </div>
                  <div className="menuprivatewrite">
                    <p className="menuprivatewriteup">Bạn bè</p>
                    <p className="menuprivatewritedown">
                      Bạn bè của bạn trên facebook
                    </p>
                  </div>
                  <label className="menuprivatetick">
                    <input
                      type="radio"
                      name="privacy"
                      checked={privacy === "Bạn bè"}
                      onChange={() => handleChange("Bạn bè")}
                    />
                  </label>
                </li>
                <li>
                  <div className="menuprivateleft">
                    <div className="menuprivateicons">
                      <img src={lock} alt="" className="menuprivateicon" />
                    </div>
                  </div>
                  <div className="menuprivatewrite">
                    <p className="menuprivatewriteup">Chỉ mình tôi</p>
                    <p className="menuprivatewritedown">
                      Bất kỳ ai ở trên hoặc ngoài Facebook
                    </p>
                  </div>
                  <label className="menuprivatetick">
                    <input
                      type="radio"
                      name="privacy"
                      checked={privacy === "Chỉ mình tôi"}
                      onChange={() => handleChange("Chỉ mình tôi")}
                    />
                  </label>
                </li>
              </ul>
            </div>
            <div className="modalmenuprivatebutton">
              <div
                className="buttonhuy"
                onClick={() => {
                  setHienModal(true);
                  setshowprivacyhome(false);
                }}
              >
                <p>Hủy</p>
              </div>
              <div
                className="buttonfinish"
                onClick={() => {
                  setHienModal(true);
                  setshowprivacyhome(false);
                  setprivacywrite(privacy); // cập nhật giá trị cuối cùng
                  handleChangewrite(privacy);
                }}
              >
                <button>Xong</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {hienModal && (
        <div className="modal">
          <div
            className="modal_overlay"
            onClick={() => setHienModal(false)}
          ></div>
          {/* -------- */}

          {/* ------------- */}
          <div className="modal_body" onClick={(e) => e.stopPropagation()}>
            <div className="modal-titlechinh">
              <p>Tạo bài viết</p>
              <div
                className="modaltitlebackchinh"
                onClick={() => setHienModal(false)}
              >
                <img src={close} alt="" />
              </div>
            </div>

            <div className="gachngang"></div>

            <div className="modalinforuse">
              <div className="modalinforuseavatar">
                <img
                  // src={`/Images/Imgbia/${user?.tenanhdaidien || "default.png"}`}
                  // src={hthanh}
                  src={userInfo.profileImageUrl || defaultAvatarSrc}
                  className="picavatatcn"
                  alt="Ảnh bìa"
                />
              </div>
              <div className="modalinforuseahaichucnang">
                <p>
                  {userInfo.firstName} {userInfo.lastName}
                </p>
                <button
                  className="cong-khai-btn"
                  onClick={() => {
                    setHienModal(false); // đóng modal hiện tại
                    setshowprivacyhome(true); // mở modal mới
                  }}
                >
                  {/* <img src={`/Images/Icons/earth.svg`} alt="" /> */}
                  <img src={earthicon} alt="" />
                  <p>&nbsp;{privacywrite}</p>
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
                  userInfo
                    ? `${userInfo.firstName} ${userInfo.lastName} ơi, bạn đang nghĩ gì thế?`
                    : "Đang tải..."
                }
                value={noidung}
                onChange={(e) => setNoidung(e.target.value)}
                onPaste={handlePaste}
              ></textarea>
              {anhDaTai && (
                <img
                  src={anhDaTai}
                  alt="Ảnh đã dán"
                  style={{ width: "490px", height: "300px" }}
                />
              )}
            </div>

            <div className="modaladdpostcover">
              <div className="modaladdpost">
                <p>Thêm vào bài viết của bạn</p>
                <div className="modalpostmenu">
                  <ul>
                    <li onClick={triggerImageInput}>
                      <img src={upicon} alt="" />
                      <input
                        type="file"
                        id="image-input"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <img src={imagePreviewUrl} alt="" className="imagepreview" />

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
          <div className="search-box" >
            <i>
              <img
                src={kinh}
                style={{ width: "15px", height: "15px", fill: "blue" }}
                onClick={quatcn}
              />
            </i>
            <input
  type="text"
  placeholder="Tìm kiếm trên Facebook"
  value={valfind.valuefind}
  onChange={(e) =>
    setvalfind({
      ...valfind,
      valuefind: e.target.value,
    })
  }
/>

            {/* setchatfollowing({
                          ...chatfollowing,
                          writechat: e.target.value,
                        }) */}
          </div>
        </div>

        <div className="Bannercenter">
          <ul>
            <li
              onClick={() => {
                // setHienModal(true);
                // setshowprivacyhome(false);
                // setprivacywrite(privacy); // cập nhật giá trị cuối cùng
                // handleChangewrite(privacy);
                                ClickHome();

              }}
            >
              <img src={home} />
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
      <div className="HomeCenter">
        <div className="HomeCenterTrai">
          <div className="HomeCenterTraiTren">
            <ul>
              <li className="liavatar" onClick={handleClick}>
                <div className="centraiavatar">
                  {/* <img src={hthanh} /> */}
                  {/* src={userInfo.profileImageUrl || defaultAvatarSrc}  */}
                  <img
                    src={userInfo.profileImageUrl || defaultAvatarSrc}
                    alt=""
                  />
                </div>
                <p>
                  {userInfo.firstName} {userInfo.lastName}
                </p>
              </li>
              <li onClick={showfri}>
                <div className="menu1"></div>
                <p>Bạn bè</p>
              </li>
              {/* <li>
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
              </li> */}
              {/* <li>
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
              </li> */}
            </ul>
          </div>
        </div>

        <div className="HomeCenterGiua">
          <div className="post-box">
            <div className="post-header">
              <img
                // src={"/Images/Icons/testa.jpg"}
                // src={hthanh}
                src={userInfo.profileImageUrl || defaultAvatarSrc}
                className="avatarhomewriter"
              />
              <input
                type="text"
                className="input-box"
                placeholder={
                  userInfo
                    ? `${userInfo.firstName} ${userInfo.lastName} ơi, bạn đang nghĩ gì thế?`
                    : "Đang tải..."
                }
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
                <div
                  key={post.idPost || `default-${post.index || Math.random()}`}
                  className="postitem"
                >
                  <div className="postitemup">
                    <img
                      src={userInfo.profileImageUrl}
                      className="avatarpostitemup"
                    />
                    <div className="postitemupright">
                      <p className="postname">
                        {/* {post.user
                          ? `${post.user.firstName} ${post.user.lastName}`
                          : "Unknown User"} */}
                        {userInfo.firstName} {userInfo.lastName}
                      </p>
                      <p className="postdate">
                        {/* {new Date(post.createAt).toLocaleDateString("vi-VN")} */}
                        {(() => {
                          const now = new Date();
                          const postDate = new Date(post.createAt);
                          const diffMs = now - postDate;
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
                      <img
                        src={`/Images/Icons/more.svg`}
                        alt=""
                        onClick={() => setHienTest(true)}
                      />
                    </div>
                  </div>

                  <div className="postinput">
                    <p>{post.content}</p>
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

          <>
            {showmessage && (
              <div className="screenmess">
                <div
                  className="screenmess_overlay"
                  onClick={() => setshowmessage(false)}
                ></div>
                <div className="screenmesscover">
                  <div className="screenmessbanner">
                    <p>Đoạn chat</p>
                    <div className="screenmessbannerallicon">
                      <div className="screenmessbannermoreicon">
                        <img src={threedot} alt="" />
                      </div>
                      <div className="screenmessbannerseeall">
                        <img src={sellall} alt="" />
                      </div>
                      <div className="screenmessbannernewchat">
                        <img src={newchat} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className="searchboxmess">
                    <i>
                      <img
                        src={kinh}
                        style={{ width: "15px", height: "15px", fill: "blue" }}
                      />
                    </i>
                    <input type="text" placeholder="Tìm kiếm trên Messenger" />
                  </div>
                </div>
              </div>
            )}
          </>
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
                          <img className="screenmesscoveruseimgtitleimg"
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
                      style={{width: "250px",height:"20px"}}
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
          {isVisibleavatar && (
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
                  {/* <li>
                    <div className="coverkhungpicavataduoi">
                      <img src={help} />
                    </div>
                    <p>Trợ giúp và hỗ trợ</p>
                    <img src={arrowright} className="settingarrow" />
                  </li> */}
                  {/* <li
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
                  </li> */}
                  {/* <li>
                    <div className="coverkhungpicavataduoi">
                      <img src={mark} />
                    </div>
                    <div className="coverkhungpicavataduoip">
                      <p>Đóng góp ý kiến</p>
                      <p>CRT B</p>
                    </div>
                    
                    <img src={arrowright} className="settingarrow" />
                  </li> */}
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
          {/* ------------------------- */}
          <div className="HomeCenterPhaiAdvertisement">
            <div className="HomeCenterPhaiAdvertisementTitle">
              <p>Được tài trợ</p>
            </div>
            <div className="HomeCenterPhaiAdvertisements">
              <a
                href="https://www.oneesports.gg/mobile-legends/mlbb-x-naruto-skins/"
                className="HomeCenterPhaiAdvertisement1cover"
              >
                <div className="HomeCenterPhaiAdvertisement1">
                  <div className="HomeCenterPhaiAdvertisement1img">
                    <img src={qc1} alt="" />
                  </div>
                  <div className="HomeCenterPhaiAdvertisement1title">
                    <p className="HomeCenterPhaiAdvertisement1title1">
                      Mobile Legends: Bang Bang
                    </p>
                    <p className="HomeCenterPhaiAdvertisement1title2">
                      https://www.oneesports.gg/mobile-legends/mlbb-x-naruto-skins/
                    </p>
                  </div>
                </div>
              </a>

              <a
                href="https://lienquan.garena.vn/chi-tiet-ban-cap-nhat-le-hoi-5v5-ngay-23-04-2025/"
                className="HomeCenterPhaiAdvertisement1cover"
              >
                <div className="HomeCenterPhaiAdvertisement1">
                  <div className="HomeCenterPhaiAdvertisement1img">
                    <img src={qc2} alt="" />
                  </div>
                  <div className="HomeCenterPhaiAdvertisement1title">
                    <p className="HomeCenterPhaiAdvertisement1title1">
                      Arena of Valor
                    </p>
                    <p className="HomeCenterPhaiAdvertisement1title2">
                      https://lienquan.garena.vn/chi-tiet-ban-<br></br>
                      cap-nhat-le-hoi-5v5-ngay-23-04-2025/
                    </p>
                  </div>
                </div>
              </a>
            </div>
            <div className="gachngang"></div>
            <div className="HomeCenterPhaiAdvertisementMess">
              {/* <div className="HomeCenterPhaiAdvertisementMessTitle"> */}
              <p>Người liên hệ</p>
              {/* <div className="HomeCenterPhaiAdvertisementMessTitleimg1">
                  <img src={kinh} alt="" />
                </div>
                <div className="HomeCenterPhaiAdvertisementMessTitleimg2">
                  <img src={`/Images/Icons/more.svg`} alt="" />
                </div> */}
              {/* </div> */}
              <div className="HomeCenterPhaiAdvertisementShowMess">
                <ul>
                  {dsMesstc.length > 0 ? (
                    dsMesstc.map((post) => (
                      <li
                        key={post.idus || `fallback-${index}`}
                        // key={
                        //    `default-${post.index || Math.random()}`
                        // }

                        onClick={() => {
                          setvaluechat({ iduserd: post.idus });
                          submitsaveid(post.idus),
                            showchatwithfollowing(post.idus),
                            setshowmessageuse(true);
                        }}
                        value={post.idus}
                      >
                        <div className="HomeCenterPhaiAdvertisementShowMessimg">
                          <img src={post.imageUrl || defaultAvatarSrc} alt="" />{" "}
                        </div>
                        <p>
                          {post.lastName} {post.firstName}
                        </p>
                      </li>
                    ))
                  ) : (
                    <p>Chưa có bài viết nào.</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trangchu;
