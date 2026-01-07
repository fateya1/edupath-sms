import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function AdminRoute() {
  const { user } = useAuth();
  const { showToast } = useToast();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== "admin") {
    showToast("You are not authorized to access that page.", "error");
    return <Navigate to="/not-authorized" replace />;
  }

  return <Outlet />;
}
