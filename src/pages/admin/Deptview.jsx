import { useState } from "react";
import { Table } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useRef } from "react";
import ReportModel from "../../models/ReportModel";

const Deptview = () => {
  const [modelContent, setModelContent] = useState(""); // State for model content
  const [modelTitle, setModelTitle] = useState("");
  const {
    state: { data = [], columns = [] },
  } = useLocation();

  const [pagination, setPagination] = useState(
    parseInt(localStorage.getItem("pageNumber")) || 1
  );

  let ref = useRef();
  const navigate = useNavigate();
  let totalPages = Math.ceil(data.length / 9);
  //   console.log(totalPages,data.length);

  const usedColumns = [
    {
      title: "الفعاليات",
      key: "actions",
      render: () => (
        <div className="flex justify-center gap-4">
          <button
            className="text-md flex items-center gap-3 "
            onClick={() => {
              setModelContent(`عرض`);
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
      ),
    },
  ];

  return (
    <>
      <ReportModel
        ref={ref}
        title={modelTitle}
        msg={
          <>
            <EditOutlined /> {"تعديل"}
          </>
        }
      >
        <div className="px-5 py-3">{modelContent}</div>
      </ReportModel>
      <div className="w-[90%] mx-auto mt-20">
        <Table
          columns={[...columns, ...usedColumns]}
          dataSource={data}
          pagination={
            totalPages > 1
              ? {
                  current: pagination,
                  pageSize: 9,
                  total: data.length,
                  showSizeChanger: false,
                  onChange: (pageNumber) => {
                    setPagination(pageNumber);
                    localStorage.setItem("pageNumber", pageNumber);
                  },
                }
              : false
          }
          className="text-center font-medium text-md"
        />
        <button
          onClick={() => navigate("/managers")}
          className="w-fit bg-[#33835C] text-white p-1 px-10 rounded-lg mr-auto block my-4"
        >
          رجوع
        </button>
      </div>
    </>
  );
};

export default Deptview;
