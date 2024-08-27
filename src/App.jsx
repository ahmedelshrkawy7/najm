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
import Success from "./models/Success.jsx";
import Test from "./component/Reports/test.jsx";
import Login from "./pages/admin/Login.jsx";
import TokenContext, { TokenContextProvider } from "./store/TokenContext.jsx";
import { useContext } from "react";
import ProtectedRoutes from "./ProtectedRoutes.jsx";
import AllAdmins from "./pages/admin/AllAdmins.jsx";
import NotFound from "./NotFound.jsx";

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
        path: "/ReportsPage",
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
            <Test />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/admin/login",
        element: <Login />,
      },
      {
        path: "/allAdmins",
        element: <AllAdmins />,
      },
      {
        path: "*",
        element: <NotFound msg={"الصفحة غير موجودة"} />,
      },
    ],
  },
];

function AppLayout() {
  const { token } = useContext(TokenContext);
  console.log(token);

  let { pathname } = useLocation();

  return (
    <TokenContextProvider>
      {!/(Admin|login)/gi.test(pathname) && <Navbar />}
      <Outlet />
    </TokenContextProvider>
  );
}

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
