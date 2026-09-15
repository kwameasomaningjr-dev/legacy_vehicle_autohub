import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useCars } from '../context/CarContext';

export default function ProtectedRoute({ children }) {
  const { isAdminAuthenticated } = useCars();
  const location = useLocation();

  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
