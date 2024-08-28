import { Navbar, ReportsPage } from "./import.js";

import { Routes, Route, useLocation } from "react-router-dom";
import HomePage from "./pages/user/HomePage.jsx";
import Dashboard from "./Dashboard.jsx";
// import Success from "./models/Success.jsx";
import Test from "./component/Reports/test.jsx";
import Login from "./pages/admin/Login.jsx";
import TokenContext, { TokenContextProvider } from "./store/TokenContext.jsx";
import { useContext } from "react";
// import { Navigate } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import AllAdmins from "./pages/admin/AllAdmins.jsx";
import NotFound from "./NotFound.jsx";
import AdminManager from "./pages/admin/AdminManager.jsx";
import Deptview from "./pages/admin/Deptview.jsx";

function App() {
  const { token } = useContext(TokenContext);
  console.log(token);

  let { pathname } = useLocation();
  console.log("🚀 ~ App ~ pathname:", pathname);

  return (
    <TokenContextProvider>
      {!/(Admin|login)/gi.test(pathname) && <Navbar />}

      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/ReportsPage" element={<ReportsPage />} />
        <Route
          path="/dash"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dash/:id"
          element={
            <ProtectedRoutes>
              <Test />
            </ProtectedRoutes>
          }
        />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/allAdmins" element={<AllAdmins />} />
        <Route path="/managers" element={<AdminManager />} />
        <Route path="/depts" element={<Deptview />} />
        <Route path="*" element={<NotFound msg={"الصفحة غير موجودة"} />} />
      </Routes>
    </TokenContextProvider>
  );
}

export default App;
