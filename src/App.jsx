import { Navbar, ReportsPage } from "./import.js";
import Listinput from "./component/forms/listInput/Listinput";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/user/HomePage.jsx";
import Dashboard from "./Dashboard.jsx";
import Success from "./models/Success.jsx";
import Test from "./component/Reports/test.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/ReportsPage" element={<ReportsPage />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/dash/:id" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
