const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

type LoginResponse = {
  access_token: string;
  user: { email: string; role?: string };
};

async function http<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `Request failed (${res.status})`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  login(email: string, password: string) {
    return http<LoginResponse>(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
  },

  getStudents(token: string) {
    return http<Array<{ id: number; name: string; grade: string }>>(`${API_URL}/students`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  createStudent(token: string, payload: { name: string; grade: string }) {
    return http<{ id: number; name: string; grade: string }>(`${API_URL}/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
  },

  deleteStudent(token: string, id: number) {
    return http<void>(`${API_URL}/students/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
  }
};
