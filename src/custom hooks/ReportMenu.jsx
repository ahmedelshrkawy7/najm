import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import ReportEscalation from "../models/ReportEscalation";
import ReportInfo from "../models/ReportInfo";
import ReportLock from "../models/ReportLock";
import StudyContext from "../store/StudyContext";
import ReportModal from "../models/ReportModal";

const ReportMenu = ({ setShowMenu, func, showModal, setShowSvg }) => {
  const navigate = useNavigate();
  const { handleHideMenu } = useContext(StudyContext);
  const optionItems = [
    {
      id: 1,
      title: "استلام البلاغ",
      children: <ReportModal setShowSvg={setShowSvg}></ReportModal>,
    },
    {
      id: 2,
      title: "اعداد دراسة اولية",
      path: "preparingStudy",
    },
    {
      id: 3,
      title: "توجيه الدراسة الاولية للاعتماد",
      path: "preparingStudy",
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
        <ReportModal setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
    },
    {
      id: 7,
      title: "اضافة مستجدات",
      children: (
        <ReportModal setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
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
        <ReportModal setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
    },
    {
      id: 11,
      title: "اضافة ملاحظات",
      children: (
        <ReportModal setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
    },
    {
      id: 12,
      title: "اقفال البلاغ",
      children: (
        <ReportModal title="اتخاذ اجراء" setShowSvg={setShowSvg}>
          <ReportLock />
        </ReportModal>
      ),
    },
    {
      id: 13,
      title: "تصعيد البلاغ",
      children: (
        <ReportModal setShowSvg={setShowSvg}>
          <ReportEscalation />
        </ReportModal>
      ),
    },
  ];

  const clickModal = (children) => {
    func(children);
  };
  const navigateTo = (path, state) => {
    handleHideMenu();
    navigate(path, state);
  };

  return (
    <ul>
      {optionItems.map((opt) => (
        <li
          onClick={() => {
            setShowSvg(true);
            !!opt.path
              ? navigateTo(opt.path, {
                  state: { index: opt.id, closeModal: true },
                })
              : clickModal(opt.children);
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
