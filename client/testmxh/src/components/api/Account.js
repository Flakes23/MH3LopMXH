 import axios from "axios";

// Cấu hình axios
export const api = axios.create({
  baseURL: "http://localhost:8080"
});

// Đăng nhập
export async function SignIn(taikhoan, matkhau) {
  try {
    const response = await api.post("/api/auth/login", {
      email: taikhoan, 
      password: matkhau
    });
    console.log(response.data); // In ra dữ liệu trả về từ server
    if (response.status === 200) {
      return true;
    }
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

// Đăng ký
export async function register(lastName, firstName, password, email) {
  try {
    const response = await api.post("/api/auth/register", {
      lastName: lastName,
      firstName: firstName,
      password: password,
      email: email,
    });
    
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error during registration:", error.response ? error.response.data : error);
    return false;
  }
}

