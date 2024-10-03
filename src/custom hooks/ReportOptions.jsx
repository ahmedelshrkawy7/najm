/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import ReportOptionType from "./ReportOptionType";
import { useForm } from "react-hook-form";

const ReportOptions = ({ getDanger, setShowSvg }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      typeOfReport: [],
      departmentIssues: [],
      employeeParticipation: [],
      externalParties: [],
      reputationRisks: [],
      legalRisks: [],
      proofs: [],
      all: [],
    },
  });

  const onSubmit = (data) => {
    getDanger(watch("all").length / 19);
    setShowSvg(false);
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
                name="all"
                label="اشكال الفساد او الرشوة او الاحتيال او التزوير او الاختلاس او سوء استخدام الصلاحية والسلطة او غش الاموال او تمويل الارهاب"
              />
              <ReportOptionType
                control={control}
                name="all"
                label=" عدم الالتزام بالقواعد واللوائح والتعليمات"
              />
              <ReportOptionType
                control={control}
                name="all"
                label="مخالفة لسياسة واجراءات الشركة والانظمة والتعليمات ومدونة قواعد السلوك "
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
                name="all"
                label="مجلس الادارة - الادارة التنفيذية - قطاع الالتزام والمراجعة الداخلية - قطاع المخاطر - قطاع المالية"
              />
              <ReportOptionType
                control={control}
                name="all"
                label="قطاع الخدمات المشتركة - قطاع العمليات - قطاع تقنية المعلومات"
              />
              <ReportOptionType
                control={control}
                name="all"
                label="اقسام اخرى"
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
                name="all"
                label="رئيس او اعضاء مجلس ادارة - الرئيس التنفيذى - نواب الرئيس التنفيذى - مدير عام"
              />
              <ReportOptionType
                control={control}
                name="all"
                label="رئيس قسم - مدير - مشرف"
              />
              <ReportOptionType
                control={control}
                name="all"
                label="مستويات اخرى او اقل او متعاقدين"
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
                name="all"
                label="طرف ثالث - اصحاب النفوذ - الاشخاص المعرفين سياسيا"
              />
              <ReportOptionType
                control={control}
                name="all"
                label="شركة اقليمية - شركة تامين تعمل داخل المملكة العربية السعودية - عضو مجلس ادارة يعمل فى شركة مرموقة داخل المملكة العربية السعودية"
              />
              <ReportOptionType
                control={control}
                name="all"
                label="اشخاص عاديون او مدير عام او مدير فى شركة تعمل خارج المملكة العربية السعودية"
              />
            </div>
          </div>
          <div>
            <div className="bg-[#33835C1A] text-[#1E1E1E] font-bold p-4 rounded-md">
              {" "}
              مخاطر السمعة{" "}
            </div>
            <div className="flex flex-col mt-4 gap-2">
              <ReportOptionType
                control={control}
                name="all"
                label="   قد یؤدي الحدث إلى تحقيق من الجهات الرقابية أو عقوبات أو غرامات
"
              />
              <ReportOptionType
                control={control}
                name="all"
                label="قد یؤدي الحدث تأثير على العلاقة مع شركات التأمین  "
              />
              <ReportOptionType
                control={control}
                name="all"
                label=" قد یؤدي الحدث تأثير ضئیل على سمعة الشركة"
              />
            </div>
          </div>
          <div>
            <div className="bg-[#33835C1A] text-[#1E1E1E] font-bold p-4 rounded-md">
              {" "}
              العواقب القانونیة{" "}
            </div>
            <div className="flex flex-col mt-4 gap-2">
              <ReportOptionType
                control={control}
                name="all"
                label="قد یؤدي الحدث إلى دعاوى جماعية و جنائية ضد الشركة"
              />
              <ReportOptionType
                control={control}
                name="all"
                label="الحدث من شأنه أن یؤدي إلى غرامات أو عقوبات، او دعاوي جنائیة ضد الإدارات التشغيلية او شكوى الى هيئة التأمين"
              />
              <ReportOptionType
                control={control}
                name="all"
                label="الحدث من شأنھ أن یؤدي إلى دعوى مدنیة، والحرمان من العمل             "
              />
            </div>
          </div>
          <div>
            <div className="bg-[#33835C1A] text-[#1E1E1E] font-bold p-4 rounded-md">
              {" "}
              وجود دلیل مرفق بالبلاغ من قبل المبلغ ( دليل قد يتم إتلافه){" "}
            </div>
            <div className="flex flex-col mt-4 gap-2">
              <ReportOptionType control={control} name="all" label="نعم" />
              {/* <ReportOptionType
                control={control}
                name="externalParties"
                label=" لا"
              /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-3 pt-0 flex items-center justify-end">
        <button className=" bg-[#33835C] text-white p-1 px-10 rounded-lg">
          تاكيد
        </button>
      </div>
    </form>
  );
};

export default ReportOptions;
