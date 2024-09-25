/* eslint-disable no-unused-vars */
import { Space, Table, Tag } from "antd";
import { Navbar, useState } from "../../../import";
import useApi from "../../../utils/useApi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ReportChart from "../../../charts/ReportChart";
import SelectInput from "../../forms/inputs/SelectInput";

const SELECTS = [
  {
    label: "رقم البلاغ",
    options: ["1", "2", "3"],
  },
  {
    label: "تاريخ البلاغ",
    options: ["1", "2", "3"],
  },
  {
    label: "حالة الاعتماد",
    options: ["1", "2", "3"],
  },
  {
    label: "درجة المخاطر",
    options: ["1", "2", "3"],
  },
  {
    label: "الادارة المسند لها ",
    options: ["1", "2", "3"],
  },
  {
    label: "تاريخ الاسناد",
    options: ["1", "2", "3"],
  },
  {
    label: " حالة البلاغ",
    options: ["1", "2", "3"],
  },
];

const CardAdmin = () => {
  const { getData } = useApi();
  const [edit, setEdit] = useState(false);

  let [pagination, setPagination] = useState(
    localStorage.getItem("pageNumber") || 1
  );
  const {
    isLoading,
    error,
    data = {},
  } = useQuery(["users", ["/reports", { page: pagination }]], getData);

  console.log(data?.data?.reports[0]);

  let cards = [
    {
      title: "بلاغات جديدة",
      icon: (
        <img
          src="../src/assets/icons/report_Vector.png"
          className="p-2 rounded-full h-[61%] w-[61%] bg-[#33835C]"
        />
      ),
      bgColor: "#4CAF50",
    },
    {
      title: "بلاغات مقبولة",
      icon: (
        <img
          src="../src/assets/icons/report_Vector.png"
          className="p-2 rounded-full h-[61%] w-[61%] bg-[#6de487]"
        />
      ),
      bgColor: "#6de487",
    },
    {
      title: "بلاغات تحت الاعتماد",
      icon: (
        <img
          src="../src/assets/icons/rotate.png"
          className="p-2 rounded-full"
        />
      ),
      bgColor: "#E7D066",
    },
    {
      title: "بلاغات معتمدة",
      icon: (
        <img
          src="../src/assets/icons/report_Vector.png"
          className="p-2 rounded-full h-[61%] w-[61%] bg-[#9DC3E6]"
        />
      ),
      bgColor: "#9DC3E6",
    },
    {
      title: "بلاغات مسندة تحت الدراسة",
      icon: (
        <img
          src="../src/assets/icons/rotate.png"
          className="p-2 rounded-full"
        />
      ),
      bgColor: "#EB974B",
    },
    {
      title: "بلاغات مقفلة",
      icon: (
        <img
          src="../src/assets/icons/report_Vector.png"
          className="p-2 rounded-full h-[61%] w-[61%] bg-[#3865A3]"
        />
      ),
      bgColor: "#3865A3",
    },
    {
      title: "بلاغات مرفوضة",
      icon: (
        <img
          src="../src/assets/icons/delete.png"
          className="p-2 rounded-full"
        />
      ),
      bgColor: "#FF6A6F",
    },
    {
      title: "بلاغات تحت التصعيد",
      icon: (
        <img
          src="../src/assets/icons/edit_report.png"
          className="p-2 rounded-full"
        />
      ),
      bgColor: "#df5f5f",
    },
    {
      title: "اجمالى البلاغات المستلمة",
      icon: (
        <img
          src="../src/assets/icons/edit_report.png"
          className="p-2 rounded-full"
        />
      ),
      bgColor: "#5F5F5F",
    },
  ];

  let { data: { counter = {} } = {} } = data;
  // let counter = {
  //   new: 75,
  //   accepted: 0,
  //   rejected: 0,
  //   under_confirm: 1,
  //   confirmed: 2,
  //   under_approved: 0,
  //   under_study: 0,
  //   closed: 0,
  //   escalated: 0,
  //   all: 78,
  // };

  console.log("🚀 ~ CardAdmin ~ counters:", Object.values(counter));

  //   {
  //     "id": 42,
  //     "status": "new",
  //     "number": "UlJ42",
  //     "has_decision": false,
  //     "certified": "UlJ42",
  //     "age": "منذ 4 ساعات",
  //     "date": "23-09-2024",
  //     "date_of_assignment": "23-09-2024",
  //     "classification": null,
  //     "management_assigned_to": null,
  //     "processing_time": null,
  //     "risk_assessment": null
  // }
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
      dataIndex: ["report_classification-name"],
      key: "report_classification['name']",
      width: 200,
      render: (text, record) => <Link to={`/dash/${record.id}`}>{text}</Link>,
    },
    {
      title: "اسم المبلغ",
      dataIndex: ["person", "name"],
      key: "user['name']",
      width: 200,
    },
    {
      title: "البريد الالكترونى",
      dataIndex: ["person", "email"],
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
      dataIndex: ["person", "phone"],
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
  console.log(data);
  // let _reports = data?.data?.reports
  //   ?.map((report) => {
  //     if (report.date === "") {
  //       report.date = "لا يوجد";
  //     }
  //     if (report.user.name.trim() === "") {
  //       report.user.name = "لا يوجد";
  //     }
  //     if (report.user.phone.trim() === "") {
  //       report.user.phone = "لا يوجد";
  //     }
  //     return report;
  //   })
  //   .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return (
    <>
      <div className="w-[90%] mx-auto">
        <div className="grid items-center lg:grid-cols-4 gap-6 sm:grid-cols-1 md:grid-cols-2 pt-20">
          {cards?.map((card, i) => (
            <div
              key={Math.random() * 10}
              className={`text-white mb-4 rounded-lg p-3 flex flex-row-reverse justify-between items-center gap-6 `}
              style={{ backgroundColor: card.bgColor }}
            >
              <div className="space-y-2">
                <h2 className="text-[15px] text-[#fff]">{card.title}</h2>
                <h2 className="text-4xl text-[#fff] font-bold text-center">
                  {/* {data?.meta?.reports?.totalItems} */}
                  {Object.values(counter)[i]}
                </h2>
              </div>
              <div style={{ backgroundColor: card.bgColor }}>
                <div
                  className={`w-12 h-12 rounded-full flex flex-col items-center justify-center border border-white border-opacity-30 ${
                    i === 3 || i === 0 || i === 5 || i === 1
                      ? "bg-white/100"
                      : "bg-white/5"
                  }`}
                >
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          {/* <ReportChart data={data} /> */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8  my-8 gap-10">
            {SELECTS.map((sel) => (
              <div className="flex flex-col">
                <label>{sel.label}</label>
                <select
                  defaultValue={""}
                  className="!bg-white border-none outline-none !p-2 mt-2 rounded-md"
                >
                  {sel.options.map((opt) => (
                    <option>{opt}</option>
                  ))}
                </select>
              </div>
            ))}
            <button className="bg-[#33835c] self-end p-2 text-white rounded-md">
              اعادة
            </button>
          </div> */}
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
            dataSource={data?.data?.reports}
          />
        </div>
      </div>
    </>
  );
};

export default CardAdmin;
