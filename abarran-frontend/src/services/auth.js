import axios from "axios";

const BASE_URL = "https://your-backend.onrender.com/api";

export const getAccessToken = () =>
  localStorage.getItem("access_token");

export const getRefreshToken = () =>
  localStorage.getItem("refresh_token");

export const setTokens = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/admin/login";
};

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/token/refresh/`, {
      refresh: getRefreshToken(),
    });

    setTokens(res.data.access, getRefreshToken());
    return res.data.access;
  } catch {
    logout();
    throw new Error("Session expired");
  }
};
