import { BrowserRouter } from "react-router-dom";
import { ReactDOM, App, React } from "./import";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
