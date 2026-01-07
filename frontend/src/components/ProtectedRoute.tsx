import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type Props = {
  redirectTo?: string;
};

export default function ProtectedRoute({ redirectTo = "/login" }: Props) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  // When used as a wrapper <Route element={<ProtectedRoute/>}> it renders nested routes
  return <Outlet />;
}
