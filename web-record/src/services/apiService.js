// src/services/apiService.js

const STORAGE_KEY = "tech_role_tracker";

// READ
export const getApplications = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// CREATE
export const createApplication = (newApp) => {
  const apps = getApplications();
  const appWithId = { ...newApp, id: Date.now().toString() };
  apps.push(appWithId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  return apps; // Return updated list
};

// UPDATE
export const updateApplication = (updatedApp) => {
  const apps = getApplications();
  const updatedApps = apps.map((app) =>
    app.id === updatedApp.id ? updatedApp : app,
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedApps));
  return updatedApps;
};

// DELETE
export const deleteApplication = (id) => {
  const apps = getApplications();
  const filteredApps = apps.filter((app) => app.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredApps));
  return filteredApps;
};
