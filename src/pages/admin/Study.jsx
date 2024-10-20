/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import PreparingStudy from "../../component/PreparingStudy";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import StudyPreview from "../../component/StudyPreview";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import StudyContext from "../../store/StudyContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useApi from "../../utils/useApi";
import { useForm } from "react-hook-form";

import SuccessModal from "../../models/successModal";
import ReportModal from "../../models/ReportModal";
import ReportModel from "../../models/ReportModel";
import { errorNotf, successNotf } from "../../utils/notifications/Toast";
import TokenContext from "../../store/TokenContext";

const Study = ({ children, title }) => {
  const location = useLocation();
  const { postData } = useApi();
  const { id } = useParams();
  let ref = useRef();
  console.log("🚀 ~ Study ~ location:", location);
  const { handleHideMenu, showMenu, handleShowMenu } = useContext(StudyContext);
  const [loc, setLoc] = useState(location?.state?.index);
  console.log(showMenu);
  const { token } = useContext(TokenContext);
  useEffect(() => {
    if (token.role === "accreditor User") {
      setLoc(3);
    }
  }, []);
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
  let [currentView, setCurrentView] = useState("default");
  let navigate = useNavigate();
  const change = (x) => {
    setLoc(x);
  };
  const mutation = useMutation(postData, {
    onSuccess: () => {
      // change(3);
      successNotf("تم توجية الدراسه الأوليه للمعتمد");
      ref.current.close();
      navigate("/dash", { replace: true });
    },
    onError: (err) => {
      errorNotf(err.response.data.message);
      ref.current.close();

      // setCurrentView("error");
    },
  });
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
              // title={loc === 2 ? "الدراسة الاولية" : "معاينة الدراسة الاولية"}
              title={title}
            />
          </div>
        </div>
        {/* 
        {loc === 2 && <PreparingStudy change={change} />}
        {loc === 3 && <StudyPreview setLoc={setLoc} />} */}
        {children}
      </div>
      {/* {showMenu && loc === 3 && (
        <div
          
          onClick={handleHideMenu}
          className="w-full z-[1] h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.4)]"
        > */}
      <ReportModel
        title="توجيه الدراسة الاولية"
        ref={ref}
        currentView={currentView}
        setCurrentView={setCurrentView}
      >
        <SuccessModal
          title="عند التاكيد سيتم توجيه الدراسة الاولية الى معتمد البلاغات"
          close={"تاكيد"}
          confirm={() => {
            mutation.mutate([
              `/reports/${id}`,
              {
                action: "directing_initial_study",
                _method: "PUT",
              },
            ]);
          }}
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
