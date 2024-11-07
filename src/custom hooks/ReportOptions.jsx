/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import ReportOptionType from "./ReportOptionType";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import useApi from "../utils/useApi";
import { useParams } from "react-router-dom";

const ReportOptions = ({
  getDanger,
  setShowSvg,
  getSavedOptions,
}) => {
  const { control, handleSubmit, watch, setValue } = useForm({
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
  const { id } = useParams();
  const selectedOptions = watch("all");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem(`formData`));
    if (savedData && getSavedOptions) {
      const formData = savedData.find((form) => form.key === `formData-${id}`);
      if (formData && formData.selectedOptions) {
        setValue("all", formData.selectedOptions);
      }
    }
  }, [setValue, getSavedOptions, id]);

  useEffect(() => {
    const dangerValue = selectedOptions.length / 19;
    getDanger(dangerValue);
  }, [selectedOptions]);

  const onSubmit = (data) => {
    // getDanger(watch("all").length / 19);
    // setShowSvg(false);

    const formData = {
      selectedOptions: data.all,
      calculatedValue: watch("all").length / 19,
      key: `formData-${id}`,
    };

    let savedItems = JSON.parse(localStorage.getItem("formData")) || [];
    const existingItem = savedItems.find((item) => item.key === formData.key);

    if (existingItem) {
      savedItems = savedItems.map((item) =>
        item.key === formData.key ? { ...item, ...formData } : item
      );
    } else {
      savedItems = [...savedItems, formData];
    }

    localStorage.setItem(`formData`, JSON.stringify(savedItems)); // Persist data
    getDanger(formData.calculatedValue);
    setShowSvg(false);
  };

  const { getData } = useApi();
  // const { data } = useQuery(["allRisks", ["/fetch-risk-assessment"], getData]);
  const {
    data: { data = [] } = {},
    isLoading,
    isFetching,
  } = useQuery(["admin", ["/fetch-risk-assessment", ""]], getData);
  console.log("🚀 ~ ReportOptions ~ data:", data);

  return (
    <>
      {isLoading || isFetching ? (
        <div className="py-12 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-5 ">
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
      )}
    </>
  );
};

export default ReportOptions;
