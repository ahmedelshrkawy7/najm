/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  EditOutlined,
  FileTextOutlined,
  WarningOutlined,
  TeamOutlined,
  FileOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import ReportImages from "../../component/Reports/ReportImages";
import ReportFiles from "../../component/Reports/ReportFiles";
import DepartmentReplies from "./DepartmentReplies";
import { useContext, useRef, useState } from "react";
import ReportModel from "../../models/ReportModel";
import ReportInfo from "../../models/ReportInfo";
import DashModal from "../../models/DashModal";
import TokenContext from "../../store/TokenContext";

const DepartmentActions = ({ notes }) => {
  console.log("🚀 ~ DepartmentActions ~ type:", notes?.type);
  console.log("🚀 ~ DepartmentActions ~ notes:", notes);
  const [currentView, setCurrentView] = useState("default");
  let ref = useRef();
  const { login, token } = useContext(TokenContext);

  let button = "";
  let selectAction = (type = "") => {
    let action = "";

    switch (type) {
      case "إضافة المستجدات":
      case "إضافة مستجدات":
        action = "add_updates";
        break;
      case "طلب مستجدات":
        action = "add_updates";
        button = "إضافه مستجدات";

        break;
      case "اضافة معلومات":
        action = "add_information";
        button = "إضافه مستجدات";

        break;
      case "إضافة ملاحظات":
        action = "add_notes";
        break;
      case "طلب المعلومات":
        action = "add_information";
        button = "إضافه معلومات";

        break;
      default:
        action = "unknown_action";
    }

    return action;
  };
  const showButton = ({ received_by, type }) => {
    if (type.includes("إضافة")) return false;
    if (received_by == "الإدارة المختصة" && token.role == "department") {
      return true;
    } else if (received_by == "المسئول" && token.role == "responsible") {
      return true;
    }
    return false;
  };

  const action = notes?.type && selectAction(notes?.type);
  console.log("🚀 ~ DepartmentActions ~ action:", action);
  const [isModalOpen, setModalOpen] = useState(false);
  let role = JSON.parse(localStorage.getItem("token"))?.role;
  console.log("🚀 ~ DepartmentActions ~ role:", role);

  return (
    <div className="w-full mx-auto my-6 p-4 px-0">
      {/* <ReportModel
        ref={ref}
        title={notes?.type}
        currentView={currentView}
        setCurrentView={setCurrentView}
      >
        <ReportInfo title={notes?.type || ""} action={action} />
      </ReportModel> */}

      <DashModal
        title={notes?.type}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        currentView={currentView}
        setCurrentView={setCurrentView}
      >
        <ReportInfo
          title={notes?.type || ""}
          action={action}
          key={notes?.id}
          _id={notes?.id}
        />
      </DashModal>

      <div className="space-y-6 bg-blue-100/40 p-4 rounded-lg relative">
        {showButton(notes) && (
          <button
            className="bg-[#33835C] p-[6px] rounded-md text-white absolute left-3 top-3 flex items-center gap-1"
            onClick={() => {
              // ref.current?.open();
              setModalOpen(true);
            }}
          >
            <PlusOutlined />
            <span>{button}</span>
          </button>
        )}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
              style={{ backgroundColor: "#33835c" }}
            >
              <FileTextOutlined />
            </div>
            <label className="font-semibold text-sm">من:</label>
            <span className="text-sm">{notes?.created_by}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
              style={{ backgroundColor: "#33835c" }}
            >
              <WarningOutlined />
            </div>
            <label className="font-semibold text-sm">الى:</label>
            <span className="text-sm">{notes?.received_by}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
              style={{ backgroundColor: "#33835c" }}
            >
              <WarningOutlined />
            </div>
            <label className="font-semibold text-sm">نوع الاجراء:</label>
            <span className="text-sm">{notes?.type}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
              style={{ backgroundColor: "#33835c" }}
            >
              <TeamOutlined />
            </div>
            <label className="font-semibold text-sm">التاريخ والوقت:</label>
            <span className="text-sm">{notes?.date_and_time}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <div className="flex items-center gap-2 flex-wrap">
            <div
              className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs flex-wrap"
              style={{ backgroundColor: "#33835c" }}
            >
              <EditOutlined />
            </div>
            <label className="font-semibold text-sm">الملاحظات:</label>
            <span className="text-sm">{notes?.request_text}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex items-start flex-col gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <div
                className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs flex-wrap"
                style={{ backgroundColor: "#33835c" }}
              >
                <FileOutlined />
              </div>
              <label className="font-semibold text-sm">
                الصور والفيديوهات (
                {notes?.media?.images?.length + notes?.media?.videos?.length})
              </label>
            </div>
            <ReportImages
              imgs={notes?.media?.images}
              videos={notes?.media?.videos}
              hasLabel={false}
            />
          </div>
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex items-start flex-col gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <div
                className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs flex-wrap"
                style={{ backgroundColor: "#33835c" }}
              >
                <FileOutlined />
              </div>
              <label className="font-semibold text-sm">
                المستندات المرفقة ({notes?.media?.files?.length})
              </label>
            </div>
            <div className="mt-4">
              <ReportFiles fils={notes?.media?.files} hasLabel={false} />
            </div>
          </div>
          {notes?.replies?.length > 0 && (
            <>
              {notes?.replies.map((replies) => (
                <DepartmentReplies key={replies.id} replies={replies} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentActions;
