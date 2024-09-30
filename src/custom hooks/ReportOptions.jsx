/* eslint-disable no-unused-vars */
import React from "react";
import ReportOptionType from "./ReportOptionType";
import { useForm } from "react-hook-form";

const ReportOptions = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      typeOfReport: [],
      departmentIssues: [],
      employeeParticipation: [],
      externalParties: [],
    },
  });

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ formattedData:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-5">
        {" "}
        <div className="flex gap-4 flex-col">
          <div>
            <div className="bg-[#33835C1A] text-[#1E1E1E] font-bold p-4 rounded-md">
              نوع البلاغ
            </div>
            <div className="flex flex-col mt-4 gap-2">
              <ReportOptionType
                control={control}
                name="typeOfReport"
                label="اشكال الفساد"
              />
              <ReportOptionType
                control={control}
                name="typeOfReport"
                label=" الرشوة"
              />
              <ReportOptionType
                control={control}
                name="typeOfReport"
                label="غشل الاموال "
              />
            </div>
          </div>
          <div>
            <div className="bg-[#33835C1A] p-4 text-[#1E1E1E] font-bold rounded-md">
              {" "}
              الادارة المعنية بالمخالفة
            </div>
            <div className="flex flex-col mt-4 gap-2">
              <ReportOptionType
                control={control}
                name="departmentIssues"
                label="مجلس الادارة"
              />
              <ReportOptionType
                control={control}
                name="departmentIssues"
                label="الادارة التنفيذية"
              />
              <ReportOptionType
                control={control}
                name="departmentIssues"
                label="قطاع الالتزام "
              />
            </div>
          </div>
          <div>
            <div className="bg-[#33835C1A] text-[#1E1E1E] font-bold p-4 rounded-md">
              مستوى مشاركة موظف الادارة المعنية بالمخالفة{" "}
            </div>
            <div className="flex flex-col mt-4 gap-2">
              <ReportOptionType
                control={control}
                name="employeeParticipation"
                label="رئيس"
              />
              <ReportOptionType
                control={control}
                name="employeeParticipation"
                label="الرئيس التنفيذى"
              />
              <ReportOptionType
                control={control}
                name="employeeParticipation"
                label="اعضاء مجلس الادارة"
              />
            </div>
          </div>
          <div>
            <div className="bg-[#33835C1A] text-[#1E1E1E] font-bold p-4 rounded-md">
              {" "}
              الاطراف الخارجية المشاركة فى المخالفة{" "}
            </div>
            <div className="flex flex-col mt-4 gap-2">
              <ReportOptionType
                control={control}
                name="externalParties"
                label="طرف ثالث"
              />
              <ReportOptionType
                control={control}
                name="externalParties"
                label="الاشخاص المعرفين سياسيا"
              />
              <ReportOptionType
                control={control}
                name="externalParties"
                label="اصحاب النفوذ"
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="px-5 py-3 pt-0 flex items-center justify-end">
        <button
          type="submit"
          className=" bg-[#33835C] text-white p-1 px-10 rounded-lg"
        >
          تاكيد
        </button>
      </div> */}
    </form>
  );
};

export default ReportOptions;
