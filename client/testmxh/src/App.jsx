import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// 👇 Lazy load các component
const Register = lazy(() => import("./components/Authentication/Register"));
const Login = lazy(() => import("./components/Authentication/Login"));
const Trangchu = lazy(() => import("./components/Home/Trangchu"));
const Mess = lazy(() => import("./components/MessChat/Messchat"));
const Caidat = lazy(() => import("./components/Home/AccountSettings"));
const Friend = lazy(() => import("./components/Friend/Friend"));
const Trangcanhan = lazy(() => import("./components/TrangCaNhan/Profile"));

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Suspense fallback={<div>Đang tải...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Trangchu />} />
          <Route path="/trangcanhan/:userId?" element={<Trangcanhan />} />
          <Route path="/mess" element={<Mess />} />
          <Route path="/privacy" element={<Caidat />} />
          <Route path="/friend" element={<Friend />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
