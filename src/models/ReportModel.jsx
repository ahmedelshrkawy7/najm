/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { forwardRef } from "react";
import Model from "./Model";
import { Radio } from "antd";

const ch = (
  <div className="px-5 py-3 flex flex-col gap-4 pt-6">
    <div>
      <Radio.Group
        name="radiogroup"
        defaultValue={1}
        className=" custom-radio font-medium"
      >
        <Radio value={1}>قبول البلاغ</Radio>
        <Radio value={2}>رفض البلاغ</Radio>
      </Radio.Group>
    </div>
    <div>
      <label htmlFor="textarea" className="font-medium text-[15px]">
        يرجى كتابة سبب الرفض
      </label>
      <textarea
        id="textarea"
        className="my-2 border border-gray-300 p-2 rounded-md w-full resize-none h-24 outline-none placeholder:text-sm"
        placeholder="اكتب هنا"
      ></textarea>
    </div>
  </div>
);

const ReportModel = forwardRef(({ children = ch, ...props } = {}, ref) => {
  // let ref = useRef();
  return (
    <Model ref={ref}>
      <div className="flex flex-col !fixed rounded-lg w-[85%] md:w-1/2 h-fit max-h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white overflow-auto">
        <div className="bg-[#33835C] w-full flex justify-between items-center px-5 py-3">
          <div>
            <h2 className="text-white text-lg font-semibold self-center">
              {props?.title || "العنوان :"}
            </h2>
          </div>
          <span
            className="text-[28px] leading-[0] self-center font-medium text-white cursor-pointer"
            onClick={() => ref?.current.close()}
          >
            &times;
          </span>
        </div>
        {children}
        <div className="px-5 py-3 pt-0 flex items-center justify-end">
          <button className=" bg-[#33835C] text-white p-1 px-10 rounded-lg ">
            تاكيد
          </button>
        </div>
      </div>
    </Model>
  );
});

export default ReportModel;
