import React from "react";
import DispalyData from "../custom hooks/DispalyData";
import { Result } from "antd";
import { Results } from "../custom hooks/Results";

const StudyPreview = () => {
  const data = [
    {
      address: "mansoura",
      date: "2024-08-28",
      description: "dsafadfa",
      id: 266,
      medea: { files: [], images: [] },
      number: "BHE186",
      suspectKnown: false,
      suspects: [],
      user: {
        name: "ahmed",
        email: "seo.consultant2001@gmail.com",
        phone: "1006770779",
      },
    },
  ];

  return (
    <div className="bg-white">
      <DispalyData values={data} />
      <Results />
    </div>
  );
};

export default StudyPreview;
