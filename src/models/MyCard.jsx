/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useMutation, useQuery, useQueryClient } from "react-query";
import useApi from "../utils/useApi";
import { useForm } from "react-hook-form";
import { errorNotf } from "../utils/notifications/Toast";
import { useEffect } from "react";

const MyCard = ({ name, currentView, setCurrentView, closeModal }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      department_id: "",
      // name_ar: "",
      name_en: "",
    },
  });

  const queryClient = useQueryClient();
  const { getData, postData } = useApi();

  const { data: { data = [] } = {}, refetch } = useQuery(
    ["admin", ["/departments", ""]],
    getData
  );

  const mutation = useMutation(postData, {
    onSuccess: () => {
      reset();
      setCurrentView("success");
      queryClient.invalidateQueries(["admin", ["/admin/departments", ""]]);
      queryClient.invalidateQueries(["admin", ["/admin/specializations", ""]]);
    },
    onError: (err) => {
      reset();
      closeModal();
      errorNotf("تم انشاء هذا القسم مسبقا");
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    mutation.mutate([
      `/admin/specializations`,
      { ...data, name_en: watch("name_ar") },
    ]);
  };

  useEffect(() => {
    refetch();
  }, [refetch, data]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-4 flex-wrap h-40 mb-6">
          <div className="flex flex-col gap-2 md:w-[40%] w-full h-fit">
            <label className="font-medium">اسم القسم</label>
            <input
              type="text"
              className={`border ${
                errors.name_ar ? "border-red-500" : "border-gray-300"
              } p-1 rounded-md outline-none flex-1 w-full`}
              placeholder="وحدة مكافحة المخدرات بالافلاج"
              {...control.register("name_ar", {
                required: "اسم القسم مطلوب",
              })}
            />
            {errors.name_ar && (
              <span className="text-red-500">{errors.name_ar.message}</span>
            )}
          </div>
          <div className="md:w-[40%] w-full">
            <label
              htmlFor="select"
              className="mb-2 text-[15px] font-medium inline-block"
            >
              اختر الادارة
            </label>
            <select
              id="select"
              className={`rounded-md w-full flex items-center p-1 h-[34px] border ${
                errors.department_id ? "border-red-500" : "border-gray-300"
              } text-gray-400 outline-none`}
              defaultValue=""
              {...control.register("department_id", {
                required: "يجب اختيار إدارة",
              })}
            >
              <option value="" disabled hidden>
                اختر الإدارة
              </option>
              {data.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name_ar}
                </option>
              ))}
            </select>
            {errors.department_id && (
              <span className="text-red-500">
                {errors.department_id.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end mt-4 sm:mt-0">
          <button
            type="submit"
            className="bg-[#33835C] text-white p-2 px-10 rounded-lg"
          >
            اضافة
          </button>
        </div>
      </form>
    </>
  );
};

export default MyCard;
