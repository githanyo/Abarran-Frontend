import axios from "axios";
import api from "./axiosInstance";

const BASE_URL = "http://127.0.0.1:8000/api";
const getToken = () => localStorage.getItem("access_token");

export const registerFarmer = (data) =>
  axios.post(`${BASE_URL}/farmers/register/`, data);

export const fetchFarmers = (page = 1, search = "") =>
  api.get(`/farmers/list/?page=${page}&search=${search}`);

export const fetchFarmerById = (id) =>
  api.get(`/farmers/${id}/`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
export const updateFarmer = (id, data) =>
  api.put(`/farmers/${id}/`, data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
export const deleteFarmer = (id) =>
  api.delete(`/farmers/${id}/manage/`);

  