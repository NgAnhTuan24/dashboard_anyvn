import axiosClient from "./axiosClient";
import axios from "axios"; // giữ lại cho Cloudinary

const API_URL = "/api/products";

export const getAllProductsApi = async (page, size, keyword) => {
  try {
    const response = await axiosClient.get(API_URL, {
      params: {
        page,
        size,
        keyword: keyword || "",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Không thể tải danh sách sản phẩm",
    );
  }
};

export const createProductApi = async (payload) => {
  try {
    const response = await axiosClient.post(API_URL, payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Thêm sản phẩm thất bại");
  }
};

export const updateProductApi = async (id, payload) => {
  try {
    const response = await axiosClient.put(`${API_URL}/${id}`, payload);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Sửa thất bại");
  }
};

export const deleteProductApi = async (id) => {
  try {
    const response = await axiosClient.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Xóa sản phẩm thất bại");
  }
};

export const uploadImageToCloudinary = async (file) => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "dashboardAny");
  formData.append("folder", "anysheet");

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dr7qomlvx/image/upload`,
      formData,
    );
    return res.data.secure_url; // URL ảnh trả về
  } catch (err) {
    console.error("Upload Cloudinary lỗi:", err);
    throw err;
  }
};
