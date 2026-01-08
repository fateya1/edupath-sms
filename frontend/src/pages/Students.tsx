import { useMemo, useState } from "react";
import { useStudents } from "../context/StudentsContext";

export default function Students() {
  const { students, addStudent, removeStudent, resetStudents, loading } = useStudents();

  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [error, setError] = useState<string | null>(null);

  const canAdd = useMemo(
    () => name.trim().length > 0 && grade.trim().length > 0 && !loading,
    [name, grade, loading]
  );

  async function onAdd() {
    if (!canAdd) return;
    setError(null);
    try {
      await addStudent(name.trim(), grade.trim());
      setName("");
      setGrade("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add student");
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: "30px auto" }}>
      <h2>Students</h2>

      {error && (
        <div style={{ background: "#ffe6e6", padding: 10, borderRadius: 8, marginBottom: 12 }}>
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 1, padding: 10 }}
        />
        <input
          placeholder="Grade"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          style={{ width: 140, padding: 10 }}
        />
        <button onClick={onAdd} disabled={!canAdd} style={{ padding: "10px 14px" }}>
          {loading ? "..." : "Add"}
        </button>
        <button onClick={resetStudents} disabled={loading} style={{ padding: "10px 14px" }}>
          Reset
        </button>
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: 10 }}>
        {students.length === 0 ? (
          <div style={{ padding: 14 }}>{loading ? "Loading..." : "No students yet."}</div>
        ) : (
          students.map((s, idx) => (
            <div
              key={s.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: 12,
                borderTop: idx === 0 ? "none" : "1px solid #eee",
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{s.name}</div>
                <div style={{ opacity: 0.8 }}>Grade: {s.grade}</div>
              </div>
              <button onClick={() => removeStudent(s.id)} style={{ padding: "8px 12px" }}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
