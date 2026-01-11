export const apiUrl = import.meta.env.VITE_API_URL;

export async function login(email, password) {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(text || "Login failed");
  }

  return response.json();
}
