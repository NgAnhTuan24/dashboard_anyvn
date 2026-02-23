import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/authApi";
import "../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginApi(form);

      localStorage.setItem("user", JSON.stringify(data));

      if (data.role === "ADMIN") {
        navigate("/staffs");
      } else {
        navigate("/products");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-banner">
          <div className="banner-content">
            <h1>Chào mừng trở lại!</h1>
            <p>Đăng nhập để quản lý hệ thống của bạn một cách hiệu quả nhất.</p>
          </div>
        </div>

        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Đăng nhập</h2>
            <p className="subtitle">Vui lòng nhập thông tin tài khoản</p>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Đăng nhập ngay
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
