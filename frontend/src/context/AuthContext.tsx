import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Role = "admin" | "teacher";

export type User = {
  name: string;
  email: string;
  role: Role;
};

type AuthContextValue = {
  token: string | null;
  user: User | null;
  isAuthed: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "edupath_auth_v1";

type StoredAuth = {
  token: string;
  user: User;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Load from localStorage on first mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;

      const parsed = JSON.parse(raw) as StoredAuth;
      if (parsed?.token && parsed?.user?.email) {
        setToken(parsed.token);
        setUser(parsed.user);
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage whenever auth changes
  useEffect(() => {
    try {
      if (token && user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, [token, user]);

  async function login(email: string, password: string) {
    // ✅ Frontend-only demo auth
    const e = email.trim().toLowerCase();
    const p = password.trim();

    if (!e || !p) throw new Error("Email and password are required.");

    // Simulate API delay
    await new Promise((r) => setTimeout(r, 500));

    // Demo: admin if email contains "admin"
    const role: Role = e.includes("admin") ? "admin" : "teacher";

    setToken("demo-token-" + Date.now());
    setUser({
      name: role === "admin" ? "Admin User" : "Teacher User",
      email: e,
      role,
    });
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthed: Boolean(token),
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
