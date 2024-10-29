/* eslint-disable no-unused-vars */
import { useMutation, useQuery } from "react-query";
import useApi from "../utils/useApi";
import UsableReport from "./UsableReport";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { successNotf } from "../utils/notifications/Toast";
import SuccessModal from "./successModal";

const ReportAssign = () => {
  const [currentView, setCurrentView] = useState("default");
  const { postData, getData } = useApi();

  const { data: { data = [] } = {} } = useQuery(
    ["admin", ["/departments", ""]],
    getData
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      _method: "PUT",
      action: "assign_report",
      department_id: "",
    },
  });

  let { id } = useParams();
  const mutation = useMutation(postData, {
    onSuccess: () => {
      setCurrentView("success");
      // successNotf("تم اسناد البلاغ للادارة بنجاح");
    },
    onError: (err) => {
      console.log("🚀 ~ err:", err);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate([`/reports/${id}`, data]);
  };

  return (
    <>
      {currentView === "default" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-5 py-3 flex flex-col gap-2 ">
            <div className="my-4 mt-1">
              <UsableReport
                selectTitle="اسناد البلاغ للدراسة"
                placeholder={"الادارة..."}
                data={data}
                control={control}
                name="department_id"
              />
            </div>
            {errors.department_id && (
              <span className="text-red-500">
                {errors.department_id.message}
              </span>
            )}
            <div className="py-3 pt-0 mt-1 flex items-center justify-end">
              <button
                type="submit"
                className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
              >
                تاكيد
              </button>
            </div>
          </div>
        </form>
      ) : (
        <SuccessModal title={"تم اسناد البلاغ بنجاح"} />
      )}
    </>
  );
};

export default ReportAssign;
