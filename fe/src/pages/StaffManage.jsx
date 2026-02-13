import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { getAllStaffApi, deleteStaffApi } from "../services/staffApi";
import "../styles/StaffManage.css";

export default function StaffManage() {
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    fetchStaffs();
  }, []);

  const fetchStaffs = async () => {
    try {
      const data = await getAllStaffApi();
      setStaffData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      reverseButtons: true
    });

    if (!result.isConfirmed) return;

    try {
      await deleteStaffApi(id);
      fetchStaffs();

      Swal.fire({
        icon: "success",
        title: "Đã xóa!",
        text: "Đã được xóa thành công.",
        timer: 1500,
        showConfirmButton: false
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: error.message
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <div className="staff-container">
      {/* Header: Tiêu đề và nút Thêm */}
      <div className="page-header">
        <h1>Quản lý nhân viên</h1>
        <button className="btn-add">Thêm nhân viên</button>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Tìm kiếm theo tên, email..." 
        />
      </div>

      {/* Bảng dữ liệu */}
      <div className="table-responsive">
        <table className="staff-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Họ và tên</th>
              <th>Email</th>
              <th>Trạng thái</th>
              <th>Ngày tạo</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff, index) => (
              <tr key={staff.id}>
                <td>{index + 1}</td>
                <td>{staff.fullName}</td>
                <td>{staff.email}</td>
                <td>
                  <span className={`status-badge ${staff.status === "ACTIVE" ? "active" : "inactive"}`}>
                    {staff.status === "ACTIVE" ? "Hoạt động" : "Đã khóa"}
                  </span>
                </td>
                <td>{formatDate(staff.createdAt)}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-action lock">
                      Khóa
                    </button>
                    <button className="btn-action delete" onClick={() => handleDelete(staff.id)}>
                      Xóa
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