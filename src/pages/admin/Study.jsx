import React, { useState } from "react";
import PreparingStudy from "../../component/PreparingStudy";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import StudyPreview from "../../component/StudyPreview";

const Study = () => {
  const [showStudyPreview, setShowStudeyPreview] = useState(false);
  return (
    <div className="bg-[#E6E6E6]">
      <div className=" w-[90%]  py-20   mx-auto ">
        <div className="bg-white rounded-md">
          <div className="rounded-t-md overflow-hidden">
            <ReportsHeader title="الدراسة الاولية" />
          </div>
        </div>
        <div>
          {!showStudyPreview && <PreparingStudy />}
          {showStudyPreview && <StudyPreview />}
        </div>
        <div className="py-5  w-[100%]   text-left">
          <button
            onClick={() => setShowStudeyPreview(!showStudyPreview)}
            className={`bg-[#33835C] ${
              showStudyPreview &&
              "!bg-transparent !text-[#33835C] border-2 border-[#33835C] font-bold"
            } p-2 rounded-md text-white`}
          >
            {" "}
            {showStudyPreview ? "رجوع" : "معاينة الدراسة الاولية"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Study;
