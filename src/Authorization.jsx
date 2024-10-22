/* eslint-disable no-unused-vars */
import React from "react";
import Test from "./component/Reports/test";
import Accreditor from "./pages/accreditor/Accreditor";
import Study from "./pages/admin/Study";
import { ReportsPreview } from "./import";

const Authorization = () => {
  const role = JSON.parse(localStorage.getItem("token")).role;
  if (role === "responsible") return <Test />;
  else if (role === "accreditor")
    return (
      <Study title="تفاصيل البلاغ" role={role} name="accreditor">
        <Accreditor role={role} />
      </Study>
    );
  else if (role === "") return <div>f</div>;
  else return <div> no role</div>;
};

export default Authorization;
