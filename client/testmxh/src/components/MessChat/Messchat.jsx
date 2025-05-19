import React from "react";
import "./Messchat.css";

import Navbar from "../impl/Navbar";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function Messchat() {
      const [dschatmess, setdschatmess] = useState([]);

    const navigate = useNavigate();
      const quatcn = () => {
   navigate("/tcnchat", {
    state: { userId: valuechat.iduserd},
  });
}
  const userId = localStorage.getItem("idUser")
    const userId1 = 213004106418984;

  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
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


  
  const [dstinchat, setdstinchat] = useState([]);
    useEffect(() => {
      const fetchProfileData = async () => {
      try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/home/hienchat`,
        {
          params: {
            userId: userId,
            userIdflo: userId1, // lấy trực tiếp từ tham số
          },
        }
      );
      setdstinchat(response.data);
      console.log(response.data)
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
    };
    fetchProfileData();
}, [userId]);

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
    } catch (err) {
      console.error("Error fetching profile data:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };
  
  const [dsuserid, setdsuserid] = useState([]);


  const [dsMesstc, setdsMesstc] = useState([]);
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
        console.log(response.data)
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


   useEffect(() => {
   const fetchProfileData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/home/getuser`,
        {
          params: { userId: userId }, // truyền userId dưới dạng query param
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
    };

    if (userId) {
      // Đảm bảo userId đã có giá trị
      fetchProfileData();
    }
  }, [userId]); // useEffect sẽ chạy lại khi userId thay đổi
// cá nhân
  const [dstinchatfinalcanhan, setdstinchatfinalcanhan] = useState([]);
 useEffect(() => {
  const fetchAllChats = async () => {
    try {
      setLoading(true);
      const allMessages = await Promise.all(
        dsMesstc.map(async (user) => {
          // console.log(user.idus)
          const response = await axios.get(
            `http://localhost:8080/api/home/hienchat`,
            {
              params: {
                userId: userId,
                userIdflo: userId, // từ dsMesstc
              },
            }
          );
          setdstinchatfinalcanhan([response.data, ...dsuserid]);
          console.log(response.data)
        })
      );
    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
    }
  };
    fetchAllChats();
}, [userId]);
//

  const [dstinchatfinal, setdstinchatfinal] = useState([]);
  useEffect(() => {
  const fetchAllChats = async () => {
    try {
      setLoading(true);
      const allMessages = await Promise.all(
        dsMesstc.map(async (user) => {
          // console.log(user.idus)
          const response = await axios.get(
            `http://localhost:8080/api/home/hienchat`,
            {
              params: {
                userId: userId,
                userIdflo: user.idus, // từ dsMesstc
              },
            }
          );
          setdsuserid([response.data, ...dsuserid]);
          console.log(response.data)
        })
      );

    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }



  };
  if (userId && dsMesstc.length > 0) {
    fetchAllChats();
  }
}, [userId, dsMesstc]);



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
  const [valuechat, setvaluechat] = useState({
    iduserd: userId,
  });
  const [chatfollowing, setchatfollowing] = useState({
    writechat: "",
  });
  const [valfind,setvalfind]= useState({
    valuefind: "",
  });
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
  return (
    <div className="messenger-page">
      <Navbar />

      <div className="mes-container">
        {/* Left Panel */}
        <div className="left-panel">
          <ul className="tabs">
            <li className="tab active">
              <b>Hộp thư </b>
              <span className="badge">{dsMesstc.length}</span>
            </li>
          </ul>

          <div className="search-bar">
            <div className="search-input">
              <i className="fas fa-search" />
              <input type="text" placeholder="Tìm kiếm trên Messenger" />
            </div>
          </div>

          <div className="chat-list">
            {/* {[
            {name: "Hiếu Ngô", message: "Hello World", time: "15 phút", unread: 1},
            {name: "Ngu Ngơ :v", message: "Lmao", time: "2 giờ"},
            {name: "Ngu Ngơ part 2", message: "Ối giồi ôi", time: "1 ngày"},
            {name: "Bộ từ siêu dẳng", message: "Check Check Check", time: "1 ngày"},
        ].map((user, index) => (
            <div key={index} className="chat-item">
            <div className="user-avatar">{user.name[0]}</div>
            <div className="chat-info">
                <div className="info-header">
                <h4>{user.name}</h4>
                <span className="time">{user.time}</span>
                </div>
                <p className="last-message">
                {user.message}
                {user.unread && <span className="unread-badge">{user.unread}</span>}
                </p>
            </div>
            </div>
        ))} */}
            {dsMesstc.length > 0 ? (
              dsMesstc.map((post, indexx) => (
                <div key={indexx} className="chat-item"                        
                value={post.idus}
                 onClick={() => {
                          setvaluechat({ iduserd: post.idus });
                          submitsaveid(post.idus),
                            showchatwithfollowing(post.idus)
                        }}
>
                  <div className="user-avatar">
                    <img src={post.imageUrl || defaultAvatarSrc} alt="" />{" "}
                  </div>
                  <div className="chat-info">
                    <div className="info-header">
                      <h4>
                        {" "}
                        {post.lastName} {post.firstName}
                      </h4>
                      <span className="time"></span>
                    </div>
                  {/* {dsuserid.map((chatArray, index) => {
  if (!chatArray || chatArray.length === 0) return null; 
  if (indexx==index){
  return (
    <p key={index} className="last-message">

      {chatArray[index].content}
    </p>
  );
  }
})} */}


                  </div>
                </div>
              ))
            ) : (
              <p>Chưa có bài viết nào.</p>
            )}
          </div>
        </div>

        {/* Middle Panel (chat-detail) */}
        <div className="middle-panel">
          <div className="chat-header">
            <div className="user-info">
              <div className="avatar-large">
                <img
                            src={dschatmess.linkanh}
                            alt=""
                          />{" "}
                </div>
              <div className="title">
                <h2>
                          {dschatmess.lastName} {dschatmess.firstName}
                </h2>
                <p className="subtitle">Được mã hóa đầu cuối</p>
              </div>
            </div>
            {/* <div className="header-icons">
              <i className="fas fa-phone" />
              <i className="fas fa-video" />
              <i className="fas fa-search" />
              <i className="fas fa-ellipsis-h" />
            </div> */}
          </div>

          <div className="chat-history">
        {dstinchatfinalcanhan.map((post) => {
  return (
      <div className="message user">
              <div className="msg-content">
                <p>{post.content}</p>
               <span>
  {new Date(post.createAt).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })}
</span>

              </div>
            </div>
  );
})}

        {dstinchat.map((post, index) => {
            {/* TODO: render history messages */}
            if (post.idUser === valuechat.iduserd) {
                        return (
                          <>

            <div className="message">
              <div className="screenmesscoverusechatfollowingimg">
                                <img
                                  src={
                                    post.linkanh || defaultAvatarSrc
                                  }
                                  alt="User Avatar"
                                />
                              </div>
              <div className="msg-content">
                <p>{post.content}</p>
<span>
  {new Date(post.createAt).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })}
</span>

              </div>
            </div>
            </>
                        );
                      }
            else {
                        return (
                          <>
            <div className="message user">
              <div className="msg-content">
                <p>{post.content}</p>
               <span>
  {new Date(post.createAt).toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })}
</span>

              </div>
            </div>
</>
 );
                      }
                    })}
          </div>

          <div className="chat-input">
            {/* <i className="fas fa-plus" /> */}
            <input type="text" placeholder="Aa" 
                                  value={chatfollowing.writechat}
            onChange={(e) =>
                        setchatfollowing({
                          ...chatfollowing,
                          writechat: e.target.value,
                        })
                      }
            />
            {/* <i className="fas fa-thumbs-up" 
            
            /> */}
            <i className="fa-solid fa-share-from-square"
             onClick={() => {
                        userchatusefollow(valuechat);
                      }}
            />
          </div>
        </div>

        {/* Right Panel (info sidebar) */}
        <div className="right-panel">
          <div className="sidebar-avatar" >
            <img
                            src={dschatmess.linkanh}
                            alt=""
                          />{" "}
            </div>
          <h3>
                                      {dschatmess.lastName} {dschatmess.firstName}

          </h3>
          <p className="sidebar-subtitle">Được mã hóa đầu cuối</p>

          <div className="sidebar-buttons">
            <button
            onClick={quatcn}
            >
              <i className="fas fa-user" /> Trang cá nhân
            </button>
            {/* <button>
              <i className="fas fa-bell-slash" /> Tắt thông báo
            </button>
            <button>
              <i className="fas fa-search" /> Tìm kiếm
            </button> */}
          </div>

          {/* <div className="accordion">
            <div className="acc-item">
              <div className="acc-header">Thông tin về đoạn chat</div>
              <div className="acc-body">{}</div>
            </div>
            <div className="acc-item">
              <div className="acc-header">Tùy chỉnh đoạn chat</div>
              <div className="acc-body">{}</div>
            </div>
            <div className="acc-item">
              <div className="acc-header">File phương tiện & file</div>
              <div className="acc-body">{}</div>
            </div>
            <div className="acc-item">
              <div className="acc-header">Quyền riêng tư và hỗ trợ</div>
              <div className="acc-body">{}</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Messchat;
