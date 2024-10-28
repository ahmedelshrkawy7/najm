/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import ReportOptionType from "./ReportOptionType";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import useApi from "../utils/useApi";

const ReportOptions = ({ getDanger, setShowSvg }) => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      typeOfReport: [],
      departmentIssues: [],
      employeeParticipation: [],
      externalParties: [],
      reputationRisks: [],
      legalRisks: [],
      proofs: [],
      all: [],
    },
  });

  const onSubmit = (data) => {
    getDanger(watch("all").length / 19);
    setShowSvg(false);
  };
  const { getData } = useApi();
  // const { data } = useQuery(["allRisks", ["/fetch-risk-assessment"], getData]);
  const { data: { data = [] } = {} } = useQuery(
    ["admin", ["/fetch-risk-assessment", ""]],
    getData
  );
  console.log("🚀 ~ ReportOptions ~ data:", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-5 ">
        {" "}
        <div className="flex gap-4 flex-col ">
          {data?.[0]?.map((el, index) => {
            console.log(el);

            return (
              <div key={index}>
                <div className="bg-[#33835C1A] text-[#1E1E1E] font-bold p-4 rounded-md">
                  {el.name}{" "}
                </div>
                <div className="flex flex-col mt-4 gap-2">
                  {el.children.map((el, i) => {
                    return (
                      <ReportOptionType
                        control={control}
                        name="all"
                        label={el.name}
                        key={i}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="px-5 py-3 pt-0 flex items-center justify-end">
        <button className=" bg-[#33835C] text-white p-1 px-10 rounded-lg">
          تاكيد
        </button>
      </div>
    </form>
  );
};

export default ReportOptions;
