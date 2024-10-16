/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ManagerCard from "./ManagerCard";
import MyCard from "../../models/MyCard";
import { Radio, Select, Input } from "antd";
import Departments from "./Departments";
import useApi from "../../utils/useApi";
import { useQuery } from "react-query";
import Users from "../../models/Users";
import Roles from "../../models/Roles";
import RiskTypes from "../../models/RiskTypes";

const AdminManager = () => {
  const [currentView, setCurrentView] = useState("default");
  const [pagination, setPagination] = useState(1);
  const { Option } = Select;
  const { getData } = useApi();

  const { data: { data = [] } = {}, refetch } = useQuery(
    ["admin", ["/admin/departments", { page: pagination }]],
    getData,
    { refetchInterval: 0 }
  );

  let departs = data?.map((ele) => ({
    department: ele.name,
    id: ele.id,
  }));

  const { data: { data: sections = [] } = {} } = useQuery(
    ["admin", ["/admin/specializations", ""]],
    getData,
    { refetchInterval: 0 }
  );

  const cardData = [
    {
      icon: "../src/assets/icons/manager_1.svg",
      title: "الصلاحيات",
      buttons: ["عرض الصلاحيات", "إضافة صلاحية"],
      children: (
        // <div className="flex flex-col gap-2 h-36 justify-between">
        //   <div className="flex flex-col gap-2 sm:w-1/2 md:w-[40%] lg:w-1/2 w-full">
        //     <label htmlFor="dept_name" className="font-medium">
        //       اسم الادارة
        //     </label>
        //     <input
        //       type="text"
        //       id="dept_name"
        //       className="border border-gray-300 p-2 rounded-md outline-none w-full"
        //       placeholder="الادارة العامة لشئون الوافدين"
        //     />
        //   </div>
        //   <div className="flex items-center justify-end">
        //     <button
        //       onClick={() => {
        //         setCurrentView("success");
        //       }}
        //       className=" bg-[#33835C] text-white p-2 px-10 rounded-lg outline-none"
        //     >
        //       اضافة
        //     </button>
        //   </div>
        // </div>
        <Roles
          currentView={currentView}
          setCurrentView={setCurrentView}
          refetch={refetch}
        />
      ),
      columns: [
        {
          title: "الصلاحيات",
          dataIndex: "name",
          key: "id",
        },
      ],
      apiKey: "/admin/roles",
    },
    {
      icon: "../src/assets/icons/manager_2.svg",
      title: "الأقسام",
      buttons: ["عرض الأقسام", "إنشاء قسم"],
      children: (
        <MyCard
          name=""
          currentView={currentView}
          setCurrentView={setCurrentView}
          refetch={refetch}
        />
      ),
      data: sections,
      columns: [
        {
          title: "الادارة",
          dataIndex: "department",
          key: "id",
        },
        {
          title: "الاقسام",
          dataIndex: "name",
          key: "id",
        },
      ],
      apiKey: "/admin/specializations",
    },
    {
      icon: "../src/assets/icons/manager_3.svg",
      title: "أنواع الخطر",
      buttons: ["عرض أنواع الخطر", "إضافة نوع للخطر"],
      children: (
        <RiskTypes
          currentView={currentView}
          setCurrentView={setCurrentView}
          refetch={refetch}
        />
      ),
      columns: [
        {
          title: "الرئيسي",
          dataIndex: "main",
          key: "id",
        },
        {
          title: "الفرعى",
          dataIndex: "branch",
          key: "id",
        },
      ],
      apiKey: "/admin/risk-types",
    },
    {
      icon: "../src/assets/icons/manager_4.svg",
      title: "الإدارات",
      buttons: ["عرض الإدارات", "إنشاء إدارة"],
      children: (
        <Departments
          currentView={currentView}
          setCurrentView={setCurrentView}
          refetch={refetch}
        />
      ),
      data: departs,
      columns: [
        {
          title: "الادارات",
          dataIndex: "name",
          key: "id",
        },
      ],
      apiKey: "/admin/departments",
    },
    {
      icon: "../src/assets/icons/manager_1.svg",
      title: "المستخدمين",
      buttons: ["عرض المستخدمين", "إضافة مستخدم"],
      children: (
        // <div className="flex flex-col gap-2 h-36 justify-between">
        // <div className="flex items-center mb-4 gap-2">
        //   <span className="font-bold ">نوع المستخدم:</span>
        //   <Radio.Group defaultValue="main">
        //     <Radio value="main">دائم</Radio>
        //     <Radio value="branch">مؤقت</Radio>
        //   </Radio.Group>
        // </div>{" "}
        //   <div className="flex items-center justify-end">
        // <button
        //   onClick={() => {
        //     setCurrentView("success");
        //   }}
        //   className=" bg-[#33835C] text-white p-2 px-10 rounded-lg outline-none"
        // >
        //   اضافة
        // </button>
        //   </div>
        // </div>
        <Users
          currentView={currentView}
          setCurrentView={setCurrentView}
          refetch={refetch}
        />
      ),
      columns: [
        {
          title: "الادارة",
          dataIndex: ["department", "name"],
          key: "id",
        },
        {
          title: "الاقسام",
          dataIndex: ["specialization", "name"],
          key: "id",
        },
        {
          title: "المستخدمين",
          dataIndex: "name",
          key: "id",
        },
      ],
      apiKey: "/admin/users",
    },
  ];

  return (
    <div className="w-[90%] mx-auto">
      <div className="min-h-screen bg-[#E6E6E6] flex items-center justify-center p-4 my-20 rounded-lg relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {cardData.map((card, index) => (
            <ManagerCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              buttons={card.buttons}
              ch={card.children}
              index={index}
              currentView={currentView}
              setCurrentView={setCurrentView}
              data={card.data || []}
              columns={card.columns || []}
              apiKey={card?.apiKey}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminManager);
