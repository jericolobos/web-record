// src/App.jsx
import { useState, useEffect } from "react";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "./services/apiService";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";
import DashboardSummary from "./components/DashboardSummary";
import "./index.css";

function App() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("dateDesc"); // New state for sorting

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  const handleAddApplication = (newApp) => {
    setApplications(createApplication(newApp));
  };

  const handleUpdateApplication = (updatedApp) => {
    setApplications(updateApplication(updatedApp));
  };

  const handleDeleteApplication = (id) => {
    setApplications(deleteApplication(id));
  };

  // 1. First, filter the applications based on the search term
  const filteredApps = applications.filter(
    (app) =>
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 2. Then, sort the filtered array based on the selected dropdown value
  const sortedAndFilteredApps = [...filteredApps].sort((a, b) => {
    if (sortBy === "dateDesc") {
      return new Date(b.dateApplied) - new Date(a.dateApplied);
    } else if (sortBy === "dateAsc") {
      return new Date(a.dateApplied) - new Date(b.dateApplied);
    } else if (sortBy === "company") {
      return a.company.localeCompare(b.company);
    } else if (sortBy === "status") {
      return a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <div className="dashboard-container">
      <header>
        <h1 className="header-title">Internship & Tech Role Tracker</h1>
      </header>

      <main>
        <DashboardSummary applications={applications} />

        <ApplicationForm onAdd={handleAddApplication} />

        <div style={{ marginTop: "2rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <h2 style={{ margin: 0 }}>
              My Applications ({sortedAndFilteredApps.length})
            </h2>

            <div style={{ display: "flex", gap: "10px" }}>
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search companies or roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: "250px",
                  padding: "0.5rem",
                  borderRadius: "6px",
                }}
              />

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: "0.5rem",
                  borderRadius: "6px",
                  width: "auto",
                }}
              >
                <option value="dateDesc">Newest First</option>
                <option value="dateAsc">Oldest First</option>
                <option value="company">Company (A-Z)</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>

          {/* Pass the sorted list to the UI */}
          <ApplicationList
            applications={sortedAndFilteredApps}
            onUpdate={handleUpdateApplication}
            onDelete={handleDeleteApplication}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
