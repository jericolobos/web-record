// src/components/ApplicationList.jsx
import { Link } from "react-router-dom";

function ApplicationList({ applications, onUpdate, onDelete, showToast }) {
  if (applications.length === 0) {
    return (
      <p
        style={{
          color: "var(--text-muted)",
          textAlign: "center",
          padding: "40px 0",
          fontSize: "0.875rem",
        }}
      >
        No applications logged yet.
      </p>
    );
  }

  const getBadgeStyle = (status) => {
    const statusKey = status.toLowerCase();
    return {
      backgroundColor: `var(--status-${statusKey}-bg)`,
      color: `var(--status-${statusKey}-text)`,
      padding: "4px 10px",
      borderRadius: "6px",
      fontSize: "0.75rem",
      fontWeight: "600",
      display: "inline-block",
      marginBottom: "8px",
    };
  };

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      {applications.map((app) => (
        <div
          key={app.id}
          className="card"
          style={{
            marginBottom: "0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            padding: "24px",
          }}
        >
          <div>
            <span style={getBadgeStyle(app.status)}>{app.status}</span>
            <h3 style={{ margin: "0 0 4px 0", fontSize: "1.125rem" }}>
              {app.company}
            </h3>
            <p
              style={{
                margin: "0 0 8px 0",
                color: "var(--text-muted)",
                fontSize: "0.875rem",
              }}
            >
              {app.role}
            </p>
            <small style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>
              Applied: {new Date(app.dateApplied).toLocaleDateString()}
            </small>
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <select
              value={app.status}
              onChange={(e) => {
                onUpdate({ ...app, status: e.target.value });
                showToast(`Status updated to ${e.target.value}.`, "success");
              }}
              style={{ width: "auto" }}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>

            <Link to={`/application/${app.id}`} className="btn-secondary">
              Details
            </Link>

            <button
              className="btn-danger"
              onClick={() => {
                onDelete(app.id);
                showToast(`${app.company} application deleted.`, "error");
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
