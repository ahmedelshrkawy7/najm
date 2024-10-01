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
      reputationRisks: [],
      legalRisks: [],
      proofs: [],
    },
  });

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ formattedData:", data);
  };

  return (
    < >
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
                label="اشكال الفساد او الرشوة او الاحتيال او التزوير او الاختلاس او سوء استخدام الصلاحية والسلطة او غش الاموال او تمويل الارهاب"
              />
              <ReportOptionType
                control={control}
                name="typeOfReport"
                label=" عدم الالتزام بالقواعد واللوائح والتعليمات"
              />
              <ReportOptionType
                control={control}
                name="typeOfReport"
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
                name="departmentIssues"
                label="مجلس الادارة - الادارة التنفيذية - قطاع الالتزام والمراجعة الداخلية - قطاع المخاطر - قطاع المالية"
              />
              <ReportOptionType
                control={control}
                name="departmentIssues"
                label="قطاع الخدمات المشتركة - قطاع العمليات - قطاع تقنية المعلومات"
              />
              <ReportOptionType
                control={control}
                name="departmentIssues"
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
                name="employeeParticipation"
                label="رئيس او اعضاء مجلس ادارة - الرئيس التنفيذى - نواب الرئيس التنفيذى - مدير عام"
              />
              <ReportOptionType
                control={control}
                name="employeeParticipation"
                label="رئيس قسم - مدير - مشرف"
              />
              <ReportOptionType
                control={control}
                name="employeeParticipation"
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
                name="externalParties"
                label="طرف ثالث - اصحاب النفوذ - الاشخاص المعرفين سياسيا"
              />
              <ReportOptionType
                control={control}
                name="externalParties"
                label="شركة اقليمية - شركة تامين تعمل داخل المملكة العربية السعودية - عضو مجلس ادارة يعمل فى شركة مرموقة داخل المملكة العربية السعودية"
              />
              <ReportOptionType
                control={control}
                name="externalParties"
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
                name="reputationRisks"
                label="   قد یؤدي الحدث إلى تحقيق من الجهات الرقابية أو عقوبات أو غرامات
"
              />
              <ReportOptionType
                control={control}
                name="reputationRisks"
                label="قد یؤدي الحدث تأثير على العلاقة مع شركات التأمین  "
              />
              <ReportOptionType
                control={control}
                name="reputationRisks"
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
                name="legalRisks"
                label="قد یؤدي الحدث إلى دعاوى جماعية و جنائية ضد الشركة"
              />
              <ReportOptionType
                control={control}
                name="legalRisks"
                label="الحدث من شأنه أن یؤدي إلى غرامات أو عقوبات، او دعاوي جنائیة ضد الإدارات التشغيلية او شكوى الى هيئة التأمين"
              />
              <ReportOptionType
                control={control}
                name="legalRisks"
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
              <ReportOptionType control={control} name="proofs" label="نعم" />
              <ReportOptionType control={control} name="proofs" label=" لا" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 py-3 pt-0 flex items-center justify-end">
        <button
          type="submit"
          className=" bg-[#33835C] text-white p-1 px-10 rounded-lg"
        >
          تاكيد
        </button>
      </div>
    </>
  );
};

export default ReportOptions;
