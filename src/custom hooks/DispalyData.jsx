/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import ReportImages from "../component/Reports/ReportImages";
import ReportFiles from "../component/Reports/ReportFiles";

import prev9 from "../assets/icons/prev9.svg";
import prev5 from "../assets/icons/prev7.svg";

import {
  EditOutlined,
  FileTextOutlined,
  NumberOutlined,
  PhoneOutlined,
  TeamOutlined,
  WarningOutlined,
} from "@ant-design/icons";

import ContactInformation from "./ContactInformation";
import CardWrapper from "./CardWrapper";
import ReportInfo from "./ReportInfo";
import { useLocation } from "react-router-dom";
import ReportsHeader from "./ReportsHeader";
import ReportsTextIcon from "../component/Reports/ReportsTextIcon";
import AccreditorCard from "../AccreditorCard";

const DispalyData = ({
  values = [],
  fils = [],
  imgs = [],
  title,
  videos = [],
}) => {
  console.log("🚀 ~ values:", values);

  const location = useLocation();
  let imgsServ = values?.media?.images?.filter((el) => {
    return el?.file_type?.includes("image");
  });
  let videosServ = values?.media?.videos?.filter((el) => {
    return el?.file_type?.includes("video");
  });
  console.log("🚀 ~ videosServ ~ videosServ:", videosServ);
  const items = [
    {
      icon: <FileTextOutlined />,
      label: "الملاحظات:",
      result: values?.notes?.notes,
    },
    {
      icon: <WarningOutlined />,
      label: "السبب:",
      result: values?.notes?.reason,
    },
    {
      icon: <TeamOutlined />,
      label: "المنشئ:",
      result: values?.notes?.creator,
    },
    {
      icon: <EditOutlined />,
      label: "التاريخ:",
      result: values?.notes?.date,
    },
  ];
  return (
    <>
      {!location.pathname.includes("dash") && (
        <ReportsHeader title="بيانات البلاغ" />
      )}
      <div className="p-1 sm:p-6">
        <div className=" rounded-md  flex flex-col ">
          <div className=" ">
            {location.pathname.includes("dash") && (
              <div className="flex gap-2  items-center   rounded-full pb-3">
                <h2 className="text-lg self-center  font-semibold mr-auto">
                  رقم البلاغ {values?.id}
                </h2>
              </div>
            )}
            <ReportInfo values={values} />
          </div>

          {(values?.media?.files?.length > 0 ||
            fils?.length > 0 ||
            imgs?.length > 0 ||
            videos?.length > 0 ||
            imgsServ?.length > 0 ||
            videosServ?.length > 0) && (
            <CardWrapper
              icon={<img src={prev9} />}
              title="المستندات الداعمه للاشتباه"
            >
              <ReportFiles
                fils={fils.length == 0 ? values.media?.files : fils}
              />
              <ReportImages
                imgs={imgs.length === 0 ? imgsServ : imgs}
                videos={videos.length === 0 ? videosServ : videos}
              />
            </CardWrapper>
          )}

          <CardWrapper
            icon={<PhoneOutlined className="text-green-700" />}
            title="معلومات الاتصال"
          >
            <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3  mt-2 xl:gap-24 items-center">
              <ContactInformation values={values} />
            </div>
          </CardWrapper>

          {values.result && (
            <CardWrapper
              icon={<img src={prev5} />}
              title="نتائج الدراسة الاولية للبلاغ"
            >
              <ReportsTextIcon
                icon={prev9}
                description={true}
                subTitle={values.result || ""}
              />
            </CardWrapper>
          )}

          {values?.notes &&
            values?.status !== "rejected" &&
            values?.status !== "under_process" &&
            values?.status !== "under_confirm" && (
              <div className="my-4 py-1 rounded-md">
                <CardWrapper
                  icon={<img src={prev5} />}
                  title="ملاحظات اعادة الدراسة"
                >
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center p-2 gap-2">
                      <div className="text-[#33835c]">{item.icon}</div>
                      <span className="font-semibold">{item.label}</span>
                      <span>{item?.result}</span>
                    </div>
                  ))}
                </CardWrapper>
              </div>
            )}
          {values.notes && values?.status === "under_process" && (
            <CardWrapper icon={<img src={prev5} />} title="ملاحظات المعالجة">
              <AccreditorCard
                notes={
                  JSON.parse(localStorage.getItem("token"))?.role ===
                  "accreditor"
                    ? values?.notes
                    : values?.notes?.notes
                }
              />
            </CardWrapper>
          )}
        </div>
      </div>
    </>
  );
};

export default DispalyData;
