import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardDiv from "./UI/CardDiv";
import Modal from "./UI/Modal";
import ReportModel from "../models/ReportModel";
import { set } from "react-hook-form";

import ReportEscalation from "../models/ReportEscalation";
import ReportInfo from "../models/ReportInfo";
import ReportLock from "../models/ReportLock";

const ReportMenu = ({ setShowMenu, func, showModal, setShowSvg }) => {
  const navigate = useNavigate();
  const myRef = useRef(null);
  const optionItems = [
    {
      id: 1,
      title: "استلام البلاغ",
      children: <ReportModel setShowSvg={setShowSvg}></ReportModel>,
    },
    {
      id: 2,
      title: "اعداد دراسة اولية",
      path: "preparingStudy",
    },
    {
      id: 3,
      title: "توجيه الدراسة الاولية للاعتماد",
    },
    {
      id: 4,
      title: "التعديل على الدراسة الاولية",
    },
    {
      id: 5,
      title: "اسناد البلاغ",
    },
    {
      id: 6,
      title: "طلب مستجدات",
      children: (
        <ReportModel setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModel>
      ),
    },
    {
      id: 7,
      title: "اضافة مستجدات",
      children: (
        <ReportModel setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModel>
      ),
    },
    {
      id: 8,
      title: "استلام البلاغ",
    },
    {
      id: 9,
      title: "طلب معلومات",
      children: (
        <ReportModel setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModel>
      ),
    },
    {
      id: 10,
      title: "اضافة معلومات",
      children: (
        <ReportModel setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModel>
      ),
    },
    {
      id: 11,
      title: "اضافة ملاحظات",
      children: (
        <ReportModel setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModel>
      ),
    },
    {
      id: 12,
      title: "اقفال البلاغ",
      children: (
        <ReportModel title="اتخاذ اجراء" setShowSvg={setShowSvg}>
          <ReportLock />
        </ReportModel>
      ),
    },
    {
      id: 13,
      title: "تصعيد البلاغ",
      children: (
        <ReportModel setShowSvg={setShowSvg}>
          <ReportEscalation />
        </ReportModel>
      ),
    },
  ];

  const clickModal = (children) => {
    func(children);
    setShowMenu(false);
  };
  return (
    <ul>
      {optionItems.map((opt) => (
        <li
          onClick={() => {
            setShowSvg(true);
            !!opt.path ? navigate(opt.path) : clickModal(opt.children);
          }}
          className="py-[5px] px-[10px] cursor-pointer border border-gray-100"
          key={opt.id}
        >
          {opt.title}
        </li>
      ))}
    </ul>
  );
};

export default ReportMenu;
