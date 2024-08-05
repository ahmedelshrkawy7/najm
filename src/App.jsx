import { Navbar, ReportsPage } from "./import.js";
import Listinput from "./component/forms/listInput/Listinput";
import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/user/HomePage.jsx";
import Dashboard from "./Dashboard.jsx";
import Success from "./models/Success.jsx";
import Test from "./component/Reports/test.jsx";
import AllAdmins from "./pages/admin/AllAdmins.jsx";
import Login from "./pages/admin/Login.jsx";

function App() {
  let { pathname } = useLocation();
  return (
    <>
      {!/(admin)/gi.test(pathname) && <Navbar />}
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/ReportsPage" element={<ReportsPage />} />
        <Route path="/allAdmins" element={<AllAdmins />} />
        <Route path="/loginAdmin" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/dash/:id" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
