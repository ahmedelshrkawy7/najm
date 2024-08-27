import React from "react";
import ReportImages from "../component/Reports/ReportImages";
import ReportFiles from "../component/Reports/ReportFiles";

import prev9 from "../assets/icons/prev9.svg";

import { NumberOutlined, PhoneOutlined } from "@ant-design/icons";

import ContactInformation from "./ContactInformation";
import CardWrapper from "./CardWrapper";
import ReportInfo from "./ReportInfo";
import { useLocation } from "react-router-dom";
import ReportsHeader from "./ReportsHeader";

const DispalyData = ({ values, fils, imgs, title }) => {
  console.log(imgs);

  console.log(values);

  console.log();
  const location = useLocation();
  console.log(values);
  return (
    <>
      {!location.pathname.includes("dash") && (
        <ReportsHeader title="بيانات البلاغ" />
      )}
      <div className="mt-14 p-4">
        <div className=" rounded-md  flex flex-col gap-6">
          <div className="border p-6 pb-0 rounded-md border-gray-300 ">
            {location.pathname.includes("dash") && (
              <div className="flex gap-2  items-center justify-end  rounded-full pb-3">
                <div className="h-12 w-12 bg-[#33835C1A] text-[#33835C] flex items-center justify-center rounded-full">
                  <NumberOutlined />
                </div>
                <h2 className="text-lg self-center  font-semibold">
                  رقم البلاغ {values.id}
                </h2>
              </div>
            )}
            <ReportInfo values={values} />
          </div>
          {fils?.length > 0 ||
            values[9]?.files > 0 ||
            ((imgs?.length > 0 || values[9]?.images) && (
              <CardWrapper
                icon={<img src={prev9} />}
                title="المستندات الداعمه للاشتباه"
              >
                <ReportFiles fils={fils || values[9]?.files} />
                <ReportImages imgs={imgs || values[9]?.images} />
              </CardWrapper>
            ))}

          <CardWrapper
            icon={<PhoneOutlined className="text-green-700" />}
            title="معلومات الاتصال"
          >
            <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 md:-ml-1 mt-2 xl:gap-24 items-center">
              <ContactInformation values={values} />
            </div>
          </CardWrapper>
        </div>
      </div>
    </>
  );
};

export default DispalyData;
