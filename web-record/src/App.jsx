// src/App.jsx
import { useState, useEffect } from 'react';
import { getApplications, createApplication, updateApplication, deleteApplication } from './services/apiService';
import ApplicationForm from './components/ApplicationForm';
import ApplicationList from './components/ApplicationList';
import DashboardSummary from './components/DashboardSummary';
import './index.css';

function App() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // New state for search

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

  // Filter the applications before passing them to the list
  const filteredApps = applications.filter(app => 
    app.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header>
        <h1 className="header-title">Internship & Tech Role Tracker</h1>
      </header>
      
      <main>
        {/* Insert the new Summary Component */}
        <DashboardSummary applications={applications} />

        <ApplicationForm onAdd={handleAddApplication} />
        
        <div style={{ marginTop: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>My Applications ({filteredApps.length})</h2>
            
            {/* Search Bar */}
            <input 
              type="text" 
              placeholder="Search companies or roles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '300px', padding: '0.5rem', borderRadius: '20px' }}
            />
          </div>

          <ApplicationList 
            applications={filteredApps} 
            onUpdate={handleUpdateApplication}
            onDelete={handleDeleteApplication}
          />
        </div>
      </main>
    </div>
  );
}

export default App;