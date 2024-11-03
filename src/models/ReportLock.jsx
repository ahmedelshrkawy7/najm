/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Checkbox } from "antd";
import { useState } from "react";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import useApi from "../utils/useApi";
import { useParams } from "react-router-dom";
import { successNotf } from "../utils/notifications/Toast";

const ReportLock = ({ setShowSvg }) => {
  const [checked, setChecked] = useState(true);

  const onChange = (e) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };
  const label = "اقفال البلاغ";

  const { postData } = useApi();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      _method: "PUT",
      notes: "",
      action: "close_report",
    },
  });
  console.log("🚀 ~ ReportLock ~ errors:", errors);

  let [currentView, setCurrentView] = useState("default");

  const mutation = useMutation(postData, {
    onSuccess: () => {
      setShowSvg(false);
      successNotf("تم اقفال البلاغ بنجاح");
      // setCurrentView("success");
    },
    onError: (err) => {
      console.log("🚀 ~ err:", err);
      // closeModal();
    },
  });

  let { id } = useParams();

  let onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data, id);
    mutation.mutate([`/reports/${id}`, data]);
  };

  return (
    <form
      className="px-5 py-3 flex flex-col gap-2 mt-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="custom-checkbox font-medium">
        <Checkbox checked={checked} onChange={onChange}>
          {label}
        </Checkbox>
      </div>
      <div>
        <label
          htmlFor="notes"
          className="font-medium text-[14px] mt-6 inline-block"
        >
          الملاحظات ونتيجة دراسة البلاغ
        </label>
        <textarea
          {...control.register("notes", {
            required: "هذا الحقل مطلوب",
          })}
          name="notes"
          id="notes"
          className="my-2 border border-gray-300 p-2 rounded-md w-full resize-none h-24 outline-none placeholder:text-sm"
          placeholder="اكتب هنا"
        ></textarea>
        {errors?.notes && (
          <span className="text-red-500">{errors?.notes?.message}</span>
        )}
      </div>
      <div className="py-3 pt-0 flex items-center justify-end">
        <button
          type="submit"
          className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
        >
          تاكيد
        </button>
      </div>
    </form>
  );
};

export default ReportLock;
