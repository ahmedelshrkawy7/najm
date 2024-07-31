import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/user/HomePage";
import { ReportsPage } from "../import";
import AllAdmins from "../pages/admin/AllAdmins";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/ReportsPage" element={<ReportsPage />} />
        <Route path="/allAdmins" element={<AllAdmins />} />
      </Routes>
    </>
  );
};

export default Layout;
