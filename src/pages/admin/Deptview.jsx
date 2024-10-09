// import { useEffect, useMemo, useState } from "react";
// import { Table } from "antd";
// import { useLocation, useNavigate } from "react-router-dom";
// import { EditOutlined, EyeOutlined } from "@ant-design/icons";
// import { useRef } from "react";
// import ReportModel from "../../models/ReportModel";
// import { useQuery } from "react-query";
// import useApi from "../../utils/useApi";

// const Deptview = () => {
//   const [modelContent, setModelContent] = useState(""); // State for model content
//   const [modelTitle, setModelTitle] = useState("");
//   const [currentView, setCurrentView] = useState("default");
//   const {
//     state: { data = [], columns = [], apiKey = "" },
//   } = useLocation();

//   const { getData } = useApi();

//   console.log("🚀 ~ Deptview ~ data:", data);
//   const [pagination, setPagination] = useState(1);
//   const ref = useRef();
//   const navigate = useNavigate();

//   const {
//     data: _data,
//     isLoading,
//     refetch,
//   } = useQuery(["admin", [apiKey, { page: pagination }]], getData, {
//     refetchInterval: 0,
//   });
//   console.log("🚀 ~ Deptview ~ t:", _data);
//   const totalPages = Math.ceil(_data?.meta?.pagination?.totalItems / 10);
//   const actionsColumnWidth = useMemo(() => {
//     if (totalPages > 1) {
//       return `calc(100% / ${totalPages})`;
//     }
//     return "200px";
//   }, [totalPages]);

//   useEffect(() => {
//     refetch();
//   }, [data, refetch]);

//   const usedColumns = [
//     {
//       title: "الفعاليات",
//       key: "actions",
//       width: actionsColumnWidth,
//       render: (_, record) => {
//         console.log(record);
//         return (
//           <div className="flex justify-center gap-4">
//             <button
//               className="text-md flex items-center gap-3 "
//               onClick={() => {
//                 setModelContent(
//                   (
//                     <div className="h-36 pt-6">
//                       <input
//                         className="bg-[#E6E6E6] px-2 py-2 rounded-lg border border-gray-300 sm:w-1/2 md:w-[40%] lg:w-1/2 w-full
//                         "
//                         defaultValue={record.name}
//                         // cursor-not-allowed"
//                         // disabled
//                       />
//                     </div>
//                   ) || `عرض`
//                 );
//                 setModelTitle("عرض القسم");
//                 ref.current?.open();
//               }}
//             >
//               <EyeOutlined /> {"عرض"}
//             </button>
//             <button
//               className="text-md flex items-center gap-3 "
//               onClick={() => {
//                 setModelContent("تعديل");
//                 setModelTitle("بيانات المستخدم");
//                 ref.current?.open();
//               }}
//             >
//               <EditOutlined /> {"تعديل"}
//             </button>
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <>
//       <ReportModel
//         ref={ref}
//         title={modelTitle}
//         currentView={currentView}
//         setCurrentView={setCurrentView}
//         // msg={
//         //   <>
//         //     <EditOutlined /> {"تعديل"}
//         //   </>
//         // }
//       >
//         <div className="px-5 py-3">
//           {modelContent}
//           <div className="py-3 pt-0 flex items-center justify-end">
//             <button
//               onClick={() => {
//                 setCurrentView("success");
//               }}
//               className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
//             >
//               <EditOutlined /> {"تعديل"}
//             </button>
//           </div>
//         </div>
//       </ReportModel>
//       <div className="w-[90%] mx-auto mt-20">
//         <Table
//           columns={[...columns, ...usedColumns]}
//           dataSource={_data?.data}
//           loading={{
//             spinning: isLoading,
//             indicator: (
//               <diV className=" w-full h-[650px] flex justify-center items-center">
//                 <div className="loader"></div>
//               </diV>
//             ),
//           }}
//           pagination={
//             totalPages > 1
//               ? {
//                   current: pagination,
//                   pageSize: 10,
//                   total: _data?.meta?.pagination?.totalItems,
//                   showSizeChanger: false,
//                   onChange: (pageNumber) => {
//                     setPagination(pageNumber);
//                   },
//                 }
//               : false
//           }
//           className="text-center font-medium text-md"
//         />
//         <button
//           onClick={() => navigate("/managers")}
//           className="w-fit bg-[#33835C] text-white p-2 px-10 rounded-lg mr-auto block my-4"
//         >
//           رجوع
//         </button>
//       </div>
//     </>
//   );
// };

// export default Deptview;

import { useEffect, useMemo, useState } from "react";
import { Table, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useRef } from "react";
import ReportModel from "../../models/ReportModel";
import { useQuery } from "react-query";
import useApi from "../../utils/useApi";
import EditRow from "../../component/managersComponetns/EditRow";

