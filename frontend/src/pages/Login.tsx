import { FormEvent, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBackendWarmup } from "../hooks/useBackendWarmup";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { warmingUp, warmupNow } = useBackendWarmup();

  const brand = useMemo(
    () => ({
      schoolName: "Mumias Muslim Senior School",
      primary: "#0F766E",
      bg: "#F8FAFC",
    }),
    []
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      // If backend is sleeping, warmup first (fast path if already awake)
      await warmupNow();

      // Now attempt login
      await login(email.trim(), password);
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  const busy = loading || warmingUp;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: brand.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          background: "white",
          borderRadius: 16,
          padding: 18,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontSize: 18, fontWeight: 800 }}>
            {brand.schoolName}
          </div>
          <div style={{ fontSize: 13, opacity: 0.75 }}>
            Sign in to continue
          </div>
          <div style={{ marginTop: 8, fontSize: 13 }}>
            <Link to="/" style={{ color: brand.primary, fontWeight: 700 }}>
              ← Back to Welcome page
            </Link>
          </div>
        </div>

        {(warmingUp || busy) && (
          <div
            style={{
              background: "rgba(15, 118, 110, 0.07)",
              padding: 10,
              borderRadius: 12,
              border: "1px dashed rgba(15, 118, 110, 0.35)",
              marginBottom: 12,
              fontSize: 13,
            }}
          >
            {warmingUp
              ? "Waking up server… please wait ⏳"
              : "Working… please wait"}
          </div>
        )}

        {error && (
          <div
            style={{
              background: "#ffe6e6",
              padding: 10,
              borderRadius: 12,
              marginBottom: 12,
              fontSize: 13,
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 6 }}>
              Login issue
            </div>
            <div>{error}</div>

            <button
              type="button"
              onClick={warmupNow}
              style={{
                marginTop: 10,
                padding: 10,
                width: "100%",
                borderRadius: 12,
                border: `1px solid ${brand.primary}`,
                background: "white",
                color: brand.primary,
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Wake server and retry
            </button>
          </div>
        )}

        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 700 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.18)",
                marginTop: 6,
              }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 700 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: 10,
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.18)",
                marginTop: 6,
              }}
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 12,
              border: 0,
              background: busy ? "rgba(15, 118, 110, 0.6)" : brand.primary,
              color: "white",
              fontWeight: 900,
              cursor: busy ? "not-allowed" : "pointer",
            }}
          >
            {busy ? "Please wait…" : "Sign in"}
          </button>
        </form>

        <div style={{ marginTop: 12, fontSize: 12, opacity: 0.7 }}>
          Tip: Render free backend may sleep. This page wakes it up automatically.
        </div>
      </div>
    </div>
  );
}
