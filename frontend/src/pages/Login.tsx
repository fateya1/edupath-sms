import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useBackendWarmup } from "../hooks/useBackendWarmup";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const { warmingUp, warmupNow } = useBackendWarmup(); // make sure your hook exports warmupNow

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // warm up backend as soon as user opens login page
  useEffect(() => {
    warmupNow?.();
  }, [warmupNow]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      await login(email.trim(), password);
      navigate("/dashboard", { replace: true });
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2>Login</h2>

      {warmingUp && (
        <div
          style={{
            background: "#fff4d6",
            padding: 10,
            borderRadius: 8,
            marginBottom: 12,
            border: "1px solid #ffd27a",
          }}
        >
          Waking up server… please wait a moment.
        </div>
      )}

      {error && (
        <div
          style={{
            background: "#ffe6e6",
            padding: 10,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 10 }}
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 10 }}
          />
        </div>

        <button
          type="submit"
          disabled={loading || warmingUp}
          style={{ width: "100%", padding: 10 }}
        >
          {warmingUp ? "Waking up server..." : loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}
