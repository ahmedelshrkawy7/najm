import { BrowserRouter } from "react-router-dom";
import { ReactDOM, App, React } from "./import";
import "./index.css";
import { UserContextProvider } from "./store/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
