import axios from "axios";

const API_URL = "http://localhost:8080/api/staffs";

export const getAllStaffApi = async (page, size, keyword) => {
  const response = await axios.get(API_URL, {
    params: {
      page: page,
      size: size,
      keyword: keyword || "",
    },
  });

  return response.data;
};

export const createStaffApi = async (payload) => {
  try {
    const response = await axios.post(API_URL, payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Tạo nhân viên thất bại");
  }
};

export const lockStaffApi = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/lock`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Khóa nhân viên thất bại");
  }
};

export const unlockStaffApi = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/unlock`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Mở khóa nhân viên thất bại",
    );
  }
};

export const deleteStaffApi = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    throw new Error(error.response?.data?.message || "Xóa nhân viên thất bại");
  }
};
