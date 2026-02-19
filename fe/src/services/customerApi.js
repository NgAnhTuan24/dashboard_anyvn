import axios from "axios";

const API_URL = "http://localhost:8080/api/customers";

export const getAllCustomersApi = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Không thể tải danh sách khách hàng",
    );
  }
};
