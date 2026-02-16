import React, { useEffect, useState } from "react";
import { getCustomersApi } from "../services/customerApi";
import "../styles/CustomerManage.css";

export default function CustomerManage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const data = await getCustomersApi();
      setCustomers(data);
    } catch (err) {
      alert(err.message);
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
            {customers.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.fullName}</td>
                <td>{item.email}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.address}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-action view">
                      Xem chi tiết
                    </button>
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