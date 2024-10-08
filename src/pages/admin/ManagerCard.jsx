/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import React, { memo, useRef, useState } from "react";
import ReportModel from "../../models/ReportModel";
import { useNavigate } from "react-router-dom";
// import { columns, data } from "./data";

const ManagerCard = ({
  icon,
  title,
  buttons,
  index,
  ch,
  currentView,
  setCurrentView,
  data,
  columns: cl,
  apiKey,
}) => {
  // console.log(data, cl);
  let ref = useRef(null);
  const navigate = useNavigate();
  const [modelState, setModelState] = useState("");

  let handleClick = (button, btnIndex) => {
    if (btnIndex === 1) {
      // document.documentElement.style.overflow = "hidden";
      setModelState(button);
      ref.current?.open();
    } else {
      navigate("/depts", {
        state: {
          data: data,
          columns: cl,
          apiKey,
        },
      });
    }
  };

  //   const enhancedChildren = React.Children.map(ch, (child) =>
  //     React.isValidElement(child)
  //       ? React.cloneElement(child) // Modify props here if needed
  //       : child
  //   );

  return (
    <>
      <ReportModel
        ref={ref}
        title={modelState}
        // msg={"اضافة"}
        currentView={currentView}
        setCurrentView={setCurrentView}
      >
        <div className="px-5 py-3">
          {React.cloneElement(ch, { closeModal: () => ref.current?.close() })}
        </div>
      </ReportModel>
      <div className="rounded-lg shadow  flex flex-col items-center overflow-hidden">
        <div className="bg-white w-full text-center py-2">
          <div className="mx-auto mt-2 w-14 h-14 rounded-full bg-[#EBF3EF] flex items-center justify-center">
            <img className="w-fit h-fit" src={icon} alt="" />
          </div>
          <h2 className="text-md font-semibold my-2">{title}</h2>
        </div>
        <div className="w-full p-0 bg-[#EBF3EF]">
          <div className="flex gap-4 p-4 justify-center">
            {buttons.map((button, btnIndex) => (
              <button
                onClick={() => handleClick(button, btnIndex)}
                key={button}
                className="bg-[#33835C] text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 text-sm outline-none relative"
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ManagerCard);
