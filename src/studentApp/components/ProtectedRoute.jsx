import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const ProtectedRoute = () => {
  const { isAuthenticated, isAuthResolved } = useAuthStore();

  if (!isAuthResolved) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center font-mono text-primary text-xl">
        INITIALIZING_PROTOCOL...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/student/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
