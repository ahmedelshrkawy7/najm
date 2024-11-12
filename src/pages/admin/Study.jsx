/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import PreparingStudy from "../../component/PreparingStudy";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import StudyPreview from "../../component/StudyPreview";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import StudyContext from "../../store/StudyContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useApi from "../../utils/useApi";
import { Controller, useForm } from "react-hook-form";

import SuccessModal from "../../models/successModal";
import ReportModal from "../../models/ReportModal";
import ReportModel from "../../models/ReportModel";
import { errorNotf, successNotf } from "../../utils/notifications/Toast";
import TokenContext from "../../store/TokenContext";
import ResubmitModal from "../../models/ResubmitModal";
import { EditOutlined } from "@ant-design/icons";
import ReportMenu from "../../custom hooks/ReportMenu";
import Modal from "../../custom hooks/UI/Modal";
import NotFound from "../../NotFound";

const Study = ({ children, title, role, name }) => {
  let [reSubmit, setReSubmit] = useState(false);
  const location = useLocation();
  const { postData, getData } = useApi();
  const { id } = useParams();
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,

    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      reason: "",
      notes: "",
      action: "resubmit_report_for_review",
      _method: "put",
    },
  });

  const {
    data: { data: { report } = {} } = {},
    refetch,
    isLoading,
  } = useQuery(["admin", ["/reports"], id], getData);

  console.log("🚀 ~ Study ~ report:", report, report?.number);

  let ref = useRef();
  console.log("🚀 ~ Study ~ location:", location);
  const { handleHideMenu, showMenu, handleShowMenu } = useContext(StudyContext);
  const wrapperRef = useRef(null);

  const [showSvg, setShowSvg] = useState(false);
  const [ch, setCh] = useState("");
  const [loc, setLoc] = useState(location?.state?.index);
  console.log(showMenu);
  const { token } = useContext(TokenContext);
  useEffect(() => {
    if (token?.role === "accreditor User") {
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
  // const { getData } = useApi();
  let [currentView, setCurrentView] = useState("default");
  let navigate = useNavigate();
  const change = (x) => {
    setLoc(x);
  };

  const mutation = useMutation(postData, {
    onSuccess: (data) => {
      console.log("🚀 ~ Study ~ data:", data);
      // change(3);
      // successNotf(
      //   role === "responsible"
      //     ? "تم توجية الدراسه الأوليه للمعتمد"
      //     : // : "تم اعتماد الدراسة الاولية بنجاح"
      //       data?.data?.message
      // );
      successNotf(data?.data?.message);

      refetch();
      ref.current.close();
      navigate("/dash", { replace: true });
    },
    onError: (err) => {
      errorNotf(err.response.data.message);
      ref.current.close();
      // setCurrentView("error");
    },
  });

  const openModal = (type) => {
    if (type === "resubmit") {
      setReSubmit(true);
      ref.current.open();
    } else {
      setReSubmit(false);
      ref.current.open();
    }
  };

  const onSubmit = (data) => {
    mutation.mutate([`/reports/${id}`, data]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="loader"></div>
      </div>
    );
  }

  if (!report) {
    return (
      <>
        <NotFound msg={"البلاغ غير موجود"} />
      </>
    );
  }

  return (
    <div className="bg-[#E6E6E6]">
      <div className=" w-[90%]  py-20   mx-auto ">
        <div className="flex justify-between items-center mb-4 gap-4">
          <div className="flex gap-3">
            <div className="border border-light rounded-lg shadow-sm p-2 bg-white/50">
              <p className="font-semibold text-sm text-[#33835c] flex items-center">
                رقم البلاغ:{" "}
                <span className="text-black/65 text-xl ms-2">
                  {report?.number}
                </span>
              </p>
            </div>
            {/* <div className="border border-light rounded-lg shadow-sm p-2 bg-white/50">
              <p className="font-semibold text-sm text-[#33835c] flex items-center">
                الحالة
                <span className="text-black/65 text-xl ms-2">
                  {report?.status}
                </span>
              </p>
            </div> */}
          </div>
          {role === "responsible" && name !== "prepare" ? (
            <div className="flex gap-3">
              <button
                className={
                  " bg-[#33835C] font-semibold border  w-fit text-white rounded-md  p-2   "
                }
                onClick={() => navigate(`/dash/${id}/editStudy`)}
              >
                تعديل
                <EditOutlined className=" text-white mr-3 text-xl cursor-pointer" />{" "}
              </button>
              <button
                onClick={() => ref.current.open()}
                className={
                  " bg-[#33835C] font-semibold border  w-fit text-white rounded-md  p-2   "
                }
              >
                توجيه الدراسة الاولية
              </button>
            </div>
          ) : (
            name === "accreditor" && (
              <div className="flex justify-between items-center flex-wrap">
                {/* <div className="border border-light rounded-lg shadow-sm p-2 bg-white/50">
                  <p className="font-semibold text-sm text-[#33835c] flex items-center">
                    رقم البلاغ:{" "}
                    <span className="text-black/65 text-xl ms-2">
                      {report?.number}
                    </span>
                  </p>
                </div> */}
                {report?.status !== "rejected" &&
                  report?.status !== "resubmit_study_from_accreditor" && (
                    // report?.status !== "under_process" &&
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => {
                          if (
                            report?.status === "rejected" ||
                            report?.status === "rejected_from_responsible"
                          ) {
                            // ref.current?.open();
                            openModal("resubmit");
                          } else {
                            navigate(`/acc?id=${id}`, { state: report.number });
                          }
                        }}
                        className={`${
                          report?.status === "rejected" ||
                          report?.status === "rejected_from_responsible"
                            ? "bg-[#33835c]"
                            : "bg-black/65"
                        } !text-white text-sm font-bold p-2 rounded-md `}
                      >
                        {report?.status === "rejected" ||
                        report?.status === "rejected_from_responsible"
                          ? "اعادة البلاغ للدراسة"
                          : "اضافة ملاحظات"}
                      </button>
                      <button
                        onClick={() => {
                          //   ref.current?.open();
                          openModal("approve");
                        }}
                        className={`${
                          report?.status === "rejected" ||
                          report?.status === "rejected_from_responsible"
                            ? "bg-red-500"
                            : "bg-[#33835C]"
                        } !text-white text-sm font-bold p-2 rounded-md `}
                      >
                        {report?.status === "rejected" ||
                        report?.status === "rejected_from_responsible"
                          ? "تاكيد رفض البلاغ"
                          : "اعتماد الدراسة الاولية"}
                      </button>
                    </div>
                  )}
              </div>
            )
          )}
          {role === "department" ? (
            <div className="flex justify-between items-center flex-wrap">
              <div className="flex gap-3 flex-wrap relative">
                <button
                  type="button"
                  onClick={handleShowMenu}
                  className={`bg-black/65 !text-white text-sm font-bold p-2 rounded-md `}
                >
                  اتخاذ اجراء
                </button>
                {showMenu && (
                  <div className="absolute !z-[9000]  w-[250px] sm:h-fit h-[325px] overflow-auto top-[120%]  left-0 bg-white rounded-lg scrollbar scrollbar-w-2 scrollbar-thumb-[#33835c] scrollbar-thumb-rounded-full ">
                    <ReportMenu
                      setShowSvg={setShowSvg}
                      func={setCh}
                      showModal={showMenu}
                      status={report?.status}
                      refetch={refetch}
                    />
                  </div>
                )}
                <button
                  onClick={() =>
                    navigate("reportsDate", {
                      state: { number: report?.number },
                    })
                  }
                  type="button"
                  className={`bg-[#33835C] !text-white text-sm font-bold p-2 rounded-md `}
                >
                  تاريخ سير البلاغ
                </button>
              </div>
            </div>
          ) : (
            // <button
            //   onClick={() => {}}
            //   className={`bg-[#33835C] !text-white text-sm font-bold p-2 rounded-md `}
            // >
            //   استلام البلاغ
            // </button>
            ""
          )}
          {role === "reviewer" && (
            <div className="flex justify-between items-center flex-wrap">
              <button
                onClick={() =>
                  navigate("reportsDate", {
                    state: { number: report?.number },
                  })
                }
                type="button"
                className={`bg-[#33835C] !text-white text-sm font-bold p-2 rounded-md `}
              >
                تاريخ سير البلاغ
              </button>
            </div>
          )}
        </div>
        <div className="bg-white rounded-md mt-4">
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
        title={
          role === "responsible"
            ? "توجيه الدراسة الاولية"
            : report?.status === "rejected" ||
              report?.status === "rejected_from_responsible"
            ? "تاكيد رفض البلاغ"
            : "اعتماد الدراسة الاولية"
        }
        ref={ref}
        currentView={currentView}
        setCurrentView={setCurrentView}
      >
        {(report?.status === "rejected" ||
          report?.status === "rejected_from_responsible") &&
        reSubmit ? (
          <ResubmitModal
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
          />
        ) : (
          <SuccessModal
            title={
              role === "responsible"
                ? "عند التاكيد سيتم توجيه الدراسة الاولية الى معتمد البلاغات"
                : report?.status === "rejected" ||
                  report?.status === "rejected_from_responsible"
                ? "عند التاكيد سيتم رفض البلاغ"
                : "عند التاكيد سيتم اعتماد الدراسة الاولية"
            }
            close={"تاكيد"}
            confirm={() => {
              if (role === "responsible") {
                mutation.mutate([
                  `/reports/${id}`,
                  {
                    action: "directing_initial_study",
                    _method: "PUT",
                  },
                ]);
              } else if (role === "accreditor") {
                if (
                  report?.status === "rejected" ||
                  report?.status === "rejected_from_responsible"
                ) {
                  mutation.mutate([
                    `/reports/${id}`,
                    {
                      action: "confirm_rejection",
                      _method: "PUT",
                    },
                  ]);
                } else {
                  mutation.mutate([
                    `/reports/${id}`,
                    {
                      action: "approve_the_preliminary_study",
                      // status: "accepted",
                      _method: "PUT",
                    },
                  ]);
                }
              } else {
                console.log("waiting");
              }
            }}
          />
        )}
        {/* <button
              className="w-fit bg-[#33835C] text-white p-1 px-10 rounded-lg mt-0 m-auto"
              onClick={() => {}}
            >
              تاكيد
            </button> */}
      </ReportModel>
      {showMenu && (
        <div
          ref={wrapperRef}
          onClick={handleHideMenu}
          className="w-full z-[500] h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.4)]"
        ></div>
      )}

      {ch && showSvg && <Modal>{ch}</Modal>}
    </div>
    // )}
    // </div>
  );
};

export default Study;
