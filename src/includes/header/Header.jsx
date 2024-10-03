/* eslint-disable react/display-name */
import { useNavigate } from "react-router-dom";
import React from "react";
const Header = React.forwardRef((props, ref) => {
  let navigate = useNavigate();

  return (
    <div
      ref={ref}
      className="bg-no-repeat bg-[url('../src/assets/omar-ram-QD9LY8Obumg-unsplash.png')] bg-cover h-[75vh]"
    >
      <div className="w-[90%] mx-auto relative top-1/2 -translate-y-1/2">
        <h2 className="md:text-5xl text-4xl max-w-lg !leading-[1.7] text-white font-semibold mb-12">
          مرحبا بك فى نظام <br />
          الابلاغ عن المخالفات
        </h2>
        <button
          onClick={() => navigate("/ReportsPage")}
          className="border-0 bg-[#33835C] px-6 rounded-lg text-lg py-3 text-white font-semibold"
        >
          تقديم بلاغ جديد
        </button>
      </div>
    </div>
  );
});

export default Header;
