/* eslint-disable no-unused-vars */
import { Select, Space, Table, Tag } from "antd";
import { Navbar, useState } from "../../../import";
import useApi from "../../../utils/useApi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import ReportChart from "../../../charts/ReportChart";
import SelectInput from "../../forms/inputs/SelectInput";

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
  } = useQuery(["reports", ["/reports", { page: pagination }]], getData, {
    keepPreviousData: true,
  });
  console.log("🚀 ~ CardAdmin ~ data:", data);

  // const selectOptions = {
  //   reportNumber: data?.data?.reports?.map((report) => report.id) || [],
  //   classifications:
  //     data?.data?.reports?.map(
  //       (report) => report["report_classification-name"]
  //     ) || [],
  //   reporterNames:
  //     data?.data?.reports?.map((report) => report.person?.name) || [],
  //   emails: data?.data?.reports?.map((report) => report.person?.email) || [],
  //   statuses: ["جديد", "مقبول", "مرفوض"],
  //   phoneNumbers:
  //     data?.data?.reports?.map((report) => report.person?.phone) || [],
  //   dates: data?.data?.reports?.map((report) => report.date) || [],
  // };

  const selectOptions = {
    reportNumber:
      [...new Set(data?.data?.reports?.map((report) => report.id))] || [],
    classifications:
      [
        ...new Set(
          data?.data?.reports?.map(
            (report) => report["report_classification-name"]
          )
        ),
      ] || [],
    reporterNames:
      [...new Set(data?.data?.reports?.map((report) => report.person?.name))] ||
      [],
    emails:
      [
        ...new Set(data?.data?.reports?.map((report) => report.person?.email)),
      ] || [],
    // statuses: ["جديد", "مقبول", "مرفوض"],
    statuses:
      [...new Set(data?.data?.reports?.map((report) => report?.status))] || [],
    phoneNumbers:
      [
        ...new Set(data?.data?.reports?.map((report) => report.person?.phone)),
      ] || [],
    dates:
      [...new Set(data?.data?.reports?.map((report) => report.date))] || [],
  };

  // const SELECTS = [
  //   {
  //     label: "رقم البلاغ",
  //     dataIndex: "id",
  //     options: selectOptions.reportNumber,
  //   },
  //   {
  //     label: "تاريخ البلاغ",
  //     options: ["1", "2", "3"],
  //   },
  //   {
  //     label: "حالة الاعتماد",
  //     options: ["1", "2", "3"],
  //   },
  //   {
  //     label: "درجة المخاطر",
  //     options: ["1", "2", "3"],
  //   },
  //   {
  //     label: "الادارة المسند لها ",
  //     options: ["1", "2", "3"],
  //   },
  //   {
  //     label: "تاريخ الاسناد",
  //     options: ["1", "2", "3"],
  //   },
  //   {
  //     label: " حالة البلاغ",
  //     options: ["1", "2", "3"],
  //   },
  // ];

  // const SELECTS = [
  //   {
  //     label: "رقم البلاغ", // Report Number
  //     dataIndex: "id",
  //     options: [
  //       "", // Disabled placeholder

  //       ...(data?.data?.reports?.map((report) => report.id) || []),
  //     ], // Add empty string for placeholder
  //   },
  //   {
  //     label: "تصنيف البلاغ", // Report Classification
  //     dataIndex: "report_classification-name",
  //     options: [
  //       "",
  //       ...(data?.data?.reports?.map(
  //         (report) => report["report_classification-name"]
  //       ) || []),
  //     ],
  //   },
  //   {
  //     label: "اسم المبلغ", // Reporter Name
  //     dataIndex: ["person", "name"],
  //     options: [
  //       "",
  //       ...(data?.data?.reports?.map((report) => report.person?.name) || []),
  //     ],
  //   },
  //   {
  //     label: "البريد الالكترونى", // Email
  //     dataIndex: ["person", "email"],
  //     options: [
  //       "",
  //       ...(data?.data?.reports?.map((report) => report.person?.email) || []),
  //     ],
  //   },
  //   {
  //     label: "حالة البلاغ", // Report Status
  //     dataIndex: "status",
  //     options: ["", "جديد", "مقبول", "مرفوض"], // Static options with placeholder
  //   },
  //   {
  //     label: "رقم الهاتف", // Phone Number
  //     dataIndex: ["person", "phone"],
  //     options: [
  //       "",
  //       ...(data?.data?.reports?.map((report) => report.person?.phone) || []),
  //     ],
  //   },
  //   {
  //     label: "التاريخ", // Date
  //     dataIndex: "date",
  //     options: [
  //       "",
  //       ...(data?.data?.reports?.map((report) => report.date) || []),
  //     ],
  //   },
  // ];

  // const SELECTS = [
  //   {
  //     label: "رقم البلاغ", // Report Number
  //     dataIndex: "id",
  //     options: [
  //       { value: "", label: "اختر رقم البلاغ", disabled: true }, // Disabled placeholder
  //       ...(data?.data?.reports?.map((report) => ({
  //         value: report.id,
  //         label: report.id,
  //       })) || []),
  //     ],
  //   },
  //   {
  //     label: "تصنيف البلاغ", // Report Classification
  //     dataIndex: "report_classification-name",
  //     options: [
  //       { value: "", label: "اختر تصنيف البلاغ", disabled: true }, // Disabled placeholder
  //       ...(data?.data?.reports?.map((report) => ({
  //         value: report["report_classification-name"],
  //         label: report["report_classification-name"],
  //       })) || []),
  //     ],
  //   },
  //   {
  //     label: "اسم المبلغ", // Reporter Name
  //     dataIndex: ["person", "name"],
  //     options: [
  //       { value: "", label: "اختر اسم المبلغ", disabled: true }, // Disabled placeholder
  //       ...(data?.data?.reports?.map((report) => ({
  //         value: report.person?.name,
  //         label: report.person?.name,
  //       })) || []),
  //     ],
  //   },
  //   {
  //     label: "البريد الالكترونى", // Email
  //     dataIndex: ["person", "email"],
  //     options: [
  //       { value: "", label: "اختر البريد الالكترونى", disabled: true }, // Disabled placeholder
  //       ...(data?.data?.reports?.map((report) => ({
  //         value: report.person?.email,
  //         label: report.person?.email,
  //       })) || []),
  //     ],
  //   },
  //   {
  //     label: "حالة البلاغ", // Report Status
  //     dataIndex: "status",
  //     options: [
  //       { value: "", label: "اختر حالة البلاغ", disabled: true }, // Disabled placeholder
  //       { value: "جديد", label: "جديد" },
  //       { value: "مقبول", label: "مقبول" },
  //       { value: "مرفوض", label: "مرفوض" },
  //     ],
  //   },
  //   {
  //     label: "رقم الهاتف", // Phone Number
  //     dataIndex: ["person", "phone"],
  //     options: [
  //       { value: "", label: "اختر رقم الهاتف", disabled: true }, // Disabled placeholder
  //       ...(data?.data?.reports?.map((report) => ({
  //         value: report.person?.phone,
  //         label: report.person?.phone,
  //       })) || []),
  //     ],
  //   },
  //   {
  //     label: "التاريخ", // Date
  //     dataIndex: "date",
  //     options: [
  //       { value: "", label: "اختر التاريخ", disabled: true }, // Disabled placeholder
  //       ...(data?.data?.reports?.map((report) => ({
  //         value: report.date,
  //         label: report.date,
  //       })) || []),
  //     ],
  //   },
  // ];
  const SELECTS = [
    {
      label: "رقم البلاغ",
      dataIndex: "id",
      options: [
        { value: "", label: "اختر رقم البلاغ", disabled: true },
        ...Array.from(
          new Set(data?.data?.reports?.map((report) => report.id))
        ).map((value) => ({ value, label: value })),
      ],
    },
    {
      label: "تصنيف البلاغ",
      dataIndex: "report_classification-name",
      options: [
        { value: "", label: "اختر تصنيف البلاغ", disabled: true },
        ...Array.from(
          new Set(
            data?.data?.reports?.map(
              (report) => report["report_classification-name"]
            )
          )
        ).map((value) => ({ value, label: value })),
      ],
    },
    {
      label: "اسم المبلغ",
      dataIndex: ["person", "name"],
      options: [
        { value: "", label: "اختر اسم المبلغ", disabled: true },
        ...Array.from(
          new Set(data?.data?.reports?.map((report) => report.person?.name))
        ).map((value) => ({ value, label: value })),
      ],
    },
    {
      label: "البريد الالكترونى",
      dataIndex: ["person", "email"],
      options: [
        { value: "", label: "اختر البريد الالكترونى", disabled: true },
        ...Array.from(
          new Set(data?.data?.reports?.map((report) => report.person?.email))
        ).map((value) => ({ value, label: value })),
      ],
    },
    {
      label: "حالة البلاغ",
      dataIndex: "status",
      options: [
        { value: "", label: "اختر حالة البلاغ", disabled: true },
        ...["جديد", "مقبول", "مرفوض", "قيد التأكيد"].map((status) => ({
          value: status,
          label: status,
        })),
      ],
    },
    {
      label: "رقم الهاتف",
      dataIndex: ["person", "phone"],
      options: [
        { value: "", label: "اختر رقم الهاتف", disabled: true },
        ...Array.from(
          new Set(data?.data?.reports?.map((report) => report.person?.phone))
        ).map((value) => ({ value, label: value })),
      ],
    },
    {
      label: "التاريخ",
      dataIndex: "date",
      options: [
        { value: "", label: "اختر التاريخ", disabled: true },
        ...Array.from(
          new Set(data?.data?.reports?.map((report) => report.date))
        ).map((value) => ({ value, label: value })),
      ],
    },
  ];

  // const SELECTS = [
  //   {
  //     label: "رقم البلاغ", // Report Number
  //     dataIndex: "id", // Matches the 'id' column
  //     options: data?.data?.reports?.map((report) => report.id) || [], // Extract report IDs
  //   },
  //   {
  //     label: "تصنيف البلاغ", // Report Classification
  //     dataIndex: "report_classification-name", // Matches 'report_classification-name'
  //     options:
  //       data?.data?.reports?.map(
  //         (report) => report["report_classification-name"]
  //       ) || [], // Extract classification names
  //   },
  //   {
  //     label: "اسم المبلغ", // Reporter Name
  //     dataIndex: ["person", "name"], // Matches 'person.name'
  //     options: data?.data?.reports?.map((report) => report.person?.name) || [], // Extract names
  //   },
  //   {
  //     label: "البريد الالكترونى", // Email
  //     dataIndex: ["person", "email"], // Matches 'person.email'
  //     options: data?.data?.reports?.map((report) => report.person?.email) || [], // Extract emails
  //   },
  //   {
  //     label: "حالة البلاغ", // Report Status
  //     dataIndex: "status", // Matches status (adjust if needed)
  //     options: ["جديد", "مقبول", "مرفوض"], // Static options
  //   },
  //   {
  //     label: "رقم الهاتف", // Phone Number
  //     dataIndex: ["person", "phone"], // Matches 'person.phone'
  //     options: data?.data?.reports?.map((report) => report.person?.phone) || [], // Extract phone numbers
  //   },
  //   {
  //     label: "التاريخ", // Date
  //     dataIndex: "date", // Matches 'date'
  //     options: data?.data?.reports?.map((report) => report.date) || [], // Extract dates
  //   },
  // ];

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
      title: "بلاغات تحت الموافقة",
      icon: (
        <img
          src="../src/assets/icons/rotate.png"
          className="p-2 rounded-full"
        />
      ),
      bgColor: "#9DC3E6",
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
  console.log("🚀 ~ CardAdmin ~ counter:", counter);
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
  const counterValues = [
    counter.new || 0,
    counter.accepted || 0,
    counter.under_approved || 0,
    counter.confirmed || 0,
    counter.under_study || 0,
    counter.under_confirm || 0,
    counter.closed || 0,
    counter.rejected || 0,
    counter.escalated || 0,
    counter.all || 0,
  ];

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
      dataIndex: "status",
      key: "status",
      width: 150,
      render: (text) => {
        let bgColor;
        switch (text) {
          case "جديد":
            bgColor = "#33835C";
            break;
          case "مقبول":
            bgColor = "#9DC3E6";
            break;
          case "مرفوض":
            bgColor = "#FF6A6F";
            break;
          case "قيد التأكيد":
            bgColor = "#E7D066";
            break;
          default:
            bgColor = "#33835C";
        }
        return (
          <button
            style={{ backgroundColor: bgColor }}
            className="w-[115px] py-[6px] px-8 bg-[#33835C] text-white rounded-full text-[11px]
         font-semibold"
          >
            {text}
          </button>
        );
      },
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

  const [filters, setFilters] = useState(Array(SELECTS.length).fill("")); // State for selected filters
  const handleFilterChange = (index, value) => {
    const newFilters = [...filters];
    newFilters[index] = value;
    setFilters(newFilters);
  };
  const filteredReports = data?.data?.reports.filter((report) => {
    return filters.every((filter, index) => {
      if (!filter) return true; // Skip if filter is empty

      const selectConfig = SELECTS[index];
      const reportValue = (() => {
        if (Array.isArray(selectConfig.dataIndex)) {
          return selectConfig.dataIndex.reduce(
            (acc, key) => acc && acc[key],
            report
          );
        }
        return report[selectConfig.dataIndex];
      })();

      // Compare the report value with the selected filter
      return reportValue ? reportValue.toString() === filter.toString() : false;
    });
  });
  console.log("🚀 ~ filteredReports ~ filteredReports:", data.data);

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
                  {counterValues[i]}
                </h2>
              </div>
              <div style={{ backgroundColor: card.bgColor }}>
                <div
                  className={`w-12 h-12 rounded-full flex flex-col items-center justify-center border border-white border-opacity-30 ${
                    i === 3 || i === 0 || i === 6 || i === 1
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
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8  my-8 gap-5 ">
            {/* {SELECTS.map((sel, index) => (
              <div className="flex flex-col" key={sel}>
                <label className="text-sm font-bold">{sel.label}</label>
                <select
                  // defaultValue={""}
                  value={filters[index]}
                  onChange={(e) => handleFilterChange(index, e.target.value)}
                  className="!bg-white border-none outline-none !p-2 mt-2 rounded-md w-full scrollbar scrollbar-w-2 scrollbar-thumb-[#33835c] scrollbar-thumb-rounded-full"
                >
                  {sel.options.map((opt) => (
                    <option
                      key={opt}
                      className="text-sm"
                      disabled={opt.disabled}
                    >
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            ))} */}
            {SELECTS.map((sel, index) => (
              <div className="flex flex-col" key={sel.label}>
                <label className="text-sm font-bold">{sel.label}</label>
                <Select
                  value={filters[index]} // Ensure undefined for no selection
                  onChange={(value) => handleFilterChange(index, value)}
                  className="mt-2"
                  placeholder={`...${sel.label}`} // Custom placeholder
                  style={{ width: "100%" }}
                  // dropdownStyle={{ width: "150px" }}
                  popupMatchSelectWidth={false}
                  // dropdownClassName="scrollbar scrollbar-w-2 scrollbar-thumb-[#33835c] scrollbar-thumb-rounded-full" // Tailwind scrollbar styles
                  // options={sel.options.map((opt) => ({
                  //   value: opt,
                  //   label: <span className="text-sm">{opt}</span>, // Customize the label styling here
                  // }))}
                  options={sel.options}
                />
              </div>
            ))}
            <button
              className="bg-[#33835c] self-end p-2 py-1 w-auto text-white rounded-md"
              onClick={() => setFilters(Array(SELECTS.length).fill(""))}
            >
              اعادة
            </button>
          </div>
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
              pageSize: 15,
              total: data?.meta?.reports?.totalItems,
              showSizeChanger: false,
              onChange: (pageNumber) => {
                setPagination(pageNumber);
                localStorage.setItem("pageNumber", pageNumber);
                setFilters(Array(SELECTS.length).fill("")); // Reset filters on page change
              },

              // defaultPageSize: _reports.length
            }}
            dataSource={filteredReports}
          />
        </div>
      </div>
    </>
  );
};

export default CardAdmin;
