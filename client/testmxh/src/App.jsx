import { useState } from "react";
import reactLogo from "./assets/react.svg";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import Trangchu from "./components/Home/Trangchu";
import Mess from "./components/MessChat/Messchat";
import Caidat from "./components/Home/AccountSettings";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Trangcanhan from "./components/TrangCaNhan/Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Trang đăng nhập */}
        <Route path="/register" element={<Register />} /> {/* Trang đăng kí */}
        <Route path="/home" element={<Trangchu />} />{" "}
        {/* Trang sau khi đăng nhập */}
        <Route path="/trangcanhan" element={<Trangcanhan />} /> Thêm route mới
        <Route path="/mess" element={<Mess />} /> Thêm route mới
        <Route path="/privacy" element={<Caidat />} /> Thêm route mới
      </Routes>
    </Router>
  );
}

export default App;
