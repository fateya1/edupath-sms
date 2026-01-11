export const apiUrl = import.meta.env.VITE_API_URL;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Ping backend to wake it up (Render free plan can sleep).
 * Make sure your backend has GET /health or use / (root).
 */
export async function warmUpBackend(retries = 8, delayMs = 2500) {
  const url = `${apiUrl}/health`;

  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, { method: "GET" });
      if (res.ok) return true;
    } catch {
      // ignore
    }
    await sleep(delayMs);
  }

  return false;
}
