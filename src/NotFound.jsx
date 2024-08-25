import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFound = ({ msg }) => {
  let navigate = useNavigate();
  let { pathname } = useLocation();
  return (
    <div className="flex flex-col space-y-4 items-center justify-center h-[calc(100vh-80px)]">
      <h2 className="text-red-500 font-bold text-2xl capitalize">{msg}</h2>
      <button
        className="bg-[#33835C] cursor-pointer md:p-10 p-5 md:py-2 py-1 md:text-xl text-md text-white rounded-md mb-4 md:mb-0"
        onClick={() => {
          /(dash)/gi.test(pathname) ? navigate("/dash") : navigate("/");
        }}
      >
        العودة للرئيسية
      </button>
    </div>
  );
};

export default NotFound;
