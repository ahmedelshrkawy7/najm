/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { useState } from "react";
import ManagerCard from "./ManagerCard";
import MyCard from "../../models/MyCard";
import { Radio, Select, Input } from "antd";

const AdminManager = () => {
  const [currentView, setCurrentView] = useState("default");
  const { Option } = Select;

  const cardData = [
    {
      icon: "../src/assets/icons/manager_1.svg",
      title: "الصلاحيات",
      buttons: ["عرض الصلاحيات", "إضافة صلاحية"],
      children: (
        <div className="flex flex-col gap-2 h-36 justify-between">
          <div className="flex flex-col gap-2 sm:w-1/2 md:w-[40%] lg:w-1/2 w-full">
            <label htmlFor="dept_name" className="font-medium">
              اسم الادارة
            </label>
            <input
              type="text"
              id="dept_name"
              className="border border-gray-300 p-2 rounded-md outline-none w-full"
              placeholder="الادارة العامة لشئون الوافدين"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={() => {
                setCurrentView("success");
              }}
              className=" bg-[#33835C] text-white p-2 px-10 rounded-lg outline-none"
            >
              اضافة
            </button>
          </div>
        </div>
      ),
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
    },
    {
      icon: "../src/assets/icons/manager_3.svg",
      title: "أنواع الخطر",
      buttons: ["عرض أنواع الخطر", "إضافة نوع للخطر"],
      children: (
        <div className="flex flex-col gap-2 justify-between">
          <div className="py-3">
            <div className="flex items-center mb-4 gap-2">
              <span className="font-bold ">نوع الخطر:</span>
              <Radio.Group defaultValue="main">
                <Radio value="main">رئيسي</Radio>
                <Radio value="branch">فرعي</Radio>
              </Radio.Group>
            </div>

            <div className="flex gap-4 flex-wrap lg:flex-nowrap">
              <div className="flex flex-col w-full md:w-1/3">
                <label className="mb-2">نوع الخطر</label>
                <Select defaultValue="الاختلاس" className="w-full">
                  <Option value="اختلاس">الاختلاس</Option>
                  <Option value="احتيال">الاحتيال</Option>
                </Select>
              </div>

              <div className="flex flex-col w-full md:w-1/3">
                <label className="mb-2">وزن البلغ</label>
                <Select defaultValue="A" className="w-full">
                  <Option value="A">A</Option>
                  <Option value="B">B</Option>
                </Select>
              </div>

              <div className="flex flex-col w-full md:w-1/3">
                <label className="mb-2">عدد الأيام</label>
                <Input defaultValue="21 يوم" className="w-full" />
              </div>
            </div>
          </div>{" "}
          <div className="flex items-center justify-end">
            <button
              onClick={() => {
                setCurrentView("success");
              }}
              className=" bg-[#33835C] text-white p-2 px-10 rounded-lg outline-none"
            >
              اضافة
            </button>
          </div>
        </div>
      ),
    },
    {
      icon: "../src/assets/icons/manager_4.svg",
      title: "الإدارات",
      buttons: ["عرض الإدارات", "إنشاء إدارة"],
      children: (
        <div className="flex flex-col gap-2 h-36 justify-between">
          <div>data</div>
          <div className="flex items-center justify-end">
            <button
              onClick={() => {
                setCurrentView("success");
              }}
              className=" bg-[#33835C] text-white p-2 px-10 rounded-lg outline-none"
            >
              اضافة
            </button>
          </div>
        </div>
      ),
    },
    {
      icon: "../src/assets/icons/manager_1.svg",
      title: "المستخدمين",
      buttons: ["عرض المستخدمين", "إضافة مستخدم"],
      children: (
        <div className="flex flex-col gap-2 h-36 justify-between">
          <div>data</div>
          <div className="flex items-center justify-end">
            <button
              onClick={() => {
                setCurrentView("success");
              }}
              className=" bg-[#33835C] text-white p-2 px-10 rounded-lg outline-none"
            >
              اضافة
            </button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-[90%] mx-auto">
      <div className="min-h-screen bg-[#E6E6E6] flex items-center justify-center p-4 my-20 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminManager);
