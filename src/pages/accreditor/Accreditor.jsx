/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import DispalyData from "../../custom hooks/DispalyData";
import { Result } from "antd";
import { Results } from "../../custom hooks/Results";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import prev4 from "../../assets/icons/prev4.svg";
import prev3 from "../../assets/icons/prev3.svg";
import prev7 from "../../assets/icons/prev7.svg";
import prev2 from "../../assets/icons/prev2.svg";
import useApi from "../../utils/useApi";

const Accreditor = ({ setLoc, role }) => {
  // console.log("🚀 ~ Accreditor ~ role:", role);
  const { pathname } = useLocation();
  let id = +pathname.match(/[0-9]+/g).toString();
  // console.log("🚀 ~ StudyPreview ~ id:", id);
  const { getData } = useApi();

  const { data: { data: { report } = {} } = {} } = useQuery(
    ["users", ["/reports"], id],
    getData
  );

  // console.log("🚀 ~ Accreditor ~ report:", report);
  const { data: { data = {} } = {} } = useQuery(
    ["admin", ["/reports/initial-study"], id],
    getData
  );
  console.log("🚀 ~ Accreditor ~ data:", data);
  const navigate = useNavigate();

  let values;
  if (report?.status === "rejected") {
    values = {
      address: report?.address,
      date: report.date,
      description: report.description,
      name: report?.report_classification.name,
      id: data.id,
      media: {
        files: report.media?.files,
        images: report.media?.images,
        videos: report.media?.videos,
      },
      number: "BHE186",
      suspectKnown: report?.suspectKnown,
      suspects: report?.suspects,
      user: {
        name: report?.user?.name,
        email: report?.user?.email,
        phone: report?.user?.phone,
      },
    };
  } else {
    values = {
      address: data?.address,
      date: data.date,
      description: data.description,
      name: data.report_classification,
      id: data.id,
      media: {
        files: data.media?.files?.paths,
        images: data.media?.images?.paths,
        videos: data.media?.videos?.paths,
      },
      number: "BHE186",
      suspectKnown: data.has_suspects,
      suspects: data.suspects,
      user: {
        name: data.user_name,
        email: data.user_email,
        phone: data.user_phone,
      },
      result: data.result,
      adminData: [
        {
          title: "الادارة المعنية بدراسة البلاغ",
          res: data.department,
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
      ],
    };
  }

  return (
    <>
      <div className="bg-white">
        <DispalyData values={values} />
        {/* <Results /> */}
      </div>
      <div className="py-5  w-[100%]   text-left">
        <button
          onClick={() => {
            if (role?.includes("responsible")) {
              return navigate(`/dash/${id}`);
            }
            return navigate(`/dash`);
          }}
          className={`bg-[#33835C] !bg-transparent !text-[#33835C] border-2 border-[#33835C] font-bold p-2 rounded-md `}
        >
          {"رجوع"}
        </button>
      </div>
    </>
  );
};

export default Accreditor;
