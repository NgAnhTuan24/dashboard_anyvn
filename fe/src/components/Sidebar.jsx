import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menu = [
    { name: "Trang tổng quan", path: "/" },
    { name: "Quản lý nhân viên", path: "/staffs" },
    { name: "Quản lý khách hàng", path: "/customers" },
    { name: "Quản lý sản phẩm", path: "/products" },
    { name: "Quản lý đơn hàng", path: "/orders" },
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">Admin Page</h2>

      <ul>
        {menu.map((item) => (
          <li
            key={item.path}
            className={location.pathname === item.path ? "active" : ""}
          >
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>

      {/* <div className="sidebar-footer">
        <Link to="/login" className="login-btn">
          Đăng nhập
        </Link>
      </div> */}
    </div>
  );
}
