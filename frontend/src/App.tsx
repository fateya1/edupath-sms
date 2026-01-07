import { StudentsProvider } from "./context/StudentsContext";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./layouts/ProtectedLayout";
import AdminUsers from "./Pages/AdminUsers";
import AdminRoute from "./components/AdminRoute";
import NotAuthorized from "./Pages/NotAuthorized";
export default function App() {
  return (
    <div style={{ fontFamily: "system-ui" }}>
      {/* Public simple top bar (only for login/home links) */}
      <div style={{ padding: 16, borderBottom: "1px solid #eee" }}>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected wrapper */}
        <Route element={<ProtectedRoute />}>
          {/* ✅ Shared protected UI */}
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add more protected pages here */}
            {/* <Route path="/students" element={<Students />} /> */}
          </Route>
        </Route>

        <Route path="*" element={<div style={{ padding: 16 }}>404 - Not Found</div>} />
      </Routes>
    </div>
  );
}
