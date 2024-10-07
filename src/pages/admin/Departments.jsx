/* eslint-disable no-unused-vars */

import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useApi from "../../utils/useApi";

/* eslint-disable react/prop-types */
const Departments = ({ currentView, setCurrentView }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "all",
    defaultValues: {
      name_en: "",
    },
  });

  const { postData } = useApi();

  const mutation = useMutation(postData, {
    onSuccess: () => {
      setCurrentView("success");
    },
    onError: (err) => {},
  });

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    mutation.mutate([
      `/admin/departments`,
      { ...data, name_ar: watch("name_en") },
    ]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 h-36 justify-between">
        <div className="flex flex-col gap-2 md:w-[40%] w-full h-fit">
          <label className="font-medium">اسم الادارة</label>
          <input
            type="text"
            className={`border ${
              errors.name_en ? "border-red-500" : "border-gray-300"
            } p-1 rounded-md outline-none flex-1 w-full`}
            placeholder="وحدة مكافحة المخدرات بالافلاج"
            {...control.register("name_en", {
              required: "اسم الادارة مطلوب",
            })}
          />
          {errors.name_en && (
            <span className="text-red-500">{errors.name_en.message}</span>
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

export default Departments;
