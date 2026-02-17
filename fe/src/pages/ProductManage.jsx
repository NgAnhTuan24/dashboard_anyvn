import React, { useState } from "react";
import "../styles/ProductManage.css";

export default function ProductManage() {
  const [products] = useState([
    {
      id: 1,
      code: "SP001",
      image: "/test.jpg",
      name: "Sản phẩm A",
      price: 250000000,
      stock: 15,
      description: "Mô tả ngắn cho sản phẩm A",
      status: "ACTIVE",
    },
    {
      id: 2,
      code: "SP002",
      image: "/test.jpg",
      name: "Sản phẩm B",
      price: 500000,
      stock: 0,
      description: "Sản phẩm chất lượng cao",
      status: "OUT_OF_STOCK",
    },
    {
      id: 3,
      code: "SP003",
      image: "/test.jpg",
      name: "Sản phẩm C",
      price: 120000,
      stock: 50,
      description: "Mô tả sản phẩm C",
      status: "INACTIVE",
    },
  ]);

  // Hàm render Badge trạng thái
  const renderStatus = (status) => {
    switch (status) {
      case "ACTIVE":
        return <span className="status-badge active">Đang bán</span>;
      case "OUT_OF_STOCK":
        return <span className="status-badge warning">Hết hàng</span>;
      case "INACTIVE":
        return <span className="status-badge inactive">Ngừng kinh doanh</span>;
      default:
        return null;
    }
  };

  return (
    <div className="product-container">
      <div className="page-header">
        <h1>Quản lý sản phẩm</h1>
        <button className="btn-add">Thêm sản phẩm</button>
      </div>

      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm sản phẩm theo mã, tên..." />
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product}>
                <td>{index + 1}</td>
                <td>{product.code}</td>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ borderRadius: "5px" }}
                  />
                </td>
                <td>{product.name}</td>
                <td style={{ color: "#e74c3c", fontWeight: "bold" }}>
                  {product.price.toLocaleString("vi-VN") + "đ"}
                </td>
                <td>{product.stock}</td>
                <td title={product.description}>
                  {product.description.length > 20
                    ? product.description.substring(0, 20) + "..."
                    : product.description}
                </td>
                <td>{renderStatus(product.status)}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-action unlock">Sửa</button>
                    <button className="btn-action delete">Xóa</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
