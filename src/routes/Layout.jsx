import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/user/HomePage";
import {  ReportsPage } from "../import";

const Layout = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/ReportsPage" element={<ReportsPage />} />
      </Routes>
    </>
  );
};

export default Layout;
