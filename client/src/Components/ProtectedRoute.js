import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, redirectTo = '/' }) => {
  return isAuthenticated ? (
    <Route element={element} />
  ) : (
    <Navigate to={redirectTo} replace />
  );
};

export default ProtectedRoute;
