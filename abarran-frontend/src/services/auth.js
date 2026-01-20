import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAccessToken = () =>
  localStorage.getItem("access_token");

export const getRefreshToken = () =>
  localStorage.getItem("refresh_token");

export const setTokens = (access, refresh) => {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/admin/login";
};

export const refreshAccessToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) {
    logout();
    throw new Error("No refresh token");
  }

  try {
    const res = await axios.post(`${BASE_URL}/token/refresh/`, {
      refresh,
    });

    setTokens(res.data.access, refresh);
    return res.data.access;
  } catch {
    logout();
    throw new Error("Session expired");
  }
};
