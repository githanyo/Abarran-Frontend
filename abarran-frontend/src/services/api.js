import api from "./axiosInstance";

/**
 * PUBLIC ENDPOINT
 * (no auth required)
 */
export const registerFarmer = (data) =>
  api.post("/farmers/register/", data);

/**
 * ADMIN – LIST FARMERS (pagination + search)
 */
export const fetchFarmers = (page = 1, search = "") =>
  api.get(`/farmers/list/?page=${page}&search=${search}`);

/**
 * ADMIN – GET FARMER DETAILS
 */
export const fetchFarmerById = (id) =>
  api.get(`/farmers/${id}/`);

/**
 * ADMIN – UPDATE FARMER
 */
export const updateFarmer = (id, data) =>
  api.put(`/farmers/${id}/`, data);

/**
 * ADMIN – DELETE FARMER
 */
export const deleteFarmer = (id) =>
  api.delete(`/farmers/${id}/manage/`);
