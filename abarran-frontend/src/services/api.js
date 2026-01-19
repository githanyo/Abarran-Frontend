import axios from "axios";
import api from "./axioInstance";

const BASE_URL = "http://127.0.0.1:8000/api";
const getToken = () => localStorage.getItem("access_token");

export const registerFarmer = (data) =>
  axios.post(`${BASE_URL}/farmers/register/`, data);

export const fetchFarmers = () =>
  api.get(`/farmers/list/`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const fetchFarmerById = (id) =>
  api.get(`/farmers/${id}/`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
export const updateFarmer = (id, data) =>
  api.put(`/farmers/${id}/`, data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  