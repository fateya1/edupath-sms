import { useNavigate } from "react-router-dom";

export default function NotAuthorized() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 520, margin: "60px auto", fontFamily: "system-ui" }}>
      <div
        style={{
          border: "1px solid #e6e6e6",
          borderRadius: 16,
          padding: 18,
          background: "white",
        }}
      >
        <h2 style={{ marginTop: 0 }}>🚫 Not authorized</h2>
        <p style={{ opacity: 0.75 }}>
          You don’t have permission to view that page.
        </p>

        <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
            Go to Dashboard
          </button>

          <button
            onClick={() => navigate("/login")}
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
              fontWeight: 700,
              opacity: 0.85,
            }}
          >
            Switch account
          </button>
        </div>
      </div>
    </div>
  );
}
