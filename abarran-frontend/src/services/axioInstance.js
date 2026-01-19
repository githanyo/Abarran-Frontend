import axios from "axios";
import {
  getAccessToken,
  refreshAccessToken,
} from "./auth";

const api = axios.create({
  baseURL: "https://abarran-backend-3.onrender.com/api/",
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const newToken = await refreshAccessToken();
      originalRequest.headers.Authorization =
        `Bearer ${newToken}`;

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
