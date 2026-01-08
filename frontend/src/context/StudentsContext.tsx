import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "./AuthContext";

export type Student = { id: number; name: string; grade: string };

type StudentsContextValue = {
  students: Student[];
  loading: boolean;
  refresh: () => Promise<void>;
  addStudent: (name: string, grade: string) => Promise<void>;
  removeStudent: (id: number) => Promise<void>;
  resetStudents: () => Promise<void>;
};

const StudentsContext = createContext<StudentsContextValue | undefined>(undefined);

export function StudentsProvider({ children }: { children: React.ReactNode }) {
  const { token } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  async function refresh() {
    if (!token) {
      setStudents([]);
      return;
    }
    setLoading(true);
    try {
      const data = await api.getStudents(token);
      setStudents(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // load students when token exists
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function addStudent(name: string, grade: string) {
    if (!token) throw new Error("Not authenticated");
    const created = await api.createStudent(token, { name, grade });
    setStudents((prev) => [created, ...prev]);
  }

  async function removeStudent(id: number) {
    if (!token) throw new Error("Not authenticated");
    await api.deleteStudent(token, id);
    setStudents((prev) => prev.filter((s) => s.id !== id));
  }

  async function resetStudents() {
    // If you don’t have backend reset endpoint, we can just refresh:
    await refresh();
  }

  const value = useMemo(
    () => ({ students, loading, refresh, addStudent, removeStudent, resetStudents }),
    [students, loading]
  );

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
}

export function useStudents() {
  const ctx = useContext(StudentsContext);
  if (!ctx) throw new Error("useStudents must be used inside StudentsProvider");
  return ctx;
}
