/* eslint-disable no-unused-vars */
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
  const values = [
    {
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
        name: "ahmed",
        email: "seo.consultant2001@gmail.com",
        phone: "1006770779",
      },
    },
  ];
  console.log("🚀 ~ StudyPreview ~ values:", values);
  // const data = [
  //   {
  //     address: "mansoura",
  //     date: "2024-08-28",
  //     description: "dsafadfa",
  //     id: 266,
  //     medea: { files: [], images: [] },
  //     number: "BHE186",
  //     suspectKnown: false,
  //     suspects: [],
  //     user: {
  //       name: "ahmed",
  //       email: "seo.consultant2001@gmail.com",
  //       phone: "1006770779",
  //     },
  //   },
  // ];

  return (
    <>
      <div className="bg-white">
        <DispalyData values={values[0]} />
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
