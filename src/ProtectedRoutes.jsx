import React, { useContext } from "react";
import TokenContext from "./store/TokenContext";
import Login from "./pages/admin/Login";

const ProtectedRoutes = ({ children }) => {
  const { token } = useContext(TokenContext);
  return token ? children : <Login />;
};

export default ProtectedRoutes;
