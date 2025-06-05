import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import HomePage from './pages/HomePage';
import { KanbanPage } from './pages/KanbanPage';
import { ProjectManagerLayout } from './layout/ProjectManagerLayout';
import { WbsPage } from './pages/WbsPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ToastContainer } from 'react-toastify';
import RequireAuth from './components/RequireAuth';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route element={<ProjectManagerLayout />}>
              <Route path="/kaban" element={<KanbanPage />} />
              <Route path="/wbs" element={<WbsPage />} />
            </Route>
          </Route>

          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;