import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import { KanbanPage } from './pages/KanbanPage';
import { ProjectManagerLayout } from './layout/ProjectManagerLayout';
import { WbsPage } from './pages/WbsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProjectManagerLayout />}>
            <Route path="/kaban" element={<KanbanPage />} />
            <Route path="/wbs" element={<WbsPage />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;