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
    data: { data: { report } = {} } = {},
  } = useQuery(["users", ["/reports"], id], getData);

  useEffect(() => {
    if (showMenu || showSvg) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [showMenu]);

  console.log(showMenu);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)]">
        <div className="loader"></div>;
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
      <div className="m-20   pr-4">
        <div className="w-[95%] rounded-md mx-auto">
          <h2 className="text-[24px]">مسؤول البلاغات</h2>
          <div className="flex gap-4 items-center justify-end w-full  text-left">
            <button
              onClick={handleShowMenu}
              className="bg-[#33835C]  p-4 py-2 rounded-md text-white"
            >
              اتخاذ اجراء{" "}
            </button>
            <button
              onClick={() => navigate("reportsDate")}
              className="bg-[#000000CC] p-[10px] rounded-md text-white"
            >
              {" "}
              تاريخ سير البلاغ{" "}
            </button>
          </div>
          <div className="border overflow-hidden mt-4  pb-0 rounded-md border-gray-300">
            <ReportsHeader title="بيانات البلاغ" />
            <div className="p-6">
              <DispalyData title="بيانات البلاغ" values={report} />
              <Results />
            </div>
          </div>
        </div>

        {showMenu && (
          <div
            ref={wrapperRef}
            onClick={handleHideMenu}
            className="w-full z-[9999] h-full fixed top-0 left-0 bg-[rgba(0,0,0,0.4)]"
          >
            <div className="absolute top-[31.9%] left-[16%] bg-white rounded-lg overflow-hidden">
              <ReportMenu
                setShowSvg={setShowSvg}
                func={setCh}
                showModal={showMenu}
              />
            </div>
          </div>
        )}

        {ch && showSvg && <Modal>{ch}</Modal>}
      </div>
    </>
  );
};
export default Test;
