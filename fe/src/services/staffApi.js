import axios from "axios";

const API_URL = "http://localhost:8080/api/staffs"

export const getAllStaffApi = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Không thể tải danh sách nhân viên"
    );
  }
};

export const deleteStaffApi = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
      "Xóa nhân viên thất bại"
    );
  }
};