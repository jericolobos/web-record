// src/components/ApplicationForm.jsx
import { useState } from "react";

function ApplicationForm({ onAdd, showToast }) {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    dateApplied: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.company.trim() || !formData.role.trim()) return;

    onAdd(formData);

    // NEW: Fire the toast here
    showToast(`Application saved for ${formData.company}!`, "success");

    setFormData({
      company: "",
      role: "",
      status: "Applied",
      dateApplied: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: "1.5rem" }}>Log New Application</h2>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                color: "var(--glass-muted)",
              }}
            >
              Company
            </label>
            <input
              type="text"
              name="company"
              placeholder="e.g. Google"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                color: "var(--glass-muted)",
              }}
            >
              Role
            </label>
            <input
              type="text"
              name="role"
              placeholder="e.g. Frontend Intern"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                color: "var(--glass-muted)",
              }}
            >
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Rejected">Rejected</option>
              <option value="Offer">Offer</option>
            </select>
          </div>
          <div>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.875rem",
                color: "var(--glass-muted)",
              }}
            >
              Date Applied
            </label>
            <input
              type="date"
              name="dateApplied"
              value={formData.dateApplied}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" style={{ width: "100%" }}>
          Save Application
        </button>
      </form>
    </div>
  );
}

export default ApplicationForm;
