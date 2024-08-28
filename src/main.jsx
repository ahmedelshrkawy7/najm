/* eslint-disable no-unused-vars */
import { ReactDOM, App, React } from "./import";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "./utils/notifications/Toast";
import ReportModel from "./models/ReportModel";
import ReportInfo from "./models/ReportInfo";
import ReportLock from "./models/ReportLock";
import UsableReport from "./models/UsableReport";
import ReportEscalation from "./models/ReportEscalation";
import Model from "./models/Model";
import { ContextProvider } from "./pages/admin/CardContext";
const queryClient = new QueryClient({});
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
        <App />
      <Toast />
    </QueryClientProvider>
  </BrowserRouter>
);
