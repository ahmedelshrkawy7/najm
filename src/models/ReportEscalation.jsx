import UsableReport from "./UsableReport";

const ReportEscalation = () => {
  return (
    <div className="px-5 py-3 flex flex-col gap-2">
      <UsableReport selectTitle={"سبب التصعيد"} textAreaLabel={"الملاحظات"} />
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
