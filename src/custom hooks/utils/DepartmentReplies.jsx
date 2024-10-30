/* eslint-disable react/prop-types */
import {
  EditOutlined,
  FileTextOutlined,
  WarningOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import ReportImages from "../../component/Reports/ReportImages";
import ReportFiles from "../../component/Reports/ReportFiles";

const DepartmentReplies = ({ replies }) => {
  console.log("🚀 ~ DepartmentReplies ~ replies:", replies);
  return (
    <>
      <div className="w-full mx-auto my-6 p-4 px-0">
        <div className="space-y-6 bg-blue-100/90 p-4 rounded-lg border border-gray-400">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <div
                className="text-white rounded-full h-8 w-8 flex justify-center items-center text-xs"
                style={{ backgroundColor: "#33835c" }}
              >
                <FileTextOutlined />
              </div>
              <label className="font-semibold text-sm">من:</label>
              <span className="text-sm">{replies?.created_by}</span>
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
              <span className="text-sm">{replies?.received_by}</span>
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
              <span className="text-sm">{replies?.type}</span>
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
              <span className="text-sm">{replies?.date_and_time}</span>
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
              <span className="text-sm">{replies?.request_text}</span>
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
                  {replies?.media?.images?.length +
                    replies?.media?.videos?.length || 0}
                  )
                </label>
              </div>
              <ReportImages
                imgs={replies?.media?.images}
                videos={replies?.media?.videos}
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
                  المستندات المرفقة ({replies?.media?.files.length || 0})
                </label>
              </div>
              <div className="mt-4">
                <ReportFiles fils={replies?.media?.files} hasLabel={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentReplies;
