import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const loginApi = async (payload) => {
  try {
    const response = await axios.post(`${API_URL}/login`, payload);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Sai email hoặc mật khẩu");
  }
};
