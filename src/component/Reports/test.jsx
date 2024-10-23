/* eslint-disable no-unused-vars */
import { useNavigate, useParams } from "react-router-dom";
import useApi from "../../utils/useApi";
import { useQuery } from "react-query";
import { useContext, useEffect, useRef, useState } from "react";
import DispalyData from "../../custom hooks/DispalyData";
import ReportMenu from "../../custom hooks/ReportMenu";
import CardDiv from "../../custom hooks/UI/CardDiv";
import Modal from "../../custom hooks/UI/Modal";
import Model from "../../models/Model";
import { Results } from "../../custom hooks/Results";
import StudyContext from "../../store/StudyContext";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import NotFound from "../../NotFound";

const labelProps = {
  textarea: "وصف البلاغ",
  selectTitle: "هل انت على علم باسماء المشتبه بهم؟",
  listInputTitle: "أسماء الاشخاص المشتبه بهم",
  datePickerTitle: "تاريخ ارتكاب المخالفة",
  locationTitle: "ادخل مكان الحادث",
};

const Test = () => {
  const { getData } = useApi();
  const { id } = useParams();

  const [showSvg, setShowSvg] = useState(false);
  const [ch, setCh] = useState("");
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const { showMenu, handleShowMenu, handleHideMenu } = useContext(StudyContext);

  const {
    isLoading,
    error,
    refetch,
    data: { data: { report } = {} } = {},
  } = useQuery(["users", ["/reports"], id], getData);
  console.log("🚀 ~ Test ~ report:", report);

  useEffect(() => {
    handleHideMenu();
    refetch();
  }, [refetch]);

  // useEffect(() => {
  //   if (showMenu || showSvg) {
  //     document.documentElement.style.overflow = "hidden";
  //   } else {
  //     document.documentElement.style.overflow = "auto";
  //   }
  // }, [showSvg, showMenu]);

  console.log(showMenu);

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

  // const handleShowMenu = () => {
  //   setShowMenu(true);
  // };

  console.log(showMenu);

  return (
    <>
      <div className="mt-20 pr-4">
        <div className="w-[95%] rounded-md mx-auto">
          <h2 className="text-[24px]">مسؤول البلاغات</h2>
          <div className="flex gap-4 items-center justify-end w-full  text-left ">
            <div className="relative">
              <button
                onClick={handleShowMenu}
                className="bg-[#33835C]   p-4 py-2 rounded-md text-white"
              >
                اتخاذ اجراء{" "}
              </button>

              {showMenu && (
                <div className="absolute z-[2000]  w-[250px] sm:h-[350px] h-[325px] overflow-auto top-[120%]  left-0 bg-white rounded-lg scrollbar scrollbar-w-2 scrollbar-thumb-[#33835c] scrollbar-thumb-rounded-full ">
                  <ReportMenu
                    setShowSvg={setShowSvg}
                    func={setCh}
                    showModal={showMenu}
                    status={report?.status}
                    refetch={refetch}
                  />
                </div>
              )}
            </div>
            <button
              onClick={() => navigate("reportsDate")}
              className="bg-[#000000CC] p-[10px] rounded-md text-white"
            >
              تاريخ سير البلاغ{" "}
            </button>
          </div>
          <div className="border overflow-hidden mt-4  pb-0 rounded-md border-gray-300">
            <ReportsHeader title="بيانات البلاغ" />
            <div className="p-1 sm:p-6">
              <DispalyData title="بيانات البلاغ" values={report} />
            </div>
          </div>
        </div>
        {/* {showMenu && (
          <div
            ref={wrapperRef}
            onClick={handleHideMenu}
            className="w-full z-[9999] h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.4)]"
          >
            <div className="fixed sm:h-[350px] h-[325px] overflow-auto top-[39.5%] left-[29%] sm:left-[23%] md:left-[18%] lg:left-[13%] bg-white rounded-lg scrollbar scrollbar-w-2 scrollbar-thumb-[#33835c] scrollbar-thumb-rounded-full ">
              <ReportMenu
                setShowSvg={setShowSvg}
                func={setCh}
                showModal={showMenu}
              />
            </div>
          </div>
        )} */}
        {showMenu && (
          <div
            ref={wrapperRef}
            onClick={handleHideMenu}
            className="w-full z-[1] h-screen fixed top-0 left-0 bg-[rgba(0,0,0,0.4)]"
          ></div>
        )}

        {ch && showSvg && <Modal>{ch}</Modal>}
      </div>
    </>
  );
};
export default Test;
