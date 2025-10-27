import { ReactNode } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from '@tanstack/react-router';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    // Redirect to Auth0 login
    loginWithRedirect();
    return null;
  }

  return <>{children}</>;
}