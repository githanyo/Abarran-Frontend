import { Navigate } from "react-router-dom";
import { getAccessToken } from "../services/auth";

function ProtectedRoute({ children }) {
  const token = getAccessToken();
  return token ? children : <Navigate to="/admin/login" replace />;
}

export default ProtectedRoute;
