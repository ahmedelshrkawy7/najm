/* eslint-disable no-unused-vars */
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

import { cloneElement, useEffect, useMemo, useState } from "react";
import { Table, Select, Button, Input } from "antd";
import { Link, useLocation, useMatches, useNavigate } from "react-router-dom";
import {
  EditOutlined,
  EyeOutlined,
  HomeFilled,
  DeleteFilled,
  SearchOutlined,
} from "@ant-design/icons";
import { useRef } from "react";
import ReportModel from "../../models/ReportModel";
import { useMutation, useQuery } from "react-query";
import useApi from "../../utils/useApi";
import { Breadcrumb } from "../../import";
import useCardData from "./useCardData";
import { successNotf } from "../../utils/notifications/Toast";
import DashModal from "../../models/DashModal";

const Deptview = () => {
  const matches = useMatches();
  const breadcrumbs = matches
    .filter((match) => match.handle && match.handle.crumb)
    .map((match) => {
      console.log("🚀 ~ .map ~ match:", match);
      return {
        id: match.id,
        title: (
          <Link className="hover:!bg-white" to={redirectCrumb(match.pathname)}>
            <span className="text-black text-[16px] font-medium">
              {match.handle.crumb}
            </span>
          </Link>
        ),
        path: match.pathname,
      };
    });

  breadcrumbs.push({
    title: (
      <span className="text-black/60 text-[16px] font-medium">الاقسام</span>
    ),
  });

  function redirectCrumb(path) {
    return path === "/depts" ? "/managers" : path === "/" ? "/alladmins" : path;
  }

  let { cardData = [] } = useCardData();
  const [modelContent, setModelContent] = useState("");
  const [modelTitle, setModelTitle] = useState("");
  const [currentView, setCurrentView] = useState("default");
  const [isModalOpen, setModalOpen] = useState(false);
  const { state } = useLocation();
  const { data = [], columns = [], apiKey = "", buttonName = "" } = state || {};

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const { getData } = useApi();
  const [pagination, setPagination] = useState(1);
  // const [searchTerm, setSearchTerm] = useState("");

  const ref = useRef();
  const navigate = useNavigate();
  let comp = cardData?.find((comp) => comp.buttons[1] === buttonName);
  const {
    data: _data = {},
    isLoading,
    refetch,
  } = useQuery(["admin", [apiKey, { page: pagination }]], getData, {
    refetchInterval: 0,
  });

  const totalPages = Math.ceil(_data?.meta?.pagination?.totalItems / 10);
  const actionsColumnWidth = useMemo(() => {
    return totalPages > 1 ? `calc(100% / ${totalPages})` : "200px";
  }, [totalPages]);

  const SELECTS = columns?.map((column) => {
    const uniqueValues = Array.from(
      new Set(
        _data?.data
          ?.map((report) => {
            const value =
              Array.isArray(column.dataIndex) && column.dataIndex.length > 1
                ? report[column.dataIndex[1]]
                : report[column.dataIndex];
            return value;
          })
          .filter(Boolean)
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
      // console.log("🚀 ~ returnfilters.every ~ selectConfig:", selectConfig)
      // const reportValue =
      //   report[
      //     typeof selectConfig.dataIndex === "object"
      //       ? selectConfig.dataIndex[1]
      //       : selectConfig.dataIndex
      //   ];
      let reportValue;
      if (Array.isArray(selectConfig.dataIndex)) {
        reportValue = report[selectConfig.dataIndex[0]];
      } else {
        reportValue = report[selectConfig.dataIndex];
      }

      return reportValue ? reportValue.toString() === filter.toString() : false;
    });
  });

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  const { deleteData } = useApi();
  const [message, setMessage] = useState("");

  let mutation = useMutation(deleteData, {
    onSuccess: () => {
      // setCurrentView("success");
      // _refetch();
      successNotf("تم الحذف بنجاح");
      refetch();
    },
    onError: (err) => {
      // errorNotf(err.response.data.errors.message);
    },
  });

  const usedColumns = [
    {
      title: "الفعاليات",
      key: "actions",
      width: actionsColumnWidth,
      render: (_, record) => (
        <div className="flex justify-center gap-4">
          <button
            className="text-md flex items-center gap-3 outline-none"
            onClick={() => {
              setModelContent(
                cloneElement(comp?.cardCh, {
                  currentView,
                  setCurrentView,
                  refetch,
                  record,
                  closeModal: () => setModalOpen(false),
                  setMessage,
                })
              );
              setModelTitle("عرض القسم");
              // ref.current?.open();
              setModalOpen(true);
            }}
          >
            <EyeOutlined /> {"عرض"}
          </button>
          <button
            className="text-md flex items-center gap-3 outline-none"
            onClick={() => {
              setModelContent(
                cloneElement(comp?.cardCh, {
                  currentView,
                  setCurrentView,
                  refetch,
                  record,
                  // closeModal: () => ref.current?.close(),
                  closeModal: () => setModalOpen(false),
                  setMessage,
                })
              );
              setModelTitle("بيانات المستخدم");
              // ref.current?.open();
              setModalOpen(true);
            }}
          >
            <EditOutlined /> {"تعديل"}
          </button>
          <button
            className="text-md flex items-center gap-3"
            onClick={() => mutation.mutate(`${comp.apiKey}/${record?.id}`)}
          >
            <DeleteFilled className="text-red-600" />
          </button>
        </div>
      ),
    },
  ];

  console.log(ref?.current);
  return (
    <>
      {/* <ReportModel
        ref={ref}
        title={modelTitle}
        currentView={currentView}
        setCurrentView={setCurrentView}
        refetch={refetch}
      > */}
      {/* <div className="px-5 py-3"> */}
      {/* {modelContent} */}
      {/* <div className="py-3 pt-0 flex items-center justify-end">
            <button
              onClick={() => {
                setCurrentView("success");
              }}
              className="bg-[#33835C] text-white p-1 px-10 rounded-lg"
            >
              <EditOutlined /> {"تعديل"}
            </button>
          </div> */}
      {/* </div> */}
      {/* </ReportModel> */}
      <DashModal
        title={modelTitle}
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        currentView={currentView}
        setCurrentView={setCurrentView}
        refetch={refetch}
        message={message}
      >
        {modelContent}
      </DashModal>
      <div className="w-[90%] mx-auto mt-20">
        <div className="mb-6 flex flex-col justify-center">
          <h2 className="text-black text-xl font-bold my-1">التاسيس</h2>
          <div className="flex gap-2 items-center my-2">
            <HomeFilled className="self-center" />
            <Breadcrumb separator=">" items={breadcrumbs} />
          </div>
        </div>
        <div className=" items-center mb-5 gap-3 hidden sm:flex">
          <p className="text-lg font-medium text-black/75"> ابحث هنا</p>
          <hr className="flex-1 border-gray-300" />
        </div>
        <div className="">
          <div className="flex flex-wrap gap-4 mb-4 items-center">
            {SELECTS.map((sel, index) => (
              <div className="w-full sm:w-fit" key={sel.label}>
                <label className="text-sm font-bold">{sel.label}</label>
                {/* {sel.options.length > 1 ? ( */}
                <Select
                  value={filters[index]}
                  onChange={(value) => handleFilterChange(index, value)}
                  className="mt-2"
                  showSearch
                  placeholder={`...${sel.label}`}
                  style={{ width: "100%" }}
                  options={sel.options}
                />
                {/* ) : ( */}
                {/* <div className="mt-2 text-gray-500">لا توجد خيارات متاحة</div> */}
                {/* )} */}
              </div>
            ))}
            {/* <div className="flex items-end justify-center self-end">
              <Input
                placeholder="ابحث هنا"
                className="border border-gray-300 rounded-e-none w-64 h-[32px] "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                type="primary"
                icon={<SearchOutlined />}
                className="bg-[#33835c]  text-white h-[32px] rounded-s-none"
              />
            </div> */}
            <button
              className="bg-[#33835c] sm:self-end self-start p-2 py-1 w-auto text-white rounded-md outline-none h-fit"
              onClick={() => setFilters(Array(SELECTS.length).fill(""))}
            >
              {/* <SearchOutlined className="font-bold text-md" /> */}
              اعادة
            </button>
            <button
              className="w-fit bg-[#33835C] outline-none text-white p-2 px-4 text-sm rounded-lg mr-auto mt-auto h-fit"
              onClick={() => {
                setCurrentView("default");
                if (buttonName === comp.buttons[1]) {
                  setModelTitle(buttonName);
                  setModelContent(
                    cloneElement(comp?.children, {
                      currentView,
                      setCurrentView,
                      refetch,
                      // closeModal: () => ref.current?.close(),
                      closeModal: () => setModalOpen(false),
                      setMessage,
                    })
                  );
                  // ref.current?.open();
                  setModalOpen(true);
                }
              }}
            >
              {buttonName}
            </button>
          </div>
        </div>
        <Table
          columns={[...columns, ...usedColumns]}
          dataSource={filteredReports?.map((report) => ({
            ...report,
            key: report.id + Math.random(),
          }))}
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
