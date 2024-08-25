import { ReactDOM, App, React } from "./import";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "./utils/notifications/Toast";
const queryClient = new QueryClient({});
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toast />
    </QueryClientProvider>
  </BrowserRouter>
);
