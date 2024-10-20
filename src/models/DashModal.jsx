/* eslint-disable react/prop-types */
import { Radio } from "antd";
import SuccessModel from "./SuccessModel";
import { useRef } from "react";

const defaultCh = (
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
    <div className="px-5 py-3 pt-0 flex items-center justify-end">
      <button className=" bg-[#33835C] text-white p-1 px-10 rounded-lg ">
        {"تاكيد"}
      </button>
    </div>
  </div>
);

const DashModal = ({ children = defaultCh, ...props }) => {
  let innerRef = useRef();
  if (!props.isOpen) return null;
  return (
    <div
      onClick={(e) => {
        if (innerRef.current === e.target) {
          e.stopPropagation();
          props.onClose();
          props.setCurrentView("default");
        }
      }}
      ref={innerRef}
      className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="flex flex-col !fixed rounded-lg w-[85%] sm:w-3/4 lg:w-1/2 max-h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white overflow-auto scrollbar scrollbar-w-2 scrollbar-thumb-[#33835c] scrollbar-thumb-rounded-full">
        <div className="bg-[#33835C] w-full flex justify-between items-center px-5 py-3 h-12">
          {(props?.currentView === "default" && (
            <>
              <div>
                <h2 className="text-white text-lg font-semibold self-center">
                  {props?.title || "العنوان :"}
                </h2>
              </div>
              <span
                className="text-[28px] leading-[0] self-center font-medium text-white cursor-pointer"
                onClick={props.onClose}
              >
                &times;
              </span>
            </>
          )) ||
            ""}
        </div>
        <div className="p-5">
          {props?.currentView === "success" || props?.currentView === "edit" ? (
            <SuccessModel />
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );
};

export default DashModal;
