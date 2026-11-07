// src/App.jsx

import { useState, useEffect } from "react";
import { getApplications } from "./services/apiService";
import "./App.css";

function App() {
  // State to hold all job applications
  const [applications, setApplications] = useState([]);

  // Load data on initial render
  useEffect(() => {
    setApplications(getApplications());
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Internship & Tech Role Tracker</h1>
      </header>

      <main>
        {/* We will build and insert <ApplicationForm /> here next */}

        {/* We will build and insert <ApplicationList /> here after */}
      </main>
    </div>
  );
}

export default App;
