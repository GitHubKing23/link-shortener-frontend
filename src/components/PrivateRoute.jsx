import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function isTokenValid(token) {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token || !isTokenValid(token)) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}
