"use client"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import "./Friend.css"
import Navbar from "../impl/Navbar"
import axios from "axios"
import defaultAvatar from "../../assets/Images/default-avatar.jpg"

function Friend() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([])
  const [suggested, setSuggested] = useState([])
  const userId = localStorage.getItem("idUser")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resRequests, resSuggested] = await Promise.all([
          axios.get(`http://localhost:8080/api/friends/requests/${userId}`),
          axios.get(`http://localhost:8080/api/friends/suggested/${userId}`)
        ])
        setRequests(resRequests.data)
        setSuggested(resSuggested.data)
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu bạn bè:", error)
      }
    }

    if (userId) fetchData()
  }, [userId])

  const acceptRequest = async (fromUserId) => {
    try {
      await axios.post(`http://localhost:8080/api/friends/accept`, null, {
        params: { fromUserId, toUserId: userId },
      })
      setRequests((prev) => prev.filter((u) => u.idUser !== fromUserId))
    } catch (error) {
      console.error("Lỗi khi chấp nhận lời mời:", error)
    }
  }

  const deleteRequest = async (fromUserId) => {
    try {
      await axios.delete(`http://localhost:8080/api/friends/delete`, {
        params: { fromUserId, toUserId: userId },
      })
      setRequests((prev) => prev.filter((u) => u.idUser !== fromUserId))
    } catch (error) {
      console.error("Lỗi khi xóa lời mời:", error)
    }
  }

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

  const cancelRequest = async (toUserId) => {
    try {
      await axios.delete(`http://localhost:8080/api/friends/delete`, {
        params: { fromUserId: userId, toUserId },
      })
      setSuggested((prev) =>
        prev.map((user) =>
          user.idUser === toUserId ? { ...user, requested: false } : user
        )
      )
    } catch (error) {
      console.error("Lỗi khi hủy lời mời:", error)
    }
  }
  const handleClickHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <Navbar />

      <div className="container-fluid">
        <div className="left-panel">
          <ul>
            <li><span>Bạn bè</span></li>
            <li onClick={() => handleClickHome()}>
              <div className="icon-circle1"><i className="fa fa-user"></i></div>
              <span>Trang chủ</span>
            </li>
          </ul>
        </div>

        <div className="right-panel">

          {/* Lời mời kết bạn */}
          <div className="section">
            <div className="section-header">
              <h3>Lời mời kết bạn</h3>
              <button className="see-all">Xem tất cả</button>
            </div>

            <div className="user-cards">
              {requests.length === 0 && <p>Không có lời mời kết bạn mới</p>}
              {requests.map((user) => (
                <div className="user-card" key={user.idUser}>
                  <div className="user-image">
                    <img
                      src={user.avatarUrl && user.avatarUrl !== "null" ? user.avatarUrl : defaultAvatar}
                      alt="avatar"
                    />
                  </div>
                  <div className="user-info">
                    <h4>{user.fullName}</h4>
                    <p>Chưa rõ số bạn chung</p>
                    <div className="user-actions">
                      <button className="delete-btn" onClick={() => deleteRequest(user.idUser)}>Xóa</button>
                      <button className="accept-btn" onClick={() => acceptRequest(user.idUser)}>Chấp nhận</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="see-more">Xem thêm</button>
          </div>

          {/* Gợi ý bạn bè */}
          <div className="section">
            <div className="section-header">
              <h3>Những người bạn có thể biết</h3>
              <button className="see-all">Xem tất cả</button>
            </div>

            <div className="user-cards">
              {suggested.length === 0 && <p>Không có gợi ý bạn bè</p>}
              {suggested.map((user) => (
                <div className="user-card" key={user.idUser}>
                  <div className="user-image">
                    <img
                      src={user.avatarUrl && user.avatarUrl !== "null" ? user.avatarUrl : defaultAvatar}
                      alt="avatar"
                    />
                  </div>
                  <div className="user-info">
                    <h4>{user.fullName || user.username}</h4>
                    <p>Chưa rõ số bạn chung</p>
                    <button
                      className={user.requested ? "cancel-btn" : "add-btn"}
                      onClick={() =>
                        user.requested
                          ? cancelRequest(user.idUser)
                          : sendRequest(user.idUser)
                      }
                    >
                      {user.requested ? "Hủy lời mời" : "Thêm bạn bè"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button className="see-more">Xem thêm</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Friend
