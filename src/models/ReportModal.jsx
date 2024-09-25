/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { forwardRef, useRef } from "react";
import Model from "./Model";
import { Radio } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useApi from "../utils/useApi";
import { useParams } from "react-router-dom";

function Ch() {
  const { control, handleSubmit, register, watch, setValue } = useForm({
    defaultValues: {
      image: "",
      reason: "",
      status: "accepted",
      action: "receive_report",
      _method: "put",
    },
  });

  const { id } = useParams();

  const { postData } = useApi();

  const mutation = useMutation({
    mutationFn: postData,

    onSuccess: () => {
      console.log("success");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate([`/reports/${id}`, data]);
  };

  if (watch("status") == "accepted") {
    setValue("reason", "");
  }

  return (
    <form
      className="px-5 py-3 flex flex-col gap-4 pt-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Radio.Group
              {...field}
              name="radiogroup"
              defaultValue={field.value}
              className=" custom-radio font-medium"
            >
              <Radio value={"accepted"}>قبول البلاغ</Radio>
              <Radio value={"rejected"}>رفض البلاغ</Radio>
            </Radio.Group>
          )}
        />
      </div>
      <div>
        <label htmlFor="textarea" className="font-medium text-[15px]">
          يرجى كتابة سبب الرفض
        </label>

        <textarea
          id="textarea"
          className="my-2 border border-gray-300 p-2 rounded-md w-full resize-none h-24 outline-none placeholder:text-sm"
          placeholder="اكتب هنا"
          name="reason"
          {...register("reason")}
          disabled={watch("status") === "accepted"}
        ></textarea>
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
}

// const ch = (
//   <form className="px-5 py-3 flex flex-col gap-4 pt-6">
//     <div>
//       <Radio.Group
//         name="radiogroup"
//         defaultValue={1}
//         className=" custom-radio font-medium"
//       >
//         <Radio value={1}>قبول البلاغ</Radio>
//         <Radio value={2}>رفض البلاغ</Radio>
//       </Radio.Group>
//     </div>
//     <div>
//       <label htmlFor="textarea" className="font-medium text-[15px]">
//         يرجى كتابة سبب الرفض
//       </label>
//       <textarea
//         id="textarea"
//         className="my-2 border border-gray-300 p-2 rounded-md w-full resize-none h-24 outline-none placeholder:text-sm"
//         placeholder="اكتب هنا"
//       ></textarea>
//     </div>
//   </form>
// );

const ReportModal = ({
  setShowMenu = () => {},
  setShowSvg = () => {},
  children = <Ch />,
  ...props
} = {}) => {
  console.log(props);
  // const ref = useRef();
  return (
    <>
      <div className="flex flex-col !fixed rounded-lg w-[85%] md:w-1/2 h-fit  max-h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white overflow-auto">
        <div className="bg-[#33835C] w-full flex justify-between items-center px-5 py-3">
          <div>
            <h2 className="text-white text-lg font-semibold self-center">
              {props?.title || "العنوان :"}
            </h2>
          </div>
          <span
            className="text-[28px] leading-[0] self-center font-medium text-white cursor-pointer"
            onClick={() => {
              setShowMenu(false);
              setShowSvg(false);
            }}
          >
            &times;
          </span>
        </div>
        {children}
      </div>
    </>
  );
};

export default ReportModal;
