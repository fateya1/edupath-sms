import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err?.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
        <div style={{ display: "grid", gap: 10 }}>
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", padding: 8 }}
              placeholder="admin@demo.com"
            />
          </label>

          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: 8 }}
              placeholder="admin"
              type="password"
            />
          </label>

          {error && <div style={{ color: "crimson" }}>{error}</div>}

          <button type="submit" disabled={loading} style={{ padding: 10 }}>
            {loading ? "Signing in..." : "Login"}
          </button>
        </div>
      </form>

      <p style={{ marginTop: 12, opacity: 0.7 }}>
        Demo: <b>admin@demo.com</b> / <b>admin</b>
      </p>
    </div>
  );
}
