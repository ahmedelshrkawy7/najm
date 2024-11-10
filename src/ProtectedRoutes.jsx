/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import TokenContext from "./store/TokenContext";
import Login from "./pages/admin/Login";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { token, logout } = useContext(TokenContext);
  // console.log("🚀 ~ ProtectedRoutes ~ token:", token);
  let { pathname } = useLocation();
  if (!token) {
    return <Navigate replace to="/admin/login" />;
  }

  const role = token.role;

  // If the role isn't allowed, also redirect to login (or any other page)
  if (allowedRoles && !allowedRoles.includes(role)) {
    logout();
    return <Navigate replace to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoutes;
