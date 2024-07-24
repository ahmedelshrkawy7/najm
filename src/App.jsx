import { ReportsPage } from "./import.js";
import Listinput from "./component/forms/listInput/Listinput";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/user/HomePage.jsx";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/ReportsPage" element={<ReportsPage />} />
    </Routes>
  );
}

export default App;
