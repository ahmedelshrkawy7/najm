import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CardDiv from "./UI/CardDiv";
import Modal from "./UI/Modal";

const optionItems = [
  {
    id: 1,
    title: "استلام البلاغ",
    children: <div>dasdsadasdasdsadasd</div>,
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
  },
  {
    id: 7,
    title: "اضافة مستجدات",
  },
  {
    id: 8,
    title: "استلام البلاغ",
  },
  {
    id: 9,
    title: "طلب معلومات",
  },
  {
    id: 10,
    title: "اضافة معلومات",
  },
  {
    id: 11,
    title: "اضافة ملاحظات",
  },
  {
    id: 12,
    title: "اقفال البلاغ",
  },
  {
    id: 13,
    title: "تصعيد البلاغ",
  },
];

const ReportMenu = ({ setShowMenu, func }) => {
  const navigate = useNavigate();
  return (
    <ul>
      {optionItems.map((opt) => (
        <li
          onClick={() => {
            !!opt.path ? navigate(opt.path) : func(opt.children);
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
