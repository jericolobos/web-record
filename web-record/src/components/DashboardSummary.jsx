// src/components/DashboardSummary.jsx

function DashboardSummary({ applications }) {
  // Calculate stats
  const total = applications.length;
  const interviewing = applications.filter(
    (app) => app.status === "Interviewing",
  ).length;
  const offers = applications.filter((app) => app.status === "Offer").length;
  const rejected = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        gap: "1rem",
        marginBottom: "2rem",
      }}
    >
      <div className="card" style={{ textAlign: "center", padding: "1rem" }}>
        <h3
          style={{
            margin: "0",
            color: "var(--text-muted)",
            fontSize: "0.875rem",
            textTransform: "uppercase",
          }}
        >
          Total Apps
        </h3>
        <p
          style={{
            margin: "0.5rem 0 0 0",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "var(--primary)",
          }}
        >
          {total}
        </p>
      </div>

      <div className="card" style={{ textAlign: "center", padding: "1rem" }}>
        <h3
          style={{
            margin: "0",
            color: "var(--text-muted)",
            fontSize: "0.875rem",
            textTransform: "uppercase",
          }}
        >
          Interviewing
        </h3>
        <p
          style={{
            margin: "0.5rem 0 0 0",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "var(--status-interviewing-text)",
          }}
        >
          {interviewing}
        </p>
      </div>

      <div className="card" style={{ textAlign: "center", padding: "1rem" }}>
        <h3
          style={{
            margin: "0",
            color: "var(--text-muted)",
            fontSize: "0.875rem",
            textTransform: "uppercase",
          }}
        >
          Offers
        </h3>
        <p
          style={{
            margin: "0.5rem 0 0 0",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "var(--status-offer-text)",
          }}
        >
          {offers}
        </p>
      </div>

      <div className="card" style={{ textAlign: "center", padding: "1rem" }}>
        <h3
          style={{
            margin: "0",
            color: "var(--text-muted)",
            fontSize: "0.875rem",
            textTransform: "uppercase",
          }}
        >
          Rejected
        </h3>
        <p
          style={{
            margin: "0.5rem 0 0 0",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "var(--status-rejected-text)",
          }}
        >
          {rejected}
        </p>
      </div>
    </div>
  );
}

export default DashboardSummary;
