import React, { createContext, useContext, useMemo, useState } from "react";

export type Student = {
  id: number;
  name: string;
  grade: string;
};

type StudentsContextValue = {
  students: Student[];
  addStudent: (name: string, grade: string) => void;
  removeStudent: (id: number) => void;
  resetStudents: () => void;
};

const StudentsContext = createContext<StudentsContextValue | undefined>(undefined);

const seed: Student[] = [
  { id: 1, name: "Amina Hassan", grade: "Form 2" },
  { id: 2, name: "Brian Otieno", grade: "Form 1" },
  { id: 3, name: "Cynthia Wanjiru", grade: "Form 4" },
];

export function StudentsProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>(seed);

  const addStudent = (name: string, grade: string) => {
    setStudents((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((s) => s.id)) + 1 : 1;
      return [...prev, { id: nextId, name, grade }];
    });
  };

  const removeStudent = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const resetStudents = () => setStudents(seed);

  const value = useMemo(
    () => ({ students, addStudent, removeStudent, resetStudents }),
    [students]
  );

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
}

export function useStudents() {
  const ctx = useContext(StudentsContext);
  if (!ctx) throw new Error("useStudents must be used inside StudentsProvider");
  return ctx;
}
