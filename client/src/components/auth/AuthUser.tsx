import { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const AuthUser = (): JSX.Element => {
  const { user } = useAuth();

  const isAuthenticated = useMemo(
    () => user && ["admin", "user"].includes(user.role),
    [user],
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AuthUser;
