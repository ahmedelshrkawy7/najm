import { Navbar, ReportsPage } from "./import.js";
import Listinput from "./component/forms/listInput/Listinput";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/user/HomePage.jsx";
import Dashboard from "./Dashboard.jsx";
import Success from "./models/Success.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/ReportsPage" element={<ReportsPage />} />
        <Route path="/dash" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
