import { useMemo, useState } from "react";
import { useStudents } from "../context/StudentsContext";

const grades = ["Form 1", "Form 2", "Form 3", "Form 4"];

export default function Students() {
 const { students, addStudent, removeStudent, loading, refresh } = useStudents();

  const [name, setName] = useState("");
  const [grade, setGrade] = useState(grades[0]);
  const [error, setError] = useState<string | null>(null);

  const total = useMemo(() => students.length, [students]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Student name must be at least 2 characters.");
      return;
    }

    addStudent(trimmed, grade); // ✅ context method (NO recursion)
    setName("");
    setGrade(grades[0]);
  }

  return (
    <div style={{ maxWidth: 820 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <div>
          <h2 style={{ marginTop: 0, marginBottom: 6 }}>Students</h2>
          <div style={{ opacity: 0.7, fontSize: 14 }}>Total: {total}</div>
        </div>

        <button
          type="button"
          onClick={resetStudents}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid #ddd",
            background: "white",
            cursor: "pointer",
            fontWeight: 800,
          }}
        >
          Reset
        </button>
      </div>

      <section
        style={{
          marginTop: 16,
          border: "1px solid #e6e6e6",
          borderRadius: 14,
          padding: 14,
          background: "white",
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 10 }}>Add new student</h3>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 10 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontWeight: 800 }}>Student name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Faith Njeri"
              style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd", outline: "none" }}
            />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span style={{ fontWeight: 800 }}>Grade</span>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd", background: "white" }}
            >
              {grades.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </label>

          {error && <div style={{ color: "#b00020", fontWeight: 800 }}>{error}</div>}

          <div style={{ display: "flex", gap: 10 }}>
            <button
              type="submit"
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid #ddd",
                background: "white",
                cursor: "pointer",
                fontWeight: 900,
              }}
            >
              Add Student
            </button>

            <button
              type="button"
              onClick={() => {
                setName("");
                setGrade(grades[0]);
                setError(null);
              }}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid #ddd",
                background: "white",
                cursor: "pointer",
                fontWeight: 800,
                opacity: 0.85,
              }}
            >
              Clear
            </button>
          </div>
        </form>
      </section>

      <section style={{ marginTop: 16 }}>
        <h3 style={{ marginTop: 0 }}>Current students</h3>

        <div style={{ display: "grid", gap: 10 }}>
          {students.map((s) => (
            <div
              key={s.id}
              style={{
                border: "1px solid #e6e6e6",
                borderRadius: 14,
                padding: 12,
                background: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontWeight: 900 }}>{s.name}</div>
                <div style={{ fontSize: 13, opacity: 0.7 }}>{s.grade}</div>
              </div>

              <button
                onClick={() => removeStudent(s.id)}
                style={{
                  padding: "8px 10px",
                  borderRadius: 12,
                  border: "1px solid #ddd",
                  background: "white",
                  cursor: "pointer",
                  fontWeight: 900,
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {students.length === 0 && <div style={{ opacity: 0.7 }}>No students yet. Add one above or click Reset.</div>}
        </div>
      </section>
    </div>
  );
}
