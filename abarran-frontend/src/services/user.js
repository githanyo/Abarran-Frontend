import { jwtDecode } from "jwt-decode";
import { getAccessToken } from "./auth";

export const getUserRole = () => {
  const token = getAccessToken();
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded.is_staff ? "admin" : "user";
};
export const isAdmin = () => {
  return getUserRole() === "admin";
}   