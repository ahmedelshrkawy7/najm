/* eslint-disable no-unused-vars */
import { ReactDOM, App, React } from "./import";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "./utils/notifications/Toast";
import ReportModal from "./models/ReportModal";
import ReportInfo from "./models/ReportInfo";
import ReportLock from "./models/ReportLock";
import UsableReport from "./models/UsableReport";
import ReportEscalation from "./models/ReportEscalation";
import { Modal } from "antd";
import Model from "./models/Model";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
      cacheTime: 1000 * 60 * 10, // Data stays in cache for 10 minutes
      retry: 2, // Retry failed queries up to 2 times
      refetchOnWindowFocus: false, // Disable refetching on window focus
      refetchOnReconnect: true, // Refetch when reconnecting to the network
      refetchOnMount: false, // Prevent refetching when component remounts
      suspense: false, // Disable suspense mode
    },
    mutations: {
      retry: 1, // Retry mutations once on failure
    },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <App />
    <Toast />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
