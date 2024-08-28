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
import PreparingStudy from "./pages/admin/PreparingStudy.jsx";
import ReportDate from "./pages/admin/ReportDate.jsx";

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
            element: <Test />,
          },
          {
            path: "preparingStudy",
            element: <PreparingStudy />,
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
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter(routes);

function App() {
  return (
        <TokenContextProvider>
        <RouterProvider router={router} />
        </TokenContextProvider>

  )
}

export default App;
