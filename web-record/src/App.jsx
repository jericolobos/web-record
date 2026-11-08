// src/App.jsx
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import {
  getApplications,
  createApplication,
  updateApplication,
  deleteApplication,
} from "./services/apiService";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationList from "./components/ApplicationList";
import DashboardSummary from "./components/DashboardSummary";
import ApplicationDetail from "./components/ApplicationDetail";
import "./index.css";

function App() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("dateDesc");

  // NEW: Dark mode state initializing from LocalStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    setApplications(getApplications());
  }, []);

  // NEW: Effect to toggle the data-theme attribute on the HTML root element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleAddApplication = (newApp) => {
    setApplications(createApplication(newApp));
  };

  const handleUpdateApplication = (updatedApp) => {
    setApplications(updateApplication(updatedApp));
  };

  const handleDeleteApplication = (id) => {
    setApplications(deleteApplication(id));
  };

  const filteredApps = applications.filter(
    (app) =>
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedAndFilteredApps = [...filteredApps].sort((a, b) => {
    if (sortBy === "dateDesc")
      return new Date(b.dateApplied) - new Date(a.dateApplied);
    if (sortBy === "dateAsc")
      return new Date(a.dateApplied) - new Date(b.dateApplied);
    if (sortBy === "company") return a.company.localeCompare(b.company);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  return (
    <div className="dashboard-container">
      {/* NEW: Updated Header Layout with Toggle Button */}
      <header className="header-container">
        <h1 className="header-title">Internship & Tech Role Tracker</h1>

        {/* NEW: The Switch UI */}
        <label className="theme-switch" aria-label="Toggle Dark Mode">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          />
          <span className="theme-slider"></span>
        </label>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
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

                  <ApplicationList
                    applications={sortedAndFilteredApps}
                    onUpdate={handleUpdateApplication}
                    onDelete={handleDeleteApplication}
                  />
                </div>
              </>
            }
          />

          <Route
            path="/application/:id"
            element={
              <ApplicationDetail
                applications={applications}
                onUpdate={handleUpdateApplication}
                onDelete={handleDeleteApplication}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
