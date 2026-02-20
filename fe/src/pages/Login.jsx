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

      alert("Đăng nhập thành công");

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
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}
