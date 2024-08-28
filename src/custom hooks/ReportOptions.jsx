import React from "react";
import ReportOptionType from "./ReportOptionType";

const ReportOptions = () => {
  return (
    <div className="p-5">
      {" "}
      <div className="flex gap-4 flex-col">
        <div>
          <div className="bg-[#33835C1A] text-[#1E1E1E] font-bold p-4 rounded-md">
            نوع البلاغ
          </div>
          <div className="flex flex-col mt-4 gap-2">
            <ReportOptionType label="اشكال الفساد" />
            <ReportOptionType label=" الرشوة" />
            <ReportOptionType label="غشل الاموال " />
          </div>
        </div>
        <div>
          <div className="bg-[#33835C1A] p-4 text-[#1E1E1E] font-bold rounded-md">
            {" "}
            الادارة المعنية بالمخالفة
          </div>
          <div className="flex flex-col mt-4 gap-2">
            <ReportOptionType label="اشكال الفساد" />
            <ReportOptionType label=" الرشوة" />
            <ReportOptionType label="غشل الاموال " />
          </div>
        </div>
        <div>
          <div className="bg-[#33835C1A] text-[#1E1E1E] font-bold p-4 rounded-md">
            مستوى مشاركة موظف الادارة المعنية بالمخالفة{" "}
          </div>
          <div className="flex flex-col mt-4 gap-2">
            <ReportOptionType label="اشكال الفساد" />
            <ReportOptionType label=" الرشوة" />
            <ReportOptionType label="غشل الاموال " />
          </div>
        </div>
        <div>
          <div className="bg-[#33835C1A] text-[#1E1E1E] font-bold p-4 rounded-md">
            {" "}
            الاطراف الخارجية المشاركة فى المخالفة{" "}
          </div>
          <div className="flex flex-col mt-4 gap-2">
            <ReportOptionType label="اشكال الفساد" />
            <ReportOptionType label=" الرشوة" />
            <ReportOptionType label="غشل الاموال " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportOptions;
