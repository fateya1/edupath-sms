import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useStudents } from "../context/StudentsContext";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logout } = useAuth();
  const { students } = useStudents();

  const [collapsed, setCollapsed] = useState(false);

  const studentCount = useMemo(() => students.length, [students]);

  // Safety: if somehow you reached layout without auth
  if (!user) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Not authenticated</h2>
        <p>
          Please <Link to="/login" state={{ from: location }}>login</Link>.
        </p>
      </div>
    );
  }

  const linkStyle = (active: boolean): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 10,
    textDecoration: "none",
    color: active ? "#0b5" : "#222",
    background: active ? "rgba(0, 180, 90, 0.12)" : "transparent",
    fontWeight: active ? 700 : 500,
  });

  const badgeStyle: React.CSSProperties = {
    marginLeft: "auto",
    fontSize: 12,
    padding: "2px 8px",
    borderRadius: 999,
    background: "#f0f0f0",
    color: "#333",
  };

  const path = location.pathname;

  return (
    <div style={{ display: "grid", gridTemplateColumns: collapsed ? "72px 1fr" : "260px 1fr", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ borderRight: "1px solid #eee", padding: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <button
            onClick={() => setCollapsed((v) => !v)}
            style={{ padding: "8px 10px", borderRadius: 10, border: "1px solid #ddd", cursor: "pointer" }}
          >
            {collapsed ? "»" : "«"}
          </button>
          {!collapsed && <strong>Edupath</strong>}
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link to="/dashboard" style={linkStyle(path === "/dashboard")}>
            {!collapsed ? "Dashboard" : "D"}
          </Link>

          <Link to="/students" style={linkStyle(path.startsWith("/students"))}>
            {!collapsed ? "Students" : "S"}
            {!collapsed && <span style={badgeStyle}>{studentCount}</span>}
          </Link>
        </nav>

        <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #eee" }}>
          {!collapsed && (
            <div style={{ marginBottom: 10, color: "#666", fontSize: 13 }}>
              Logged in as <b>{user.email}</b>
            </div>
          )}

          <button
            onClick={() => {
              logout();
              navigate("/login", { replace: true });
            }}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #ddd",
              cursor: "pointer",
              background: "white",
            }}
          >
            {collapsed ? "⎋" : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main */}
      <main>
        {/* Header */}
        <header style={{ borderBottom: "1px solid #eee", padding: "12px 16px", display: "flex", alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>Protected Area</h3>
        </header>

        <div style={{ padding: 16 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
