
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, UserRole, TrainerStatus } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  allowedTrainerStatus?: TrainerStatus[];
  redirectPath?: string;
}

const ProtectedRoute = ({ 
  allowedRoles = [], 
  allowedTrainerStatus = [],
  redirectPath = '/auth' 
}: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role and status
    if (user.role === 'admin') {
      return <Navigate to="/admin-dashboard" replace />;
    } else if (user.role === 'trainer') {
      if (user.trainerStatus === 'pending') {
        return <Navigate to="/pending-trainer-dashboard" replace />;
      } else {
        return <Navigate to="/trainer-dashboard" replace />;
      }
    } else {
      return <Navigate to="/user-dashboard" replace />;
    }
  }

  // Check trainer status if role is trainer and status restrictions are specified
  if (user?.role === 'trainer' && allowedTrainerStatus.length > 0) {
    if (!user.trainerStatus || !allowedTrainerStatus.includes(user.trainerStatus)) {
      if (user.trainerStatus === 'pending') {
        return <Navigate to="/pending-trainer-dashboard" replace />;
      } else {
        return <Navigate to="/trainer-dashboard" replace />;
      }
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
