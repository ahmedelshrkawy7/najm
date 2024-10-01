/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import PreparingStudy from "../../component/PreparingStudy";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import StudyPreview from "../../component/StudyPreview";
import { useLocation, useParams } from "react-router-dom";
import StudyContext from "../../store/StudyContext";
import { useMutation, useQueryClient } from "react-query";
import useApi from "../../utils/useApi";
import { useForm } from "react-hook-form";
import SuccessModal from "../../models/successModal";
import { errorNotf, successNotf } from "../../utils/notifications/Toast";

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
  console.log("🚀 ~ Study ~ queryClient:", queryClient);

  const queryData = queryClient.getQueryData(["users", ["/reports"], id]);
  // const {
  //   data: { report },
  // } = queryClient.getQueryData(["users", ["/reports"], id]);
  const report = queryData?.data?.report || {};

  console.log("🚀 ~ Study ~ report:", report);
  const methods = useForm({
    mode: "all",
    defaultValues: {
      description: report.description,
      address: report.address,
      date: "",
      suspects: report.suspects || [],

      processing_time: report.processing_time,
      files: "",
      risk_type: report.risk_type,
      risk_assessment: report.risk_assessment,
      result: report.result,
      _method: "PUT",
      action: "prepare_initial_study",
    },
  });

  const mutation = useMutation(postData, {
    onSuccess: () => {
      // Invalidate and refetch
      // queryClient.invalidateQueries("todos");
      // setLoc(3);
      successNotf("تم اعداد الدراسة الاولية بنجاج");
      setLoc(3);
    },
    onError: () => {
      errorNotf("error");
    },
  });
  console.log("🚀 ~ Study ~ methods:", methods.formState.errors);
  console.log("🚀 ~ Study ~ values:", methods.values);

  const onSubmit = (val) => {
    mutation.mutate([`/reports/${id}`, val]);
    // setLoc(3);
  };

  return (
    <div className="bg-[#E6E6E6]">
      <form
        className=" w-[90%]  py-20   mx-auto "
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="bg-white rounded-md">
          <div className="rounded-t-md overflow-hidden">
            <ReportsHeader
              title={loc === 2 ? "الدراسة الاولية" : "معاينة الدراسة الاولية"}
            />
          </div>
        </div>
        <div>
          {loc === 2 && <PreparingStudy {...methods} />}
          {loc === 3 && <StudyPreview />}
        </div>
        <div className="py-5  w-[100%]   text-left">
          {loc === 2 && (
            <button
              type="submit"
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
      </form>
    </div>
  );
};

export default Study;
