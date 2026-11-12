// src/components/ApplicationDetail.jsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function ApplicationDetail({ applications, onUpdate, onDelete, showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState("");

  const app = applications.find((a) => a.id === id);

  useEffect(() => {
    if (app && app.notes) {
      setNotes(app.notes);
    }
  }, [app]);

  if (!app) {
    return (
      <div className="card" style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Application not found.</h2>
        <Link to="/" style={{ color: "var(--primary)", fontWeight: "bold" }}>
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleSaveNotes = () => {
    onUpdate({ ...app, notes });
    showToast("Interview notes saved successfully!", "success"); // Toast fired
  };

  const handleDelete = () => {
    onDelete(app.id);
    showToast(`${app.company} application deleted`, "error"); // Toast fired
    navigate("/");
  };

  return (
    <div className="card">
      <Link
        to="/"
        style={{
          color: "var(--primary)",
          textDecoration: "none",
          display: "inline-block",
          marginBottom: "1.5rem",
          fontWeight: "bold",
        }}
      >
        &larr; Back to Dashboard
      </Link>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          borderBottom: "1px solid var(--glass-border)",
          paddingBottom: "1rem",
          marginBottom: "1.5rem",
        }}
      >
        <div>
          <h2 style={{ fontSize: "2rem", marginBottom: "0.25rem" }}>
            {app.company}
          </h2>
          <p
            style={{
              color: "var(--glass-muted)",
              fontSize: "1.25rem",
              margin: "0",
            }}
          >
            {app.role}
          </p>
          <small
            style={{
              color: "var(--glass-muted)",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            Applied: {new Date(app.dateApplied).toLocaleDateString()}
          </small>
        </div>
        <span
          style={{
            backgroundColor: `var(--status-${app.status.toLowerCase()}-bg)`,
            color: `var(--status-${app.status.toLowerCase()}-text)`,
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            fontWeight: "bold",
          }}
        >
          {app.status}
        </span>
      </div>

      <div>
        <h3>Interview Notes & Requirements</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Jot down interview questions, technical test links, or recruiter contact info here..."
          style={{
            minHeight: "200px",
            marginBottom: "1.25rem",
            fontFamily: "inherit",
            resize: "vertical",
          }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleSaveNotes}>Save Notes</button>
          <button
            onClick={handleDelete}
            style={{ backgroundColor: "var(--danger)" }}
          >
            Delete Application
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetail;
