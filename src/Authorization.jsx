import React from "react";
import Test from "./component/Reports/test";
import Accreditor from "./pages/accreditor/Accreditor";
import Study from "./pages/admin/Study";
import { ReportsPreview } from "./import";

const Authorization = () => {
  const role = JSON.parse(localStorage.getItem("token")).role;
  if (role === "responsible User") return <Test />;
  else if (role === "accreditor User")
    return (
      <Study title="تفاصيل البلاغ">
        <Accreditor />
      </Study>
    );
  else if (role === "") return <div>f</div>;
};

export default Authorization;
