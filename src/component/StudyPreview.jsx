/* eslint-disable no-unused-vars */
import React from "react";
import DispalyData from "../custom hooks/DispalyData";
import { Result } from "antd";
import { Results } from "../custom hooks/Results";
import useApi from "../utils/useApi";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

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

  return (
    <div className="bg-white">
      <DispalyData values={[]} />
      <Results />
    </div>
  );
};

export default StudyPreview;
