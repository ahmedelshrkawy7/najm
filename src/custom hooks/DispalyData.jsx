/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
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
import useApi from "../utils/useApi";
import prev2 from "../assets/icons/prev2.svg";
import prev3 from "../assets/icons/prev3.svg";
import prev4 from "../assets/icons/prev4.svg";
import prev7 from "../assets/icons/prev7.svg";
import { useQuery } from "react-query";

const DispalyData = ({
  values = [],
  fils = [],
  imgs = [],
  title,
  videos = [],
  id,
}) => {
  console.log("🚀 ~ values:fffffffff", values);

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
  console.log("🚀 ~ items2:", items);

  const { getData } = useApi();
  const { data: { data = {} } = {} } = useQuery(
    ["admin", ["/reports/initial-study"], id],
    getData
  );
  console.log("🚀 ~ data:", data);

  if (!values.adminData || !values.result) {
    values.adminData = [
      {
        title: "الادارة المعنية بدراسة البلاغ",
        res: data?.department?.name,
        icon: prev7,
      },
      {
        title: "المدة الزمنية لمعالجة البلاغ",
        res: data.processing_time,
        icon: prev4,
      },
      {
        title: "تقييم مخاطر البلاغ",
        res: data.risk_assessment,
        icon: prev3,
      },
      {
        title: "نوع البلاغ",
        res: data.report_type?.name,
        icon: prev2,
      },
    ];
    values.result = data?.result;
  } else {
    console.log("contains ...");
  }

  if (!values.notes) {
    values.notes = data?.notes;
  } else {
    console.log("contains vals");
  }

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

          {values?.result && (
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
            values?.status !== "under_confirm" &&
            values?.status !== "rejected_from_responsible" && (
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
              {values?.notes?.notes?.map((notes, i) => (
                <AccreditorCard
                  key={i}
                  notes={
                    // JSON.parse(localStorage.getItem("token"))?.role ===
                    // "accreditor"
                    //   ? notes
                    //   : notes
                    notes
                  }
                />
              ))}
            </CardWrapper>
          )}
        </div>
      </div>
    </>
  );
};

export default DispalyData;
