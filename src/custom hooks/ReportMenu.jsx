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

const ReportMenu = ({
  setShowMenu,
  func,
  showModal,
  setShowSvg,
  status,
  refetch,
}) => {
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
          refetch={refetch}
        ></ReportModal>
      ),
      disabled: status === "accepted" || status === "under_confirm",
    },
    {
      id: 2,
      title: "اعداد دراسة اولية",
      path: "preparingStudy",
      disabled: status === "new" || status === "under_confirm",
    },
    {
      id: 3,
      title: "توجيه الدراسة الاولية للاعتماد",
      path: "previewStudy",
      disabled: status === "new",
    },
    {
      id: 4,
      title: "التعديل على الدراسة الاولية",
      path: "editStudy",
      disabled: status === "new",
    },
    {
      id: 5,
      title: "اسناد البلاغ",
      disabled: status === "new",
    },
    {
      id: 6,
      title: "طلب مستجدات",
      children: (
        <ReportModal title="طلب مستجدات" setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
      disabled: status === "new",
    },
    {
      id: 7,
      title: "اضافة مستجدات",
      children: (
        <ReportModal title="اضافة مستجدات" setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
      disabled: status === "new",
    },
    {
      id: 8,
      title: "استلام البلاغ",
      disabled: status === "new",
    },
    {
      id: 9,
      title: "طلب معلومات",
      children: (
        <ReportModal title="طلب معلومات" setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
      disabled: status === "new",
    },
    {
      id: 10,
      title: "اضافة معلومات",
      children: (
        <ReportModal title="اضافة معلومات" setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
      disabled: status === "new",
    },
    {
      id: 11,
      title: "اضافة ملاحظات",
      children: (
        <ReportModal title="اضافة ملاحظات" setShowSvg={setShowSvg}>
          <ReportInfo />
        </ReportModal>
      ),
      disabled: status === "new",
    },
    {
      id: 12,
      title: "اقفال البلاغ",
      children: (
        <ReportModal title="اتخاذ اجراء" setShowSvg={setShowSvg}>
          <ReportLock />
        </ReportModal>
      ),
      disabled: status === "new",
    },
    {
      id: 13,
      title: "تصعيد البلاغ",
      children: (
        <ReportModal setShowSvg={setShowSvg}>
          <ReportEscalation />
        </ReportModal>
      ),
      disabled: status === "new",
    },
  ];

  // const isOptionDisabled = (id) => {
  //   return (
  //     status === "rejected" ||
  //     (status === "new" && id !== 1) ||
  //     (status === "accepted" && id === 1) ||
  //     (status === "under_confirm" && (id === 1 || id === 2))
  //   );
  // };

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
            if (opt.disabled) return;
            if (
              status === "rejected" ||
              status === "rejected_from_responsible"
            ) {
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
          className={`py-[5px] px-[10px] border border-gray-100 text-[16px] ${
            status === "rejected" ||
            status === "rejected_from_responsible" ||
            (status === "new" && opt.id !== 1) ||
            (status === "accepted" && opt.id === 1) ||
            (status === "under_confirm" &&
              (opt.id === 1 || opt.id === 2 || opt.id === 3))
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
