import { Space, Table, Tag } from "antd";
import { Navbar } from "../../../import";
import useApi from "../../../utils/useApi";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const CardAdmin = () => {
  const { getData } = useApi();

  const {
    isLoading,
    error,
    data: reports,
  } = useQuery("users", () => getData("/reports"));
  console.log("🚀 ~ CardAdmin ~ data:", reports);
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
      title: "اسم البلاغ",
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
      title: "عرض",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <a>update {record.name}</a> */}
          <Link to={`/dash/${record.id}`}>عرض</Link>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  console.log(reports?.reports);

  return (
    <>
      <div className="w-[90%] mx-auto ">
        <div className="grid items-center lg:grid-cols-4 gap-6 sm:grid-cols-1 md:grid-cols-2 pt-20">
          {cards?.map((card) => (
            <div
              key={Math.random() * 10}
              className={`text-white rounded-lg p-3 flex items-center gap-6 bg-[#4CAF50]`}
            >
              <div className="space-y-2">
                <h2 className="text-lg">{card.title}</h2>
                <h2 className="text-xl font-bold">
                  {reports?.reports?.length}
                </h2>
              </div>
              <div className="self-center w-12 h-12 rounded-full bg-white flex flex-col items-center justify-center mr-auto">
                {card.icon}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Table columns={columns} dataSource={reports?.reports} />
        </div>
      </div>

      <></>
    </>
  );
};

export default CardAdmin;
