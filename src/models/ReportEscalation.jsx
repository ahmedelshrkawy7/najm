import { useForm } from "react-hook-form";
import UsableReport from "./UsableReport";

const ReportEscalation = () => {
  const {
    control,
    formState: { errors },
  } = useForm();
  return (
    <div className="px-5 py-3 flex flex-col gap-2">
      <UsableReport
        selectTitle={"سبب التصعيد"}
        textAreaLabel={"الملاحظات"}
        control={control}
        data={[]}
        name=""
        title={"تصعيد"}
        notes={"notes"}
        files={"files"}
        errors={errors}
      />
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

export default ReportEscalation;
