"use client"
import  "./Login.css"
import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Register.css"
import { register } from "../api/Account";
import { useNavigate } from "react-router-dom"

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    ho: "",
    ten: "",
    email: "",
    matkhau: "",
    xacnhanmatkhau: "",
  })
  const [error, setError] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")
  
    // Kiểm tra các trường bắt buộc
    if (!formData.ho || !formData.ten || !formData.email || !formData.matkhau || !formData.xacnhanmatkhau) {
      setError("Vui lòng điền đầy đủ thông tin.")
      return
    }
  
    // Kiểm tra định dạng email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!emailRegex.test(formData.email)) {
      setError("Email không hợp lệ.")
      return
    }
  
    // Kiểm tra mật khẩu
    if (formData.matkhau.length <= 8) {
      setError("Mật khẩu phải có ít nhất 8 ký tự.")
      return
    }
  
    // Kiểm tra mật khẩu có chứa chữ hoa, chữ thường, số và ký tự đặc biệt
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/
    if (!passwordRegex.test(formData.matkhau)) {
      setError("Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt.")
      return
    }
  
    // Kiểm tra mật khẩu khớp nhau
    if (formData.matkhau !== formData.xacnhanmatkhau) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.")
      return
    }
  
    setLoading(true)
  
    try {
      // Gửi yêu cầu đăng ký
      const success = await register(formData.ho, formData.ten, formData.matkhau, formData.email)
  
      if (success) {
        setSuccessMessage("Đăng ký thành công! Đang chuyển hướng đến trang đăng nhập...")
        setTimeout(() => {
          navigate("/login")
        }, 2000) // chờ 2 giây trước khi chuyển trang
      } else {
        setError("Đăng ký không thành công. Email có thể đã được sử dụng.")
      }
    } catch (error) {
      setError("Có lỗi trong quá trình đăng ký. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-card-left">
          <div className="login-brand">
            <h2>Nhóm 6</h2>
          </div>
          <div className="login-welcome">
            <h1>
              Tạo tài khoản
              <br />
              mới!
            </h1>
            <p>Đăng ký để trải nghiệm đầy đủ dịch vụ của chúng tôi</p>
          </div>
          <div className="login-image"></div>
        </div>
        <div className="login-card-right">
          <div className="login-header">
            <h2>Đăng ký</h2>
            <p>Vui lòng điền thông tin để tạo tài khoản</p>
          </div>

          <form onSubmit={handleRegister} method="POST" id="formRegister">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="ho">Họ</label>
                  <div className="input-with-icon">
                    <i className="bi bi-person"></i>
                    <input
                      type="text"
                      className="form-control"
                      id="ho"
                      placeholder="Họ"
                      value={formData.ho}
                      onChange={handleChange}

                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="ten">Tên</label>
                  <div className="input-with-icon">
                    <i className="bi bi-person"></i>
                    <input
                      type="text"
                      className="form-control"
                      id="ten"
                      placeholder="Tên"
                      value={formData.ten}
                      onChange={handleChange}

                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <i className="bi bi-envelope"></i>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Nhập địa chỉ email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="matkhau">Mật khẩu</label>
              <div className="input-with-icon">
                <i className="bi bi-lock"></i>
                <input
                  type="password"
                  className="form-control"
                  id="matkhau"
                  placeholder="Nhập mật khẩu"
                  value={formData.matkhau}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="xacnhanmatkhau">Xác nhận mật khẩu</label>
              <div className="input-with-icon">
                <i className="bi bi-lock-fill"></i>
                <input
                  type="password"
                  className="form-control"
                  id="xacnhanmatkhau"
                  placeholder="Nhập lại mật khẩu"
                  value={formData.xacnhanmatkhau}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="error-container">
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}
              {successMessage && (
                <div className="alert alert-success" role="alert">
                  <i className="bi bi-check-circle-fill me-2"></i>
                  {successMessage}
                </div>
              )} 
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Đang đăng ký...
                </>
              ) : (
                "Đăng ký"
              )}
            </button>

            <div className="separator">
              <span>hoặc</span>
            </div>

            <button type="button" className="btn btn-outline-secondary btn-block google-btn">
              <i className="bi bi-google"></i>
              <span>Đăng ký với Google</span>
            </button>

            <div className="register-link">
              Đã có tài khoản? <a href="/login">Đăng nhập</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
