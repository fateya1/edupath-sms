// frontend/src/services/apiService.js
export const apiUrl = import.meta.env.VITE_API_URL;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchWithTimeout(url, options = {}, timeoutMs = 20000) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    return res;
  } finally {
    clearTimeout(t);
  }
}

export async function login(email, password, opts = {}) {
  const {
    retries = 3,
    delayMs = 2500,
    timeoutMs = 20000,
  } = opts;

  let lastErr;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetchWithTimeout(
        `${apiUrl}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
        timeoutMs
      );

      if (!response.ok) {
        // try parse backend message
        let msg = "Login failed";
        try {
          const data = await response.json();
          msg = data?.message || msg;
        } catch {
          // ignore
        }
        throw new Error(msg);
      }

      return await response.json();
    } catch (err) {
      lastErr = err;

      // AbortError or network error often means server sleeping
      const message =
        err?.name === "AbortError"
          ? "Server took too long to respond."
          : err instanceof Error
          ? err.message
          : "Network error.";

      // If we still have retries left, wait and retry
      if (attempt < retries) {
        await sleep(delayMs);
        continue;
      }

      throw new Error(message);
    }
  }

  throw lastErr || new Error("Login failed.");
}
