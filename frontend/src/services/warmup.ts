import { apiUrl } from "./apiService";

export async function warmUpBackend(timeoutMs = 20000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Hit a cheap endpoint to wake Render
    const res = await fetch(`${apiUrl}/health`, {
      method: "GET",
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(t);
  }
}
