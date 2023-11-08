import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { checkIfLogin } from "../../utils/sessionManagement";
const AuthRoutes: React.FC = () => {
  return checkIfLogin() ? (
    <Outlet />
  ) : (
    <Navigate
      to={{
        pathname: "/login",
      }}
    />
  );
};

export default AuthRoutes;
