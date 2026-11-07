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
import "./index.css";

function App() {
  const [applications, setApplications] = useState([]);

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

  return (
    <div className="dashboard-container">
      <header>
        <h1 className="header-title">Internship & Tech Role Tracker</h1>
      </header>

      <main>
        <ApplicationForm onAdd={handleAddApplication} />

        <div>
          <h2>My Applications ({applications.length})</h2>
          <ApplicationList
            applications={applications}
            onUpdate={handleUpdateApplication}
            onDelete={handleDeleteApplication}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
