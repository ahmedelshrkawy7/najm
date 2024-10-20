/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useForm, Controller } from "react-hook-form";
import { Radio, Input, Select } from "antd";
import "tailwindcss/tailwind.css"; // Ensure Tailwind is imported into your project
import useApi from "../utils/useApi";
import { useMutation, useQuery } from "react-query";
import { errorNotf } from "../utils/notifications/Toast";
import { useEffect } from "react";
import { Option } from "antd/es/mentions";

const RiskTypes = ({ currentView, setCurrentView, refetch }) => {
  const { getData, postData } = useApi();

  const { data: { data: weights = [] } = {} } = useQuery(
    ["admin", ["/admin/report-weights", ""]],
    getData
  );

  const { data: { data: risk_types = [] } = {} } = useQuery(
    ["admin", ["/admin/main-risks", ""]],
    getData
  );

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    clearErrors,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      risk_type: "1",
      report_weight_id: "",
      parent_id: "",
      subRisk: "",
      num_of_days: 21,
      name: "",
    },
  });

  const riskType = watch("risk_type");

  // useEffect(() => {
  //   if (riskType === "1") {
  //     clearErrors(["report_weight_id", "parent_id", "num_of_days"]);
  //   } else {
  //     clearErrors("name");
  //   }
  // }, [riskType, clearErrors]);

  const mutation = useMutation(postData, {
    onSuccess: () => {
      setCurrentView("success");
      reset();
      refetch();
    },
    onError: (err) => {
      errorNotf("خطا اضافة نوع خطر");
    },
  });

  const onSubmit = (data) => {
    if (riskType === "1") {
      mutation.mutate([
        `admin/risk-types`,
        { risk_type: watch("risk_type"), name: watch("name") },
      ]);
    } else {
      mutation.mutate([`admin/risk-types`, data]);
    }
  };

  return (
    <div className="max-w-full mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-6"
      >
        <div className="form-group flex gap-3">
          <label className="block text-gray-700 font-bold mb-2">
            نوع المخاطر:
          </label>
          <Controller
            control={control}
            name="risk_type"
            render={({ field }) => (
              <Radio.Group
                {...field}
                defaultValue={field.value}
                className="space-x-4 custom-radio"
              >
                <Radio value="1">رئيسي</Radio>
                <Radio value="0">فرعي</Radio>
              </Radio.Group>
            )}
          />
          {errors.risk_type && (
            <p className="text-red-500 text-sm mt-1">
              {errors.risk_type.message}
            </p>
          )}
        </div>

        {riskType === "1" ? (
          <div className="w-full md:w-[45%]">
            <label className="block mb-3 font-bold">اسم الخطر الرئيسي</label>
            <Controller
              name="name"
              control={control}
              rules={{ required: "يرجى إدخال الخطر الرئيسي." }}
              render={({ field }) => (
                <Input
                  placeholder="اسم الخطر الرئيسي"
                  {...field}
                  className="h-[34px] w-full"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group relative mb-2">
                <label className="block text-gray-700 font-bold mb-2">
                  وزن البلاغ:
                </label>
                <Controller
                  control={control}
                  name="report_weight_id"
                  rules={{ required: "وزن البلاغ مطلوب" }}
                  render={({ field }) => (
                    // <select
                    //   {...field}
                    //   className="w-full p-2 border border-gray-300 rounded-md"
                    // >
                    //   <option value="" disabled hidden>
                    //     اختر وزن البلاغ
                    //   </option>
                    //   {weights.map((weight) => (
                    //     <option key={weight.id} value={weight.id}>
                    //       {weight.weight}
                    //     </option>
                    //   ))}
                    // </select>
                    <Select
                      {...field}
                      className={`rounded-md w-full flex items-center h-[34px] border${
                        errors.report_weight_id
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="اختر الإدارة"
                      onChange={(value) => field.onChange(value)}
                    >
                      <Option value="" disabled>
                        اختر
                      </Option>
                      {weights.map((weight) => (
                        <Option key={weight.id} value={weight.id}>
                          {weight.weight}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                {errors.report_weight_id && (
                  <p className="text-red-500 text-sm mt-1 absolute">
                    {errors.report_weight_id.message}
                  </p>
                )}
              </div>

              <div className="form-group relative mb-2">
                <label className="block text-gray-700 font-bold mb-2">
                  اسم الخطر الرئيسي:
                </label>
                <Controller
                  control={control}
                  name="parent_id"
                  rules={{ required: "اسم الخطر الرئيسي مطلوب" }}
                  render={({ field }) => (
                    // <select
                    //   {...field}
                    //   className="w-full p-2 border border-gray-300 rounded-md"
                    // >
                    //   <option value="" disabled hidden>
                    // اختر اسم الخطر
                    //   </option>
                    //   {risk_types.map((risk) => (
                    //     <option key={risk.id} value={risk.id}>
                    //       {risk.name}
                    //     </option>
                    //   ))}
                    // </select>
                    <Select
                      {...field}
                      className={`rounded-md w-full flex items-center h-[34px] border${
                        errors.report_weight_id
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="اختر الإدارة"
                      onChange={(value) => field.onChange(value)}
                    >
                      <Option value="" disabled>
                        اختر اسم الخطر
                      </Option>
                      {risk_types.map((risk) => (
                        <Option key={risk.id} value={risk.id}>
                          {risk.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                {errors.parent_id && (
                  <p className="text-red-500 text-sm mt-1 absolute">
                    {errors.parent_id.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group relative">
                <label className="block text-gray-700 font-bold mb-2">
                  اسم الخطر الفرعي:
                </label>
                <Controller
                  control={control}
                  name="name"
                  rules={{ required: "اسم الخطر الفرعي مطلوب" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="اسم الخطر الفرعي"
                      className="w-full p-2 border border-gray-300 rounded-md h-[34px]"
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 absolute">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="form-group relative">
                <label className="block text-gray-700 font-bold mb-2">
                  عدد الأيام:
                </label>
                <Controller
                  control={control}
                  name="num_of_days"
                  rules={{ required: "عدد الأيام مطلوب" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md h-[34px]"
                    />
                  )}
                />
                {errors.num_of_days && (
                  <p className="text-red-500 text-sm mt-1 absolute">
                    {errors.num_of_days.message}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        <div className="text-left">
          <button
            type="submit"
            className="bg-[#33835C] text-white py-2 px-10 rounded-lg outline-none w-full md:w-auto"
          >
            اضافة
          </button>
        </div>
      </form>
    </div>
  );
};

export default RiskTypes;
