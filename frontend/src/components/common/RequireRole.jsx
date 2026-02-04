import { Navigate } from "react-router-dom";
import { authStore } from "../../auth/auth.store";

const RequireRole = ({ roles, children }) => {
  const { user, isAuthenticated } = authStore.getState();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RequireRole;
