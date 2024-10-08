import { useMemo, useState } from "react";
import { Table } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useRef } from "react";
import ReportModel from "../../models/ReportModel";
import { useQuery } from "react-query";
import useApi from "../../utils/useApi";

const Deptview = () => {
  const [modelContent, setModelContent] = useState(""); // State for model content
  const [modelTitle, setModelTitle] = useState("");
  const [currentView, setCurrentView] = useState("default");
  const {
    state: { data = [], columns = [], apiKey = "" },
  } = useLocation();

  const { getData } = useApi();

  console.log("🚀 ~ Deptview ~ data:", data);
  const [pagination, setPagination] = useState(1);
  const ref = useRef();
  const navigate = useNavigate();

  const { data: _data } = useQuery(
    ["admin", [apiKey, { page: pagination }]],
    getData,
    { refetchInterval: 0 }
  );
  console.log("🚀 ~ Deptview ~ t:", _data);
  const totalPages = Math.ceil(data.length / 9);
  const actionsColumnWidth = useMemo(() => {
    if (totalPages > 1) {
      return `calc(100% / ${totalPages})`;
    }
    return "200px";
  }, [totalPages]);

  const usedColumns = [
    {
      title: "الفعاليات",
      key: "actions",
      width: actionsColumnWidth,
      render: (_, record) => {
        console.log(record);
        return (
          <div className="flex justify-center gap-4">
            <button
              className="text-md flex items-center gap-3 "
              onClick={() => {
                setModelContent(
                  (
                    <div className="h-36 pt-6">
                      <input
                        className="bg-[#E6E6E6] px-2 py-2 rounded-lg border border-gray-300 sm:w-1/2 md:w-[40%] lg:w-1/2 w-full 
                        "
                        defaultValue={record.name}
                        // cursor-not-allowed"
                        // disabled
                      />
                    </div>
                  ) || `عرض`
                );
                setModelTitle("عرض القسم");
                ref.current?.open();
              }}
            >
              <EyeOutlined /> {"عرض"}
            </button>
            <button
              className="text-md flex items-center gap-3 "
              onClick={() => {
                setModelContent("تعديل");
                setModelTitle("بيانات المستخدم");
                ref.current?.open();
              }}
            >
              <EditOutlined /> {"تعديل"}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <ReportModel
        ref={ref}
        title={modelTitle}
        currentView={currentView}
        setCurrentView={setCurrentView}
        // msg={
        //   <>
        //     <EditOutlined /> {"تعديل"}
        //   </>
        // }
      >
        <div className="px-5 py-3">
          {modelContent}
          <div className="py-3 pt-0 flex items-center justify-end">
            <button
              onClick={() => {
                setCurrentView("success");
              }}
              className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
            >
              <EditOutlined /> {"تعديل"}
            </button>
          </div>
        </div>
      </ReportModel>
      <div className="w-[90%] mx-auto mt-20">
        <Table
          columns={[...columns, ...usedColumns]}
          dataSource={_data?.data}
          pagination={
            totalPages > 1
              ? {
                  current: pagination,
                  pageSize: 10,
                  total: _data?.meta?.pagination?.totalItems,
                  showSizeChanger: false,
                  onChange: (pageNumber) => {
                    setPagination(pageNumber);
                  },
                }
              : false
          }
          className="text-center font-medium text-md"
        />
        <button
          onClick={() => navigate("/managers")}
          className="w-fit bg-[#33835C] text-white p-2 px-10 rounded-lg mr-auto block my-4"
        >
          رجوع
        </button>
      </div>
    </>
  );
};

export default Deptview;
