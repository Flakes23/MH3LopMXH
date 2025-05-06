import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Login.css"
import { SignIn } from "../api/Account";
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()
  const [taikhoan, setTaikhoan] = useState("")
  const [matkhau, setMatkhau] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const success = await SignIn(taikhoan, matkhau)
      console.log(success) // In ra dữ liệu trả về từ server
      if (success) {
        navigate("/home")
      }
    } catch (error) {
      setError("Tài khoản hoặc mật khẩu không đúng.")
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
              Chào mừng
              <br />
              trở lại!
            </h1>
            <p>Đăng nhập để tiếp tục trải nghiệm dịch vụ của chúng tôi</p>
          </div>
          <div className="login-image">
          </div>
        </div>
        <div className="login-card-right">
          <div className="login-header">
            <h2>Đăng nhập</h2>
            <p>Vui lòng nhập thông tin đăng nhập của bạn</p>
          </div>

          <form onSubmit={handleLogin}  method="POST" id="formLogin">
            <div className="form-group">
              <label htmlFor="username">Tài khoản</label>
              <div className="input-with-icon">
                <i className="bi bi-person"></i>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Nhập tên đăng nhập hoặc email"
                  value={taikhoan}
                  onChange={(e) => setTaikhoan(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Mật khẩu</label>
              <div className="input-with-icon">
                <i className="bi bi-lock"></i>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Nhập mật khẩu"
                  value={matkhau}
                  onChange={(e) => setMatkhau(e.target.value)}
                />
              </div>
            </div>

            <div className="form-check custom-checkbox">
              <input type="checkbox" className="form-check-input" id="remember" />
              <label className="form-check-label" htmlFor="remember">
                Ghi nhớ đăng nhập
              </label>
            </div>

            <div className="error-container">
              {error && (
                <div className="alert alert-danger" role="alert">
                  <i className="bi bi-exclamation-triangle-fill me-2"></i>
                  {error}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Đang đăng nhập...
                </>
              ) : (
                "Đăng nhập"
              )}
            </button>

            <div className="separator">
              <span>hoặc</span>
            </div>

            <button type="button" className="btn btn-outline-secondary btn-block google-btn">
              <i className="bi bi-google"></i>
              <span>Đăng nhập với Google</span>
            </button>

            <div className="register-link">
              Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

