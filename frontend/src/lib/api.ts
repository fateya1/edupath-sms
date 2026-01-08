const API_URL = import.meta.env.VITE_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function request<T>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: unknown;
    token?: string | null;
  } = {}
): Promise<T> {
  const { method = "GET", body, token } = options;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // handle errors nicely
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      message = data?.message?.toString?.() || message;
    } catch {}
    throw new Error(message);
  }

  // if no content
  if (res.status === 204) return null as T;

  return (await res.json()) as T;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request<{ access_token: string; user: { email: string; role?: string } }>(
      "/auth/login",
      { method: "POST", body: { email, password } }
    ),

  // Students (adjust endpoints to match your backend)
  getStudents: (token: string) =>
    request<Array<{ id: number; name: string; grade: string }>>("/students", {
      token,
    }),

  createStudent: (token: string, payload: { name: string; grade: string }) =>
    request<{ id: number; name: string; grade: string }>("/students", {
      method: "POST",
      token,
      body: payload,
    }),

  deleteStudent: (token: string, id: number) =>
    request<void>(`/students/${id}`, { method: "DELETE", token }),
};
