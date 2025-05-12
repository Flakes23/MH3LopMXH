"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
  userInfo: any
  onProfileUpdate: (updatedInfo: any) => void
}

const EditProfileModal = ({ isOpen, onClose, userInfo, onProfileUpdate }: EditProfileModalProps) => {
  const [formData, setFormData] = useState({
    bio: "",
    gender: "",
    location: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (userInfo) {
      setFormData({
        bio: findAboutInfoValue("Bio") || "",
        gender: findAboutInfoValue("Giới tính") || "",
        location: findAboutInfoValue("Sống tại") || "",
      })
    }
  }, [userInfo])

  const findAboutInfoValue = (type: string) => {
    if (!userInfo) return ""
    const info = userInfo.aboutInfo.find((item: any) => item.type === type)
    return info ? info.value : ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const idUser = localStorage.getItem("idUser")
      if (!idUser) {
        setError("Bạn cần đăng nhập để thực hiện thao tác này")
        setLoading(false)
        return
      }

      await axios.put(
        `http://localhost:8080/api/profile/update`,
        {
          userId: idUser,
          bio: formData.bio,
          gender: formData.gender,
          location: formData.location,
        },
      )

      onProfileUpdate({
        ...userInfo,
        aboutInfo: [
          ...(userInfo.aboutInfo || []).filter(
            (info: any) => !["Giới tính", "Sống tại", "Bio"].includes(info.type)
          ),
          { type: "Bio", value: formData.bio },
          { type: "Giới tính", value: formData.gender },
          { type: "Sống tại", value: formData.location },
        ],
      })
      onClose()
    } catch (err) {
      console.error("Lỗi khi cập nhật thông tin:", err)
      setError("Không thể cập nhật thông tin. Vui lòng thử lại sau.")
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-label">Chỉnh sửa thông tin cá nhân</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="bio" className="form-label">Tiểu sử</label>
                <textarea
                  id="bio"
                  name="bio"
                  className="form-control"
                  rows={3}
                  placeholder="Viết gì đó về bản thân..."
                  value={formData.bio}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="gender" className="form-label">Giới tính</label>
                <select
                  id="gender"
                  name="gender"
                  className="form-select"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">Sống tại</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-control"
                  placeholder="Nhập nơi bạn đang sống"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
                Hủy
              </button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Đang lưu..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditProfileModal
