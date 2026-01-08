import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../lib/api";

type User = { email: string; role?: string };

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const raw = localStorage.getItem("auth_user");
    return raw ? (JSON.parse(raw) as User) : null;
  });

  const [token, setToken] = useState<string | null>(() => localStorage.getItem("auth_token"));

  async function login(email: string, password: string) {
    const res = await api.login(email, password);
    setUser(res.user);
    setToken(res.access_token);
    localStorage.setItem("auth_user", JSON.stringify(res.user));
    localStorage.setItem("auth_token", res.access_token);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("auth_token");
  }

  const isAuthenticated = !!token;
const isAdmin = user?.role === "admin";

const value = useMemo(
  () => ({ user, token, isAuthenticated, isAdmin, login, logout }),
  [user, token, isAuthenticated, isAdmin]
);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
