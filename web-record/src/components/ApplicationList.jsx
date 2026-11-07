// src/components/ApplicationList.jsx

function ApplicationList({ applications, onUpdate, onDelete }) {
  if (applications.length === 0) {
    return (
      <p
        style={{
          color: "var(--text-muted)",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        No applications logged yet. Start applying!
      </p>
    );
  }

  // Helper function to map the status to our CSS variables
  const getBadgeStyle = (status) => {
    const statusKey = status.toLowerCase();
    return {
      backgroundColor: `var(--status-${statusKey}-bg)`,
      color: `var(--status-${statusKey}-text)`,
      padding: "0.25rem 0.75rem",
      borderRadius: "999px",
      fontSize: "0.875rem",
      fontWeight: "600",
      display: "inline-block",
      marginBottom: "0.5rem",
    };
  };

  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {applications.map((app) => (
        <div
          key={app.id}
          className="card"
          style={{
            marginBottom: "0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span style={getBadgeStyle(app.status)}>{app.status}</span>
            <h3 style={{ margin: "0 0 0.25rem 0" }}>{app.company}</h3>
            <p style={{ margin: "0 0 0.5rem 0", color: "var(--text-muted)" }}>
              {app.role}
            </p>
            <small style={{ color: "var(--text-muted)" }}>
              Applied: {new Date(app.dateApplied).toLocaleDateString()}
            </small>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <select
              value={app.status}
              onChange={(e) => onUpdate({ ...app, status: e.target.value })}
              style={{ width: "auto", padding: "0.5rem" }}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>

            <button
              onClick={() => onDelete(app.id)}
              style={{
                backgroundColor: "var(--danger)",
                padding: "0.5rem 1rem",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApplicationList;
