import React from "react";
import DispalyData from "../custom hooks/DispalyData";
import { Result } from "antd";
import { Results } from "../custom hooks/Results";
import { useLocation } from "react-router-dom";
import useApi from "../utils/useApi";
import { useQuery } from "react-query";

const StudyPreview = () => {
  const { pathname } = useLocation();
  let id = +pathname.match(/[0-9]+/g).toString();
  console.log("🚀 ~ StudyPreview ~ id:", id);
  const { getData } = useApi();
  const { data: { data = {} } = {} } = useQuery(
    ["admin", ["/reports/initial-study"], id],
    getData
  );
  console.log("🚀 ~ StudyPreview ~ data:", data);
  const values = {
    address: data?.address,
    date: data.date,
    description: data.report_classification,
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
      name: data?.user_name,
      email: data.user_email,
      phone: data.user_phone,
    },
  };

  console.log("🚀 ~ StudyPreview ~ values:", values);

  return (
    <>
      <div className="bg-white">
        <DispalyData values={values} />
        <Results />
      </div>
      <div className="py-5  w-[100%]   text-left">
        <button
          // onClick={() => setLoc(2)}
          className={`bg-[#33835C] !bg-transparent !text-[#33835C] border-2 border-[#33835C] font-bold p-2 rounded-md `}
        >
          {" "}
          {"رجوع"}
        </button>
      </div>
    </>
  );
};

export default StudyPreview;
