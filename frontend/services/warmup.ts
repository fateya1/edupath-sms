// frontend/src/services/warmup.ts
export async function warmUpBackend() {
  const baseUrl = import.meta.env.VITE_API_URL;

  if (!baseUrl) {
    console.warn("VITE_API_URL is missing. Backend warmup skipped.");
    return;
  }

  const url = `${baseUrl.replace(/\/$/, "")}/health`;

  try {
    await fetch(url, { method: "GET" });
  } catch (err) {
    console.warn("Backend warmup failed:", err);
  }
}
