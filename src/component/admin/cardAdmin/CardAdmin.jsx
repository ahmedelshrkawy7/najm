import { Space, Table, Tag } from "antd";
import { Navbar, useState } from "../../../import";
import useApi from "../../../utils/useApi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const CardAdmin = () => {
  const { getData } = useApi();
  let [pagination, setPagination] = useState(1);
  const { isLoading, error, data } = useQuery(
    ["users", ["/reports", pagination]],
    getData,
    { keepPreviousData: true }
  );

  let cards = [
    {
      title: "بلاغات جديدة",
      icon: (
        <img src="../src/assets/icons/Group.svg" className="p-2 rounded-full" />
      ),
      bgColor: "#4CAF50",
    },
  ];

  const columns = [
    {
      title: "رقم البلاغ",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "تصنيف البلاغ",
      dataIndex: ["report_classification", "name"],
      key: "report_classification['name']",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "اسم المبلغ",
      dataIndex: ["user", "name"],
      key: "user['name']",
    },
    {
      title: "البريد الالكترونى",
      dataIndex: ["user", "email"],
      key: "user['email']",
    },

    {
      title: "رقم الهاتف",
      dataIndex: ["user", "phone"],
      key: "user['phone']",
    },
    {
      title: "التاريخ",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a>update {record.name}</a> */}
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

  // const pageNumber = Math.ceil(reports?.meta?.reports.totalItems/);
  console.log(data);
  return (
    <>
      {!isLoading ? (
        <div className="w-[90%] mx-auto ">
          <div className="grid items-center lg:grid-cols-4 gap-6 sm:grid-cols-1 md:grid-cols-2 pt-20">
            {cards?.map((card) => (
              <div
                key={Math.random() * 10}
                className={`text-white border-2 mb-4 border-[#33835C] rounded-lg p-3 flex flex-row-reverse justify-between items-center gap-6 bg-[#33835C1A]`}
              >
                <div className="space-y-2">
                  <h2 className="text-lg text-[#33835C]">{card.title}</h2>
                  <h2 className="text-4xl text-[#33835C] font-bold text-center">
                    {/* {_reports.length} */}
                  </h2>
                </div>
                <div className="  w-12 h-12 rounded-full bg-white flex flex-col items-center justify-center ">
                  {card.icon}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Table
              style={{ backgroundColor: "red !important" }}
              columns={columns}
              pagination={{
                current: pagination,
                pageSize: 25,
                total: data?.meta?.reports?.totalItems,
                showSizeChanger: false,
                onChange: (pageNumber) => {
                  setPagination(pageNumber);
                },

                // defaultPageSize: _reports.length
              }}
              dataSource={_reports}
            />
          </div>
        </div>
      ) : (
        <diV className=" w-full h-[650px] flex justify-center items-center">
          <div className="loader"></div>
        </diV>
      )}
    </>
  );
};

export default CardAdmin;
