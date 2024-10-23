/* eslint-disable no-unused-vars */
import { MiniHeader, Navbar, ReportsPage } from "./import.js";

import {
  Routes,
  Route,
  json,
  useNavigation,
  useLocation,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import HomePage from "./pages/user/HomePage.jsx";
import Dashboard from "./Dashboard.jsx";
// import Success from "./models/Success.jsx";
import Test from "./component/Reports/test.jsx";
import Login from "./pages/admin/Login.jsx";
import TokenContext, { TokenContextProvider } from "./store/TokenContext.jsx";
import { useContext } from "react";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import AllAdmins from "./pages/admin/AllAdmins.jsx";
import NotFound from "./NotFound.jsx";
import PreparingStudy from "./component/PreparingStudy.jsx";
import ReportDate from "./pages/admin/ReportDate.jsx";

import { StudyContextPrtovider } from "./store/StudyContext.jsx";
import Study from "./pages/admin/Study.jsx";
import AdminManager from "./pages/admin/AdminManager.jsx";
import Deptview from "./pages/admin/Deptview.jsx";
import Accreditor from "./Accreditor.jsx";
import Authorization from "./Authorization.jsx";
import StudyPreview from "./component/StudyPreview.jsx";
import EditStudy from "./component/EditStudy.jsx";

const routes = [
  {
    element: <AppLayout />, // This wraps all child routes
    handle: { crumb: "الرئيسية" },
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "ReportsPage",
        element: <ReportsPage />,
        handle: { crumb: "تقديم بلاغ" },
        loader: () => {
          console.log("ramy");
          return ["alexon"];
        },
      },

      {
        path: "/dash",
        element: (
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/dash/:id",
        element: (
          <ProtectedRoutes>
            <Outlet />
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: <Authorization />,
          },
          {
            path: "editStudy",
            element: (
              <Study
                title={"اعداد الدراسة الاولية"}
                role={"responsible"}
                name="prepare"
              >
                <EditStudy />
              </Study>
            ),
          },
          {
            path: "preparingStudy",
            element: (
              <Study
                title={"اعداد الدراسة الاولية"}
                role={"responsible"}
                name="prepare"
              >
                <PreparingStudy />
              </Study>
            ),
          },
          {
            path: "previewStudy",
            element: (
              <Study
                title={"الدراسة الاولية"}
                role={"responsible"}
                name="accreditor"
              >
                <StudyPreview />
              </Study>
            ),
          },

          {
            path: "reportsDate",
            element: <ReportDate />,
          },
        ],
      },
      {
        path: "allAdmins",
        element: <AllAdmins />,
      },
      {
        path: "managers",
        element: <AdminManager />,
      },
      {
        path: "depts",
        handle: { crumb: "التاسيس" },
        element: <Deptview />,
      },
      {
        path: "Acc",
        handle: { crumb: "معتمد البلاغ" },
        element: <Accreditor />,
      },
      {
        path: "*",
        element: <NotFound msg={"الصفحة غير موجودة"} />,
      },
    ],
  },
  {
    path: "admin/login",
    element: <Login />,
  },
];

function AppLayout() {
  const { token } = useContext(TokenContext);

  let { pathname } = useLocation();

  return (
    <>
      {!/(Admin|login)/gi.test(pathname) && <Navbar />}
      <Outlet />
    </>
  );
}

const router = createBrowserRouter(routes);

function App() {
  return (
    // <StudyContextPrtovider>
    <TokenContextProvider>
      <StudyContextPrtovider>
        <RouterProvider router={router} />
      </StudyContextPrtovider>
    </TokenContextProvider>
    // </StudyContextPrtovider>
  );
}

export default App;
