import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter: React.FC = () => {
  const isAuth = true;
  return !isAuth ? <Navigate to="/auth/login" /> : <Outlet />;
};

export default ProtectedRouter;
