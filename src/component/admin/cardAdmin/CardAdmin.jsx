/* eslint-disable no-unused-vars */
import { Space, Table, Tag } from "antd";
import { Navbar, useState } from "../../../import";
import useApi from "../../../utils/useApi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ReportChart from "../../../charts/ReportChart";
import ReportModel from "../../../models/ReportModel";
import { useRef } from "react";
import ReportLock from "../../../models/ReportLock";
import Model from "../../../models/Model";
const CardAdmin = () => {
  const { getData } = useApi();
  const [edit, setEdit] = useState(false);
  let [pagination, setPagination] = useState(
    localStorage.getItem("pageNumber") || 1
  );
  const { isLoading, error, data } = useQuery(
    ["users", ["/reports", { page: pagination }]],
    getData
  );
  console.log(data);
  let cards = [
    {
      title: "بلاغات جديدة",
      icon: (
        <img src="../src/assets/icons/Group.svg" className="p-2 rounded-full" />
      ),
      bgColor: "#4CAF50",
    },
  ];

  console.log(data);

  // const columns = [
  //   {
  //     title: "رقم البلاغ",
  //     dataIndex: "id",
  //     key: "id",
  //     render: (text) => <p>{text}</p>,
  //   },
  //   {
  //     title: "تصنيف البلاغ",
  //     dataIndex: ["report_classification", "name"],
  //     key: "report_classification['name']",
  //     render: (text, record) =>
  //       edit ? (
  //         <form
  //           onSubmit={async (e) => {
  //             e.preventDefault();
  //             const data = await editReportData(
  //               record.report_classification.id,
  //               {
  //                 name_ar: record.report_classification.name,
  //                 name_en: record.report_classification.name,
  //                 _method: "PUT",
  //               }
  //             );
  //             console.log("hello world");
  //             setEdit(false);
  //           }}
  //         >
  //           <input type="text" />
  //         </form>
  //       ) : (
  //         <Link to={`/dash/${record.id}`}>{text}</Link>
  //       ),
  //   },
  //   {
  //     title: "اسم المبلغ",
  //     dataIndex: ["user", "name"],
  //     key: "user['name']",
  //   },
  //   {
  //     title: "البريد الالكترونى",
  //     dataIndex: ["user", "email"],
  //     key: "user['email']",
  //   },
  //   {
  //     title: "حالة البلاغ",
  //     dataIndex: "_",
  //     key: "id",
  //     render: (_) => (
  //       <button className="p-1 bg-[#33835C] text-white px-7 rounded-full text-[11px]">
  //         {"جديد"}
  //       </button>
  //     ),
  //   },
  //   {
  //     title: "رقم الهاتف",
  //     dataIndex: ["user", "phone"],
  //     key: "user['phone']",
  //   },
  //   {
  //     title: "التاريخ",
  //     dataIndex: "date",
  //     key: "date",
  //   },
  //   {
  //     title: "",
  //     key: "action",
  //     render: (_, record) => (
  //       <Space size="middle">
  //         {/* <a>update {record.name}</a> */}
  //         <Link to={`/dash/${record.id}`}>عرض</Link>
  //         {/* <button
  //           onClick={async () => {
  //             setEdit(true);
  //           }}
  //         >
  //           تعديل
  //         </button> */}
  //       </Space>
  //     ),
  //   },
  // ];

  const columns = [
    {
      title: "رقم البلاغ",
      dataIndex: "id",
      key: "id",
      width: 150,
      render: (text) => <p>{text}</p>,
    },
    {
      title: "تصنيف البلاغ",
      dataIndex: ["report_classification", "name"],
      key: "report_classification['name']",
      width: 200,
      render: (text, record) => <Link to={`/dash/${record.id}`}>{text}</Link>,
    },
    {
      title: "اسم المبلغ",
      dataIndex: ["user", "name"],
      key: "user['name']",
      width: 200,
    },
    {
      title: "البريد الالكترونى",
      dataIndex: ["user", "email"],
      key: "user['email']",
      width: 250,
    },
    {
      title: "حالة البلاغ",
      dataIndex: "_",
      key: "id",
      width: 150,
      render: (_) => (
        <button className="p-1 bg-[#33835C] text-white px-8 rounded-full text-[12px]">
          {"جديد"}
        </button>
      ),
    },
    {
      title: "رقم الهاتف",
      dataIndex: ["user", "phone"],
      key: "user['phone']",
      width: 150,
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
      width: 200,
    },
    {
      title: "",
      key: "action",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/dash/${record.id}`}>عرض</Link>
        </Space>
      ),
    },
  ];

  let _reports = data?.data?.reports
    ?.map((report) => {
      if (report.date === "") {
        report.date = "لا يوجد تاريخ";
        return report;
      }
      return report;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <>
      <div className="w-[90%] mx-auto">
        <div className="grid items-center lg:grid-cols-4 gap-6 sm:grid-cols-1 md:grid-cols-2 pt-20">
          {cards?.map((card) => (
            <div
              key={Math.random() * 10}
              className={`text-white border-2 mb-4 border-[#33835C] rounded-lg p-3 flex flex-row-reverse justify-between items-center gap-6 bg-[#33835C1A]`}
            >
              <div className="space-y-2">
                <h2 className="text-lg text-[#33835C]">{card.title}</h2>
                <h2 className="text-4xl text-[#33835C] font-bold text-center">
                  {data?.meta?.reports?.totalItems}
                </h2>
              </div>
              <div className="  w-12 h-12 rounded-full bg-white flex flex-col items-center justify-center ">
                {card.icon}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          {/* <ReportChart data={data} /> */}
          <Table
            style={{ backgroundColor: "red !important" }}
            columns={columns}
            loading={{
              spinning: isLoading,
              indicator: (
                <diV className=" w-full h-[650px] flex justify-center items-center">
                  <div className="loader"></div>
                </diV>
              ),
            }}
            pagination={{
              current: pagination,
              pageSize: 25,
              total: data?.meta?.reports?.totalItems,
              showSizeChanger: false,
              onChange: (pageNumber) => {
                setPagination(pageNumber);
                localStorage.setItem("pageNumber", pageNumber);
              },

              // defaultPageSize: _reports.length
            }}
            dataSource={_reports}
          />
        </div>
      </div>
    </>
  );
};

export default CardAdmin;
