import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useBackendWarmup } from "../hooks/useBackendWarmup";

export default function Landing() {
  const navigate = useNavigate();
  const { warmingUp, warmupNow } = useBackendWarmup();

  // Simple brand config (edit any time)
  const brand = useMemo(
    () => ({
      schoolName: "Mumias Muslim Senior School",
      tagline: "School Management System",
      motto: "Knowledge • Discipline • Excellence",
      primary: "#0F766E", // teal
      secondary: "#064E3B", // dark green
      bg: "#F8FAFC",
    }),
    []
  );

  useEffect(() => {
    // Warmup backend silently in the background when user lands here
    // (helps reduce cold-start pain later on login)
    warmupNow();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          maxWidth: 920,
          borderRadius: 18,
          background: "white",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid rgba(15, 118, 110, 0.12)",
        }}
      >
        {/* Top banner */}
        <div
          style={{
            padding: 22,
            color: "white",
            background: `linear-gradient(135deg, ${brand.primary}, ${brand.secondary})`,
          }}
        >
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            {/* Simple “logo” badge (replace with an image later if you want) */}
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 14,
                background: "rgba(255,255,255,0.14)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: 800,
              }}
              aria-label="School logo"
              title="MMSS"
            >
              MM
            </div>

            <div>
              <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>
                {brand.schoolName}
              </div>
              <div style={{ opacity: 0.95, marginTop: 4 }}>{brand.tagline}</div>
            </div>
          </div>

          <div style={{ marginTop: 12, opacity: 0.95 }}>
            <span style={{ fontWeight: 700 }}>Motto:</span> {brand.motto}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: 22 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: 18,
            }}
          >
            {/* Left: description */}
            <div
              style={{
                borderRadius: 16,
                padding: 18,
                background: "rgba(15, 118, 110, 0.06)",
                border: "1px solid rgba(15, 118, 110, 0.12)",
              }}
            >
              <h2 style={{ margin: 0, fontSize: 20 }}>Welcome 👋</h2>
              <p style={{ marginTop: 10, marginBottom: 0, lineHeight: 1.6 }}>
                This system helps the school manage:
                <br />• Students records
                <br />• Admissions
                <br />• Classes & streams
                <br />• Teachers & staff
                <br />• Reports and more
              </p>

              <div
                style={{
                  marginTop: 14,
                  padding: 12,
                  borderRadius: 12,
                  background: "white",
                  border: "1px dashed rgba(15, 118, 110, 0.35)",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 6 }}>
                  Server status
                </div>
                <div style={{ fontSize: 14, opacity: 0.85 }}>
                  {warmingUp ? (
                    <span>
                      Waking up the server… (Render free plan can sleep) ⏳
                    </span>
                  ) : (
                    <span>Ready ✅</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: actions */}
            <div
              style={{
                borderRadius: 16,
                padding: 18,
                border: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18 }}>Get started</h3>

              <button
                onClick={() => navigate("/login")}
                style={{
                  width: "100%",
                  marginTop: 12,
                  padding: 12,
                  border: 0,
                  borderRadius: 12,
                  background: brand.primary,
                  color: "white",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Proceed to Login →
              </button>

              <button
                onClick={() => warmupNow()}
                style={{
                  width: "100%",
                  marginTop: 10,
                  padding: 12,
                  borderRadius: 12,
                  background: "white",
                  border: `1px solid ${brand.primary}`,
                  color: brand.primary,
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Warm up server now
              </button>

              <div style={{ marginTop: 14, fontSize: 13, opacity: 0.8 }}>
                Tip: If login fails the first time, warmup and retry.
              </div>
            </div>
          </div>

          <div style={{ marginTop: 18, fontSize: 12, opacity: 0.7 }}>
            © {new Date().getFullYear()} {brand.schoolName}
          </div>
        </div>
      </div>
    </div>
  );
}
