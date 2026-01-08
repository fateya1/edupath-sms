import { useMemo, useState } from "react";
import { useStudents } from "../context/StudentsContext";

export default function Students() {
  const { students, addStudent, removeStudent, resetStudents, loading } = useStudents();

  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const canAdd = useMemo(() => {
    return name.trim().length > 0 && grade.trim().length > 0;
  }, [name, grade]);

  async function onAdd() {
    if (!canAdd || submitting) return;

    try {
      setSubmitting(true);
      await addStudent(name.trim(), grade.trim());
      setName("");
      setGrade("");
    } finally {
      setSubmitting(false);
    }
  }

  async function onRemove(id: number) {
    await removeStudent(id);
  }

  return (
    <div style={{ maxWidth: 720, margin: "30px auto" }}>
      <h2>Students</h2>

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

        <button
          onClick={onAdd}
          disabled={!canAdd || submitting}
          style={{ padding: "10px 14px" }}
        >
          {submitting ? "Adding..." : "Add"}
        </button>

        <button
          onClick={resetStudents}
          disabled={loading}
          style={{ padding: "10px 14px" }}
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: 10, overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: 14 }}>Loading...</div>
        ) : students.length === 0 ? (
          <div style={{ padding: 14 }}>No students yet.</div>
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

              <button onClick={() => onRemove(s.id)} style={{ padding: "8px 12px" }}>
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
