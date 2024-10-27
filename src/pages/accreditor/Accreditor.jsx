/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import DispalyData from "../../custom hooks/DispalyData";
import { Result } from "antd";
import { Results } from "../../custom hooks/Results";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import prev4 from "../../assets/icons/prev4.svg";
import prev3 from "../../assets/icons/prev3.svg";
import prev7 from "../../assets/icons/prev7.svg";
import prev2 from "../../assets/icons/prev2.svg";
import useApi from "../../utils/useApi";
import AccreditorCard from "../../AccreditorCard";

const Accreditor = ({ setLoc, role }) => {
  // console.log("🚀 ~ Accreditor ~ role:", role);
  const { pathname } = useLocation();
  // let id = +pathname.match(/[0-9]+/g).toString();
  const { id } = useParams();
  // console.log("🚀 ~ StudyPreview ~ id:", id);
  const { getData } = useApi();

  const { data: { data: { report } = {} } = {} } = useQuery(
    ["admin", ["/reports"], id],
    getData
  );
  console.log(
    "🚀 ~ Accreditorffffeagggggggggggggggggggggggg ~ report:",
    report
  );

  const { data: { data = {} } = {} } = useQuery(
    ["admin", ["/reports/initial-study"], id],
    getData
  );

  console.log("ffffffffffffffffff", data);
  // const { data: { data: _data = {} } = {} } = useQuery(
  //   ["admin", ["/reports"], id],
  //   getData
  // );
  // console.log("🚀 ~ Accreditor ~ _data:", _data);
  const navigate = useNavigate();

  let values;

  if (
    report?.status === "rejected" ||
    report?.status === "resubmit_study_from_accreditor" ||
    report?.status === "rejected_from_responsible"
  ) {
    values = {
      address: report?.address,
      date: report.date,
      description: report.description,
      name: report?.report_classification?.name,
      id: report?.id,
      status: report?.status,
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
      notes: {
        notes: report?.notes?.notes,
        reason: report?.notes?.reason,
        date: report?.notes?.date,
        creator: report?.notes?.creator,
      },
      reason: report?.reason,
      restudyNotes: report?.notes,
    };
  } else {
    values = {
      address: data?.address,
      date: data?.date,
      description: data?.description,
      name: data?.report_classification?.name,
      id: data?.id,
      status: data?.status,
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
          res: data.department?.name,
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
      notes: {
        // category_notes: _data?.report?.notes?.notes?.category_notes,
        // risk_type_note: _data?.report?.notes?.notes?.risk_type_note,
        // risk_assessment_note: _data?.report?.notes?.notes?.risk_assessment_note,
        // department_note: _data?.report?.notes?.notes?.department_note,
        // primary_study_note: _data?.report?.notes?.notes?.primary_study_note,
        // date: _data?.report?.notes?.date,
        // creator: _data?.report?.notes?.creator,
        // notes: _data?.report?.notes?.notes,
        notes: data?.notes?.notes,
      },
    };
  }

  console.log("🚀 ~ Accreditor ~ values:", values);
  console.log("🚀 ~ Accreditor ~ data:", data);
  console.log("🚀 ~ Accreditor ~ report:", report);

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
