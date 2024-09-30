/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { forwardRef, useRef, useState } from "react";
import Model from "./Model";
import { Radio } from "antd";
import SuccessModal from "./successModal";

// const ch = (
//   <div className="px-5 py-3 flex flex-col gap-4 pt-6">
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
//   </div>
// );

const ReportModal = ({
  setShowMenu = () => {},
  setShowSvg = () => {},
  children = (
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
  ),
  ...props
} = {}) => {
  console.log(props);
  // const ref = useRef();
  const [radioValue, setRadioValue] = useState("");
  const [reason, setReason] = useState("");
  const [currentView, setCurrentView] = useState("default");

  return (
    <>
      <div className="flex flex-col !fixed rounded-lg w-[85%] md:w-1/2 h-fit  max-h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white overflow-auto">
        <div className="bg-[#33835C] w-full flex justify-between items-center px-5 py-3">
          {(currentView === "default" && (
            <>
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
            </>
          )) ||
            ""}
        </div>
        {currentView === "success" || currentView === "edit" ? (
          <SuccessModal
            setShowSvg={setShowSvg}
            close={true}
            title={"تم انشاء الدراسة بنجاح"}
          />
        ) : (
          children
        )}{" "}
        {/* <div className="px-5 py-3 pt-0 flex items-center justify-end">
          <button
            className=" bg-[#33835C] text-white p-1 px-10 rounded-lg"
            onClick={() => {
              setCurrentView("success");
            }}
          >
            تاكيد
          </button>
        </div> */}
      </div>
    </>
  );
};

export default ReportModal;
