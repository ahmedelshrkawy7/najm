import UsableReport from "./UsableReport";

const ReportAssign = () => {
  return (
    <div className="px-5 py-3 flex flex-col gap-2">
      <div className="my-4 mt-1">
        <UsableReport
          selectTitle="اسناد البلاغ للدراسة"
          placeholder={"الادارة..."}
        />
      </div>
      <div className="py-3 pt-0 mt-1 flex items-center justify-end">
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

export default ReportAssign;
