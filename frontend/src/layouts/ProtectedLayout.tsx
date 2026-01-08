import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedLayout() {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
}
