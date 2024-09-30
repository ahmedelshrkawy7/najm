/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import PreparingStudy from "../../component/PreparingStudy";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import StudyPreview from "../../component/StudyPreview";
import { useLocation } from "react-router-dom";
import StudyContext from "../../store/StudyContext";

const Study = () => {
  const location = useLocation();
  console.log("🚀 ~ Study ~ location:", location)
  const { handleHideMenu, showMenu } = useContext(StudyContext);
  const [loc, setLoc] = useState(location?.state?.index);
  console.log(showMenu);
  useEffect(() => {
    if (showMenu) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [showMenu]);

  console.log(location.state?.closeModal, showMenu);

  return (
    <div className="bg-[#E6E6E6]">
      <div className=" w-[90%]  py-20   mx-auto ">
        <div className="bg-white rounded-md">
          <div className="rounded-t-md overflow-hidden">
            <ReportsHeader
              title={loc === 2 ? "الدراسة الاولية" : "معاينة الدراسة الاولية"}
            />
          </div>
        </div>
        <div>
          {loc === 2 && <PreparingStudy />}
          {loc === 3 && <StudyPreview />}
        </div>
        <div className="py-5  w-[100%]   text-left">
          {loc === 2 && (
            <button
              onClick={() => setLoc(3)}
              className={`bg-[#33835C] p-2 rounded-md text-white`}
            >
              {" "}
              {"معاينة الدراسة الاولية"}
            </button>
          )}
          {loc === 3 && (
            <button
              onClick={() => setLoc(2)}
              className={`bg-[#33835C] !bg-transparent !text-[#33835C] border-2 border-[#33835C] font-bold p-2 rounded-md `}
            >
              {" "}
              {"رجوع"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Study;
