import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MainLayout from './layout/MainLayout';
import { KanbanPage } from './pages/KanbanPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/kaban" element={<KanbanPage />} />
          <Route path="/wbs" element={<KanbanPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;