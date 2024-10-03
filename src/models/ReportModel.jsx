/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { forwardRef, useEffect, useRef, useState } from "react";
import Model from "./Model";
import { Radio } from "antd";
import SuccessModel from "./SuccessModel";

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

// const collectAllPropsFromChildren = (children) => {
//   const propsList = [];

//   const collectProps = (child) => {
//     if (React.isValidElement(child)) {
// Collect props of the current child
//       propsList.push(child.props);

// Recursively collect props from children of this child
//       if (child.props.children) {
//         React.Children.forEach(child.props.children, collectProps);
//       }
//     }
//   };

//   React.Children.forEach(children, collectProps);

//   return propsList;
// };

const ReportModel = forwardRef(
  ({ children = defaultCh, ...props } = {}, ref) => {
    // const [currentView, setCurrentView] = useState("default");
    let innerRef = useRef();

    // let ref = useRef();
    // React.Children.forEach(children, (child) => {
    //   if (React.isValidElement(child)) {
    // Access child props
    // console.log("Child props:", child.props.children);
    //      const _props = child.props;
    //      console.log("Name Prop:", _props);
    //   }
    // });
    // const allProps = collectAllPropsFromChildren(children);
    // console.log("All Props:", allProps[1]);
    return (
      <Model
        ref={ref}
        currentView={props.currentView}
        setCurrentView={props.setCurrentView}
        innerRef={innerRef}
      >
        <div
          ref={innerRef}
          className="flex flex-col !fixed rounded-lg w-[85%] sm:w-3/4 lg:w-1/2  max-h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white overflow-auto"
        >
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
                  onClick={
                    () => ref?.current.close()
                    // document.documentElement.style.overflow = "";
                  }
                >
                  &times;
                </span>
              </>
            )) ||
              ""}
          </div>
          {props?.currentView === "success" || props?.currentView === "edit" ? (
            <SuccessModel title={props.title} />
          ) : (
            children
          )}

          {/* {currentView === "default" && (
            <div className="px-5 py-3 pt-0 flex items-center justify-end">
              <button
                onClick={() => {
                  if (props.msg === "اضافة") {
                    setCurrentView("success");
                  } else if (typeof props.msg === "object") {
                    setCurrentView("edit");
                  } else {
                    setCurrentView("default");
                  }
                }}
                className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
              >
                {props.msg || "تاكيد"}
              </button>
            </div>
          )} */}
        </div>
      </Model>
    );
  }
);

export default ReportModel;
