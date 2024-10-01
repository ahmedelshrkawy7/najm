import { CloudUploadOutlined } from "@ant-design/icons";
import UsableReport from "./UsableReport";

const ReportInfo = () => {
  return (
    <div className="px-5 py-3 flex flex-col gap-2">
      <UsableReport
        selectTitle={"نوع الاجراء"}
        textAreaLabel={"يرجى كتابة سبب الرفض"}
      />
      <div>
        <label
          htmlFor="fileInput"
          className="mb-2 text-[15px] font-medium inline-block"
        >
          ارفاق مستند
        </label>
        <div>
          <label
            className="flex gap-2 justify-center p-2 cursor-pointer bg-[#33835C1A] rounded text-black items-center w-[220px] h-[40px]"
            htmlFor="fileInput"
          >
            <CloudUploadOutlined className="text-[#33835C] text-[20px]" />
            <span className="text-sm">إضافة مرفقات</span>
          </label>
          <input multiple id="fileInput" type="file" className="hidden" />
        </div>
      </div>
      <div className="py-3 pt-0 flex items-center justify-end">
        <button
          type="submit"
          className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
        >
          تاكيد
        </button>
      </div>
    </div>
  );
};

export default ReportInfo;
