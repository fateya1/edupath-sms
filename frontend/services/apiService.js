// frontend/src/services/apiService.js
const rawApiUrl = import.meta.env.VITE_API_URL;

// Make it safe: remove trailing slash if present
export const apiUrl = (rawApiUrl || "").replace(/\/$/, "");

if (!apiUrl) {
  console.warn("VITE_API_URL is missing. Set it in Vercel Environment Variables.");
}

export const login = async (email, password) => {
  const res = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  // If backend returns useful error text, show it
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || "Login failed");
  }

  return res.json();
};
