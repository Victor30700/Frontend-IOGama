import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface RoleRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const RoleRoute: React.FC<RoleRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Si no tiene el rol, lo mandamos al dashboard principal
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
