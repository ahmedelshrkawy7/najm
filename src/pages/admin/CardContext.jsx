/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

let Context = createContext();

export let ContextProvider = ({ children }) => {
  const [modelContent, setModelContent] = useState(""); // State for model content
  const [modelTitle, setModelTitle] = useState("");

  return (
    <Context.Provider
      value={{ modelContent, setModelContent, modelTitle, setModelTitle }}
    >
      {children}
    </Context.Provider>
  );
};

export let useGlobalContext = () => {
  return useContext(Context);
};
