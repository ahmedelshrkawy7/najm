import React from "react";

const ReportsHeader = ({ title, subTitle }) => {
  return (
    <>
      <h2 className="bg-[#33835C] font-bold text-xl px-8 py-4 text-white">
        {title}
      </h2>
      <h2 className="text-[#000000] px-8 my-5 mt-4">{subTitle}</h2>
    </>
  );
};

export default ReportsHeader;
