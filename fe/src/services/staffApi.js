import axiosClient from "./axiosClient";

const API_URL = "/api/staffs";

export const getAllStaffApi = async (page, size, keyword) => {
  const response = await axiosClient.get(API_URL, {
    params: {
      page,
      size,
      keyword: keyword || "",
    },
  });

  return response.data;
};

export const createStaffApi = async (payload) => {
  const response = await axiosClient.post(API_URL, payload);
  return response.data;
};

export const lockStaffApi = async (id) => {
  const response = await axiosClient.put(`${API_URL}/${id}/lock`);
  return response.data;
};

export const unlockStaffApi = async (id) => {
  const response = await axiosClient.put(`${API_URL}/${id}/unlock`);
  return response.data;
};

export const deleteStaffApi = async (id) => {
  await axiosClient.delete(`${API_URL}/${id}`);
};