const Deptview = () => {
  const [modelContent, setModelContent] = useState("");
  const [modelTitle, setModelTitle] = useState("");
  const [currentView, setCurrentView] = useState("default");
  const {
    state: { data = [], columns = [], apiKey = "" },
  } = useLocation();

  const { getData } = useApi();
  const [pagination, setPagination] = useState(1);
  const ref = useRef();
  const navigate = useNavigate();

  const {
    data: _data,
    isLoading,
    refetch,
  } = useQuery(["admin", [apiKey, { page: pagination }]], getData, {
    refetchInterval: 0,
  });

  const totalPages = Math.ceil(_data?.meta?.pagination?.totalItems / 10);
  const actionsColumnWidth = useMemo(() => {
    return totalPages > 1 ? `calc(100% / ${totalPages})` : "200px";
  }, [totalPages]);

  const SELECTS = columns.map((column) => {
    const uniqueValues = Array.from(
      new Set(
        _data?.data?.map((report) => report[column.dataIndex]).filter(Boolean)
      )
    );

    const options = [
      { value: "", label: "اختر " + column.title, disabled: true },
      ...uniqueValues.map((value) => ({
        value,
        label: value,
      })),
    ];

    return {
      label: column.title,
      dataIndex: column.dataIndex,
      options,
    };
  });

  const [filters, setFilters] = useState(Array(SELECTS.length).fill(""));

  const handleFilterChange = (index, value) => {
    const newFilters = [...filters];
    newFilters[index] = value;
    setFilters(newFilters);
  };

  const filteredReports = _data?.data?.filter((report) => {
    return filters.every((filter, index) => {
      if (!filter) return true;
      const selectConfig = SELECTS[index];
      const reportValue = report[selectConfig.dataIndex];
      return reportValue ? reportValue.toString() === filter.toString() : false;
    });
  });

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const usedColumns = [
    {
      title: "الفعاليات",
      key: "actions",
      width: actionsColumnWidth,
      render: (_, record) => (
        <div className="flex justify-center gap-4">
          <button
            className="text-md flex items-center gap-3"
            onClick={() => {
              setModelContent(
                <div className="h-36 pt-6">
                  <input
                    className="bg-[#E6E6E6] px-2 py-2 rounded-lg border border-gray-300 sm:w-1/2 md:w-[40%] lg:w-1/2 w-full"
                    defaultValue={record.name}
                  />
                </div>
              );
              setModelTitle("عرض القسم");
              ref.current?.open();
            }}
          >
            <EyeOutlined /> {"عرض"}
          </button>
          <button
            className="text-md flex items-center gap-3"
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
        currentView={currentView}
        setCurrentView={setCurrentView}
      >
        <div className="px-5 py-3">
          {modelContent}
          <div className="py-3 pt-0 flex items-center justify-end">
            <button
              onClick={() => {
                setCurrentView("success");
              }}
              className="bg-[#33835C] text-white p-1 px-10 rounded-lg"
            >
              <EditOutlined /> {"تعديل"}
            </button>
          </div>
        </div>
      </ReportModel>
      <div className="w-[90%] mx-auto mt-20">
        <div className="flex flex-wrap gap-4 mb-4">
          {SELECTS.map((sel, index) => (
            <div
              className="flex-1 min-w-[150px] w-full sm:w-[200px] lg:w-full"
              key={sel.label}
            >
              <label className="text-sm font-bold">{sel.label}</label>
              {/* {sel.options.length > 1 ? ( */}
              <Select
                value={filters[index]}
                onChange={(value) => handleFilterChange(index, value)}
                className="mt-2"
                placeholder={`...${sel.label}`}
                style={{ width: "100%" }}
                options={sel.options}
              />
              {/* ) : ( */}
              {/* <div className="mt-2 text-gray-500">لا توجد خيارات متاحة</div> */}
              {/* )} */}
            </div>
          ))}
          <button
            className="bg-[#33835c] self-end p-2 py-1 w-auto text-white rounded-md"
            onClick={() => setFilters(Array(SELECTS.length).fill(""))}
          >
            {/* <SearchOutlined className="font-bold text-md" /> */}
            اعادة
          </button>
        </div>
        <Table
          columns={[...columns, ...usedColumns]}
          dataSource={filteredReports}
          loading={{
            spinning: isLoading,
            indicator: (
              <div className="w-full h-[650px] flex justify-center items-center">
                <div className="loader"></div>
              </div>
            ),
          }}
          pagination={
            totalPages > 1
              ? {
                  current: pagination,
                  pageSize: 10,
                  total: _data?.meta?.pagination?.totalItems,
                  showSizeChanger: false,
                  onChange: (pageNumber) => {
                    setPagination(pageNumber);
                    setFilters(Array(SELECTS.length).fill(""));
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
