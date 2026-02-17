import axios from "axios";

const API_URL = "http://localhost:8080/api/products";

export const getAllProductsApi = async () => {
  try {
    const respone = await axios.get(API_URL);
    return respone.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Không thể tải danh sách sản phẩm",
    );
  }
};
