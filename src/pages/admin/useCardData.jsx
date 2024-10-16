/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Users from "../../models/Users";
import Departments from "./Departments";
import Roles from "../../models/Roles";
import useApi from "../../utils/useApi";
import { useQuery } from "react-query";
import MyCard from "../../models/MyCard";
import RiskTypes from "../../models/RiskTypes";
import DeptCard from "../../component/managersComponetns/DeptCard";
import RoleCard from "../../component/managersComponetns/RoleCard";
import SpecCard from "../../component/managersComponetns/SpecCard";
import RiskCard from "../../component/managersComponetns/RiskCard";
import UserCard from "../../component/managersComponetns/UserCard";
import Classifications from "../../models/Classifications";

const useData = () => {
  const [currentView, setCurrentView] = useState("default");
  const { getData } = useApi();
  const [pagination, setPagination] = useState(1);

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
        <Roles currentView={currentView} setCurrentView={setCurrentView} />
      ),
      columns: [
        {
          title: "الصلاحيات",
          dataIndex: "name",
          key: "id",
        },
      ],
      apiKey: "/admin/roles",
      cardCh: <RoleCard />,
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
      cardCh: <SpecCard />,
    },
    {
      icon: "../src/assets/icons/manager_3.svg",
      title: "أنواع الخطر",
      buttons: ["عرض أنواع الخطر", "إضافة نوع للخطر"],
      children: (
        <RiskTypes currentView={currentView} setCurrentView={setCurrentView} />
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
      cardCh: <RiskCard />,
    },
    {
      icon: "../src/assets/icons/manager_4.svg",
      title: "الإدارات",
      buttons: ["عرض الإدارات", "إنشاء إدارة"],
      children: (
        <Departments
          currentView={currentView}
          setCurrentView={setCurrentView}
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
      cardCh: <DeptCard />,
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
        <Users currentView={currentView} setCurrentView={setCurrentView} />
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
          dataIndex: "user_name",
          key: "id",
        },
      ],
      apiKey: "/admin/users",
      cardCh: <UserCard />,
    },
    {
      icon: "../src/assets/icons/manager_1.svg",
      title: "التصنيفات",
      buttons: ["عرض التصنيفات", "إضافة تصنيف"],
      children: (
        <Classifications
          currentView={currentView}
          setCurrentView={setCurrentView}
          refetch={refetch}
        />
      ),
      columns: [
        {
          title: "التصنيف",
          dataIndex: "name",
          key: "id",
        },
      ],
      apiKey: "/admin/report-classification",
      cardCh: (
        <Classifications
          currentView={currentView}
          setCurrentView={setCurrentView}
          refetch={refetch}
        />
      ),
    },
  ];
  return { cardData };
};

export default useData;
