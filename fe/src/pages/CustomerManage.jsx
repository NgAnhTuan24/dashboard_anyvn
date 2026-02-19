import React, { useEffect, useState } from "react";
import { getAllCustomersApi } from "../services/customerApi";
import "../styles/CustomerManage.css";

export default function CustomerManage() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getAllCustomersApi();
      setCustomers(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="customer-container">
      <div className="page-header">
        <h1>Quản lý khách hàng</h1>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm khách hàng theo tên, email, sđt..."
        />
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Số điện thoại</th>
              <th>Địa chỉ</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <td>{index + 1}</td>
                <td>{customer.fullName}</td>
                <td>{customer.email}</td>
                <td>{customer.phoneNumber}</td>
                <td>{customer.address}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-action view">Xem chi tiết</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="page-nav"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            ‹ Trước
          </button>

          <div className="page-info">
            Trang <strong>{currentPage + 1}</strong> / {totalPages}
          </div>

          <button
            className="page-nav"
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages - 1 ? prev + 1 : prev,
              )
            }
            disabled={currentPage >= totalPages - 1}
          >
            Sau ›
          </button>
        </div>
      </div>
    </div>
  );
}
