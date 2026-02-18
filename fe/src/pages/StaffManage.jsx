import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getAllStaffApi,
  createStaffApi,
  lockStaffApi,
  unlockStaffApi,
  deleteStaffApi,
} from "../services/staffApi";
import "../styles/StaffManage.css";

export default function StaffManage() {
  const [staffData, setStaffData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

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

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      await createStaffApi(formData);

      Swal.fire({
        icon: "success",
        title: "Thành công!",
        text: "Đã thêm nhân viên.",
        timer: 1500,
        showConfirmButton: false,
      });

      setIsOpenModal(false);
      setFormData({ fullName: "", email: "", password: "" });
      fetchStaffs();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: error.message,
      });
    }
  };

  const handleToggleStatus = async (staff) => {
    const isLocking = staff.status === "ACTIVE";

    const result = await Swal.fire({
      title: isLocking ? "Xác nhận khóa?" : "Xác nhận mở khóa?",
      text: isLocking
        ? `Tài khoản ${staff.fullName} sẽ không thể truy cập hệ thống.`
        : `Tài khoản ${staff.fullName} sẽ được khôi phục quyền truy cập.`,
      icon: isLocking ? "warning" : "question",
      showCancelButton: true,
      confirmButtonColor: isLocking ? "#f39c12" : "#3498db", // Màu cam cho Khóa, màu xanh cho Mở khóa
      cancelButtonColor: "#7f8c8d",
      confirmButtonText: isLocking ? "Có, khóa tài khoản" : "Có, mở tài khóa",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      if (isLocking) {
        await lockStaffApi(staff.id);
      } else {
        await unlockStaffApi(staff.id);
      }

      fetchStaffs();

      Swal.fire({
        icon: "success",
        title: isLocking ? "Đã khóa!" : "Đã mở khóa!",
        text: `Tài khoản nhân viên đã được cập nhật.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: error.message,
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#7f8c8d",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      reverseButtons: true,
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
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: error.message,
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
        <button className="btn-add" onClick={() => setIsOpenModal(true)}>
          Thêm mới
        </button>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm nhân viên theo tên, email..."
        />
      </div>

      {/* Bảng dữ liệu */}
      <div className="table-responsive">
        <table className="admin-table">
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
                  <span
                    className={`status-badge ${staff.status === "ACTIVE" ? "active" : "inactive"}`}
                  >
                    {staff.status === "ACTIVE" ? "Hoạt động" : "Đã khóa"}
                  </span>
                </td>
                <td>{formatDate(staff.createdAt)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className={`btn-action ${staff.status === "ACTIVE" ? "lock" : "unlock"}`}
                      onClick={() => handleToggleStatus(staff)}
                    >
                      {staff.status === "ACTIVE" ? "Khóa" : "Mở"}
                    </button>
                    <button
                      className="btn-action delete"
                      onClick={() => handleDelete(staff.id)}
                    >
                      Xóa
                    </button>
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

      {isOpenModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Thêm nhân viên</h2>

            <form onSubmit={handleCreate}>
              <input
                type="text"
                placeholder="Họ và tên"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />

              <input
                type="password"
                placeholder="Mật khẩu"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />

              <div className="modal-actions">
                <button type="button" onClick={() => setIsOpenModal(false)}>
                  Hủy
                </button>
                <button type="submit">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
