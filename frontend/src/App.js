import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { KanbanPage } from './pages/KanbanPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kaban" element={<KanbanPage />} />
        <Route path="/wbs" element={<KanbanPage />} />
      </Routes>
    </Router>
  );
}

export default App;