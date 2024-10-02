/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import PreparingStudy from "../../component/PreparingStudy";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import StudyPreview from "../../component/StudyPreview";
import { useLocation, useParams } from "react-router-dom";
import StudyContext from "../../store/StudyContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useApi from "../../utils/useApi";
import { useForm } from "react-hook-form";

import SuccessModal from "../../models/successModal";

const Study = () => {
  const location = useLocation();
  const { postData } = useApi();
  const { id } = useParams();
  console.log("🚀 ~ Study ~ location:", location);
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
  const queryClient = useQueryClient();
  const { getData } = useApi();

  const change = (x) => {
    setLoc(x);
  };

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

        {loc === 2 && <PreparingStudy change={change} />}
        {loc === 3 && <StudyPreview />}
      </div>
    </div>
  );
};

export default Study;
