/* eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import useApi from "../../utils/useApi";
import { errorNotf, successNotf } from "../../utils/notifications/Toast";
import { message } from "antd";

/* eslint-disable react/prop-types */
const Departments = ({
  currentView,
  setCurrentView,
  refetch = () => {},
  closeModal,
  type,
  setMessage,
}) => {
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name_en: "",
    },
  });

  const queryClient = useQueryClient();
  const { postData } = useApi();

  const mutation = useMutation(postData, {
    onSuccess: ({ data }) => {
      reset();
      setCurrentView("success");
      setMessage(
        type === "reportType"
          ? `تم انشاء البلاغ (${data?.data?.name}) بنجاح`
          : `تم انشاء الادارة (${data?.data?.name}) بنجاح`
      );
      queryClient.invalidateQueries(["admin", ["/admin/departments", ""]]);
      refetch();
    },
    onError: (err) => {
      console.log("🚀 ~ err:", err);
      closeModal();
      // errorNotf("تم انشاء الادارة مسبقا");
      errorNotf(
        err.response.data.errors.message.replace(/[a-zA-Z0-9()]+/g, "")
      );
    },
  });

  const onSubmit = (data) => {
    if (type === "reportType") {
      mutation.mutate([
        `/admin/report-types`,
        { ...data, name_ar: watch("name_en") },
      ]);
    } else {
      mutation.mutate([
        `/admin/departments`,
        { ...data, name_ar: watch("name_en") },
      ]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 h-36 justify-between">
        <div className="flex flex-col gap-2 md:w-[40%] w-full h-fit">
          <label className="font-medium">
            {type === "reportType" ? "اسم البلاغ" : "اسم الادارة"}
          </label>
          <input
            type="text"
            className={`border ${
              errors.name_en ? "border-red-500" : "border-gray-300"
            } p-1 rounded-md outline-none flex-1 w-full`}
            placeholder={type === "reportType" ? "اسم البلاغ" : "اسم الادارة"}
            {...control.register("name_en", {
              required: "اسم الادارة مطلوب",
            })}
          />
          {errors.name_en && (
            <span className="text-red-500">{errors.name_en.message}</span>
          )}
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={() => {
              // setCurrentView("success");
            }}
            className=" bg-[#33835C] text-white p-2 px-10 rounded-lg outline-none"
          >
            اضافة
          </button>
        </div>
      </div>
    </form>
  );
};

export default Departments;
