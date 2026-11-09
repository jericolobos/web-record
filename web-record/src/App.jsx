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

  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    setApplications(getApplications());
  }, []);

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
      <header className="header-container">
        <div>
          <span className="header-eyebrow">Application Log</span>
          <h1 className="header-title">Internship &amp; Tech Role Tracker</h1>
        </div>

        <div className="theme-toggle" role="group" aria-label="Colour theme">
          <button
            type="button"
            aria-pressed={!isDarkMode}
            onClick={() => setIsDarkMode(false)}
          >
            Light
          </button>
          <button
            type="button"
            aria-pressed={isDarkMode}
            onClick={() => setIsDarkMode(true)}
          >
            Dark
          </button>
        </div>
      </header>

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <DashboardSummary applications={applications} />
                <ApplicationForm onAdd={handleAddApplication} />

                <section>
                  <div className="controls-bar">
                    <h2>Applications ({sortedAndFilteredApps.length})</h2>

                    <div className="controls-fields">
                      <input
                        type="text"
                        placeholder="Search company or role"
                        aria-label="Search applications"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <select
                        aria-label="Sort applications"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="dateDesc">Newest first</option>
                        <option value="dateAsc">Oldest first</option>
                        <option value="company">Company (Aâ€“Z)</option>
                        <option value="status">Status</option>
                      </select>
                    </div>
                  </div>

                  <ApplicationList
                    applications={sortedAndFilteredApps}
                    onUpdate={handleUpdateApplication}
                    onDelete={handleDeleteApplication}
                  />
                </section>
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
