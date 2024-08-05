import { Navbar, ReportsPage } from "./import.js";
import Listinput from "./component/forms/listInput/Listinput";
import { Routes, Route, json, useNavigation } from "react-router-dom";
import HomePage from "./pages/user/HomePage.jsx";
import Dashboard from "./Dashboard.jsx";
import Success from "./models/Success.jsx";
import Test from "./component/Reports/test.jsx";
import Login from "../Login.jsx";
import TokenContext, { TokenContextProvider } from "./store/TokenContext.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function App() {
  const { token } = useContext(TokenContext);
  console.log(token);

  return (
    <TokenContextProvider>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/ReportsPage" element={<ReportsPage />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/dash/:id" element={<Test />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </TokenContextProvider>
  );
}

export default App;
