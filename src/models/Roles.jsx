/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import useApi from "../utils/useApi";
import { useForm } from "react-hook-form";
import { errorNotf } from "../utils/notifications/Toast";

const Roles = ({ currentView, setCurrentView, closeModal }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name: "",
    },
  });

  const queryClient = useQueryClient();
  const { postData } = useApi();

  const mutation = useMutation(postData, {
    onSuccess: () => {
      reset();
      setCurrentView("success");
      queryClient.invalidateQueries(["admin", ["/admin/roles", ""]]);
    },
    onError: (err) => {
      closeModal();
      errorNotf("تم انشاء الصلاحية مسبقا");
    },
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    mutation.mutate([`/admin/roles`, data]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 h-36 justify-between">
        <div className="flex flex-col gap-2 md:w-[40%] w-full h-fit">
          <label className="font-medium">اسم الصلاحية</label>
          <input
            type="text"
            className={`border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } p-1 rounded-md outline-none flex-1 w-full`}
            placeholder="مدقق البلاغات"
            {...control.register("name", {
              required: "اسم الصلاحية مطلوب",
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}
        </div>{" "}
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
export default Roles;
