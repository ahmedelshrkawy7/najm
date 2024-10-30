const DepartmentActions = () => {
  return (
    <div className="w-full mx-auto my-6 p-4 px-0">
      <div className="space-y-6 bg-red-100/65 p-4 rounded-lg">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
              style={{ backgroundColor: "#33835c" }}
            >
              <FileTextOutlined />
            </div>
            <label className="font-semibold text-sm">تصنيف البلاغ:</label>
            <span className="text-sm">{notes?.category_notes}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
              style={{ backgroundColor: "#33835c" }}
            >
              <WarningOutlined />
            </div>
            <label className="font-semibold text-sm">نوع البلاغ:</label>
            <span className="text-sm">{notes?.risk_type_note}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
              style={{ backgroundColor: "#33835c" }}
            >
              <WarningOutlined />
            </div>
            <label className="font-semibold text-sm">تقييم مخاطر البلاغ:</label>
            <span className="text-sm">{notes?.risk_assessment_note}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
              style={{ backgroundColor: "#33835c" }}
            >
              <TeamOutlined />
            </div>
            <label className="font-semibold text-sm">
              الإدارة المعنية بدراسة البلاغ:
            </label>
            <span className="text-sm">{notes?.department_note}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs flex-wrap"
              style={{ backgroundColor: "#33835c" }}
            >
              <EditOutlined />
            </div>
            <label className="font-semibold text-sm">
              نتائج الدراسة الأولية للبلاغ:
            </label>
            <span className="text-sm">{notes?.primary_study_note}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentActions;
