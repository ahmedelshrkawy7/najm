import React from "react";
import {
  EyeOutlined,
  NumberOutlined,
  UserOutlined,
  ContainerOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
const labelProps = {
  textarea: "وصف البلاغ",
  selectTitle: "هل انت على علم باسماء المشتبه بهم؟",
  listInputTitle: "أسماء الاشخاص المشتبه بهم",
  datePickerTitle: "تاريخ ارتكاب المخالفة",
  locationTitle: "ادخل مكان الحادث",
};
import { useState } from "react";

import note from "../assets/icons/note.svg";
import prev2 from "../assets/icons/prev2.svg";
import prev3 from "../assets/icons/prev3.svg";
import prev4 from "../assets/icons/prev4.svg";
import prev5 from "../assets/icons/prev5.svg";
import prev6 from "../assets/icons/prev6.svg";
import prev7 from "../assets/icons/prev7.svg";
import ReportsTextIcon from "../component/Reports/ReportsTextIcon";
const ReportInfo = ({ values }) => {
  return (
    <>
      <div className="flex p-4 px-0 rounded-xl flex-col gap-6 mb-2">
        <div className="flex gap-2 items-center  rounded-full">
          <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
            <img src="../../../src/assets/icons/export.svg" />
          </div>
          <h2 className="text-lg self-center  font-semibold">تصنيف البلاغ</h2>
        </div>
        <div className="self-start  -ml-1 mr-14 flex items-center bg-[#33835C] p-10 px-8 gap-2   rounded-lg text-white">
          <div className="bg-white rounded-full flex p-2 justify-center items-center w-8 h-8">
            <img
              className="w-full h-full"
              src="../../src/assets/icons/money-3.svg"
            />
          </div>
          <span>{values?.report_classification?.name || values?.name}</span>
        </div>
      </div>
      <div className=" mt-5  mb-0 py-4 pb-0 rounded-xl">
        <div className="flex   gap-2 items-center  rounded-full">
          <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
            <ContainerOutlined className="text-[#33835C]" />
          </div>
          <h2 className="text-lg self-center  font-semibold">تفاصيل البلاغ</h2>
        </div>

        <div className="border border-gray-200 text-wrap rounded-xl pb-3 mt-4 pl-[42px] mr-9 ">
          <ReportsTextIcon
            icon={note}
            description={true}
            subTitle={values.description}
          />
        </div>
        <div className="">
          <ReportsTextIcon
            subTitle={values.date === "" ? "لا يوجد" : values.date}
            icon={prev4}
            title={labelProps.datePickerTitle}
          />
          <ReportsTextIcon
            subTitle={values.address ? values.address : "لا يوجد"}
            icon={prev5}
            title={labelProps.locationTitle}
          />
        </div>
        <div className="">
          <ReportsTextIcon
            subTitle={values.suspectKnown === true ? "نعم" : "لا"}
            icon={prev2}
            title={labelProps.selectTitle}
          />
          {values.suspectKnown === true && (
            <ReportsTextIcon
              bottom={true}
              subTitle={
                values.suspects ? (
                  <div className="flex max-h-[260px] scrollbar scrollbar-w-2 scrollbar-thumb-[#33835c] scrollbar-thumb-rounded-full  overflow-x-scroll gap-2 flex-wrap">
                    {values.suspects?.map((val) => (
                      <div className="tag flex items-center">
                        <h3 className="flex items-center">{val.name}</h3>
                        <button className="cursor-default">
                          <UserOutlined />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  "من فضلك اعد ادخال البيانات"
                )
              }
              icon={prev3}
              title={labelProps.listInputTitle}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ReportInfo;
