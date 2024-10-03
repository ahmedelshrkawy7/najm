/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import PreparingStudy from "../../component/PreparingStudy";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import StudyPreview from "../../component/StudyPreview";
import { useLocation, useParams } from "react-router-dom";
import StudyContext from "../../store/StudyContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useApi from "../../utils/useApi";
import { useForm } from "react-hook-form";

import SuccessModal from "../../models/successModal";
import ReportModal from "../../models/ReportModal";
import ReportModel from "../../models/ReportModel";

const Study = () => {
  const location = useLocation();
  const { postData } = useApi();
  const { id } = useParams();
  let ref = useRef();
  console.log("🚀 ~ Study ~ location:", location);
  const { handleHideMenu, showMenu, handleShowMenu } = useContext(StudyContext);
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
  const queryClient = useQueryClient();
  const { getData } = useApi();

  const change = (x) => {
    setLoc(x);
  };

  return (
    <div className="bg-[#E6E6E6]">
      <div className=" w-[90%]  py-20   mx-auto ">
        {loc === 3 && (
          <button
            onClick={() => ref.current.open()}
            className={
              " bg-[#33835C] font-semibold border  w-fit text-white rounded-md  p-2 mb-4  block mr-auto"
            }
          >
            توجيه الدراسة الاولية
          </button>
        )}
        <div className="bg-white rounded-md">
          <div className="rounded-t-md overflow-hidden">
            <ReportsHeader
              title={loc === 2 ? "الدراسة الاولية" : "معاينة الدراسة الاولية"}
            />
          </div>
        </div>

        {loc === 2 && <PreparingStudy change={change} />}
        {loc === 3 && <StudyPreview />}
      </div>
      {/* {showMenu && loc === 3 && (
        <div
          
          onClick={handleHideMenu}
          className="w-full z-[1] h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.4)]"
        > */}
          <ReportModel title="توجيه الدراسة الاولية" ref={ref} currentView="default">
            <SuccessModal
              title="عند التاكيد سيتم توجيه الدراسة الاولية الى معتمد البلاغات"
              close={"تاكيد"}
            />
            {/* <button
              className="w-fit bg-[#33835C] text-white p-1 px-10 rounded-lg mt-0 m-auto"
              onClick={() => {}}
            >
              تاكيد
            </button> */}
          </ReportModel>
        </div>
      // )}
    // </div>
  );
};

export default Study;
