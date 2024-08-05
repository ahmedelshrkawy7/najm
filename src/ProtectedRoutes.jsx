import React, { useContext } from "react";
import TokenContext from "./store/TokenContext";
import Login from "./pages/admin/Login";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const { token } = useContext(TokenContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;
