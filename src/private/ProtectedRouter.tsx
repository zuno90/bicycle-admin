import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store";

const ProtectedRouter: React.FC = () => {
  const location = useLocation();
  const authState = useAppSelector((state) => state.auth);

  return !authState.isAuth && !authState.user ? (
    <Navigate to="/auth/login" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedRouter;
