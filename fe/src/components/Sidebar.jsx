import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Không đọc được localStorage", err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  const menu = [
    { name: "Tổng quan", path: "/" },
    { name: "Quản lý nhân viên", path: "/staffs" },
    { name: "Quản lý sản phẩm", path: "/products" },
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">Admin Page</h2>

      <ul className="menu-list">
        {menu.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        {!user ? (
          <Link to="/login" className="btn-auth login-style">
            Đăng nhập
          </Link>
        ) : (
          <button onClick={handleLogout} className="btn-auth logout-style">
            Đăng xuất
          </button>
        )}
      </div>
    </div>
  );
}
