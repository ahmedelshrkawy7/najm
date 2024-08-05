import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import React from "react";
const TokenContext = React.createContext({
  token: "",
  login: () => {},
  logout: () => {},
});

export const TokenContextProvider = ({ children }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  console.log(token);
    const navigate = useNavigate();

  useEffect(() => {
    const savesToken = JSON.parse(localStorage.getItem("token"));
    setToken(savesToken);
  }, []);
  const loginHandler = (token) => {
    console.log(token);
      setToken(token);
      localStorage.setItem("token", JSON.stringify(token));
      navigate('/dash')
    
  };
  const logoutHandler = () => {
    setToken("");
    localStorage.removeItem("token");
  };
  return (
    <TokenContext.Provider
      value={{
        token,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};
export default TokenContext;
