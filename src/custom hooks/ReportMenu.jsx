/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ReportEscalation from "../models/ReportEscalation";
import ReportInfo from "../models/ReportInfo";
import ReportLock from "../models/ReportLock";
import StudyContext from "../store/StudyContext";
import ReportModal from "../models/ReportModal";

const ReportMenu = ({ setShowMenu, func, showModal, setShowSvg, status }) => {
  const navigate = useNavigate();
  const { handleHideMenu } = useContext(StudyContext);
  const optionItems = [
    {
      id: 1,
      title: "استلام البلاغ",
      children: (
        <ReportModal
          title="استلام البلاغ"
          setShowSvg={setShowSvg}
        ></ReportModal>
      ),
      disabled: false,
    },
    {
      id: 2,
      title: "اعداد دراسة اولية",
      path: "preparingStudy",
      disabled: false,
    },
    {
      id: 3,
      title: "توجيه الدراسة الاولية للاعتماد",
      path: "preparingStudy",
      disabled: false,
    },
    {
      id: 4,
      title: "التعديل على الدراسة الاولية",
      disabled: false,
    },
    {
      id: 5,
      title: "اسناد البلاغ",
      disabled: false,
    },
    {
      id: 6,
      title: "طلب مستجدات",
      children: (
        <ReportModal setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
      disabled: false,
    },
    {
      id: 7,
      title: "اضافة مستجدات",
      children: (
        <ReportModal setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
      disabled: false,
    },
    {
      id: 8,
      title: "استلام البلاغ",
      disabled: false,
    },
    {
      id: 9,
      title: "طلب معلومات",
      children: (
        <ReportModal setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
      disabled: false,
    },
    {
      id: 10,
      title: "اضافة معلومات",
      children: (
        <ReportModal setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
      disabled: false,
    },
    {
      id: 11,
      title: "اضافة ملاحظات",
      children: (
        <ReportModal setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
      disabled: false,
    },
    {
      id: 12,
      title: "اقفال البلاغ",
      children: (
        <ReportModal title="اتخاذ اجراء" setShowSvg={setShowSvg}>
          <ReportLock />
        </ReportModal>
      ),
      disabled: false,
    },
    {
      id: 13,
      title: "تصعيد البلاغ",
      children: (
        <ReportModal setShowSvg={setShowSvg}>
          <ReportEscalation />
        </ReportModal>
      ),
      disabled: false,
    },
  ];

  const clickModal = (children) => {
    func(children);
  };
  const navigateTo = (path, state) => {
    handleHideMenu();
    navigate(path, state);
  };

  console.log(status);
  return (
    <ul className="h-full">
      {optionItems.map((opt) => (
        <li
          onClick={() => {
            if (status === "rejected") {
              opt.disabled = true;
              return;
            }
            setShowSvg(true);
            !!opt?.path
              ? navigateTo(opt.path, {
                  state: { index: opt.id, closeModal: true },
                })
              : clickModal(opt.children);
          }}
          className={`py-[5px] px-[10px]  border border-gray-100 text-[16px] ${
            status === "rejected"
              ? "text-gray-400 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          key={opt.id}
        >
          {opt.title}
        </li>
      ))}
    </ul>
  );
};

export default ReportMenu;
