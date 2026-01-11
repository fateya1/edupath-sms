import { apiUrl } from "./apiService";

export async function warmUpBackend(retries = 8, delayMs = 2500) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(`${apiUrl}/health`, { method: "GET" });
      if (res.ok) return true;
    } catch (e) {}
    await new Promise((r) => setTimeout(r, delayMs));
  }
  return false;
}
