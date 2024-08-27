import { Space, Table, Tag } from "antd";
import React from "react";

const ReportDate = () => {
  const columns = [
    {
      title: "نوع الاجراء",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "متخذ الاجراء",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "تاريخ الاجراء المتخذ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "وقت اتخاذ الاجراء ",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "حالة الاجراء",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "تم التعيين الى ",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: " ملاحظات",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "مستجدات",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "مستندات مرفقة",
      key: "tags",
      dataIndex: "tags",
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
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <>
      <div className="w-[95%] p-20 mx-auto">
        <Table
          bordered
          style={{ backgroundColor: "red !important" }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
};

export default ReportDate;
