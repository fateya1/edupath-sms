import { useNavigate } from "react-router-dom";
import { useBackendWarmup } from "../hooks/useBackendWarmup";

export default function Landing() {
  const navigate = useNavigate();
  const { warmingUp } = useBackendWarmup();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#f6f7fb",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 820,
          background: "#fff",
          borderRadius: 16,
          padding: 28,
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          border: "1px solid #eee",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 14,
              background: "#0f766e",
              display: "grid",
              placeItems: "center",
              color: "white",
              fontWeight: 800,
              fontSize: 18,
            }}
            aria-hidden
          >
            MMSS
          </div>

          <div>
            <h1 style={{ margin: 0, fontSize: 28, color: "#0f172a" }}>
              Mumias Muslim Senior School
            </h1>
            <p style={{ margin: "6px 0 0", color: "#475569" }}>
              School Management System — manage students, records, and daily
              operations in one place.
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: 22,
            padding: 16,
            borderRadius: 12,
            background: "#f1f5f9",
            color: "#0f172a",
            lineHeight: 1.5,
          }}
        >
          <strong>Welcome!</strong> Please sign in to access your dashboard and
          manage school information securely.
        </div>

        {warmingUp && (
          <div
            style={{
              marginTop: 14,
              padding: 12,
              borderRadius: 12,
              background: "#fff7ed",
              border: "1px solid #fed7aa",
              color: "#9a3412",
              fontWeight: 600,
            }}
          >
            Waking up the server… (first load may take a moment)
          </div>
        )}

        <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "none",
              background: "#0f766e",
              color: "white",
              fontWeight: 700,
              cursor: "pointer",
              minWidth: 140,
            }}
          >
            Go to Login
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "1px solid #cbd5e1",
              background: "white",
              color: "#0f172a",
              fontWeight: 700,
              cursor: "pointer",
              minWidth: 160,
            }}
          >
            Continue (if logged in)
          </button>
        </div>

        <div style={{ marginTop: 22, color: "#64748b", fontSize: 13 }}>
          © {new Date().getFullYear()} Mumias Muslim Senior School — All rights reserved.
        </div>
      </div>
    </div>
  );
}
