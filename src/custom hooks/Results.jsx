import React from "react";
import CardWrapper from "./CardWrapper";
import ReportsTextIcon from "../component/Reports/ReportsTextIcon";
import note from "../assets/icons/note.svg";
import { icons } from "antd/es/image/PreviewGroup";
export const Results = () => {
  return (
    <CardWrapper icon={<img src={note} />} title="النتائج والاجراء المتخذ">
      <div className="flex gap-20">
        <ReportsTextIcon icon={note} title="النتيجة"></ReportsTextIcon>
        <ReportsTextIcon
          icon={note}
          title="الملاحظات والتوصيات"
        ></ReportsTextIcon>
      </div>
    </CardWrapper>
  );
};
