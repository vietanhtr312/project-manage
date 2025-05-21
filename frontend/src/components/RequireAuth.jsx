import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useUserStore from '../store/userStore';

const RequireAuth = ({ children }) => {
  const token = useUserStore((state) => state.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
