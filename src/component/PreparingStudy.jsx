/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import ReportDetails from "./Reports/ReportDetails";
import { useForm } from "react-hook-form";
import SelectInput from "./forms/inputs/SelectInput";
import ReportsHeader from "../custom hooks/ReportsHeader";
import {
  DownOutlined,
  EllipsisOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import ReportModel from "../models/ReportModal";
import ReportOptionType from "../custom hooks/ReportOptionType";
import ReportOptions from "../custom hooks/ReportOptions";
import Textarea from "./forms/inputs/Textarea";
import Listinput from "./forms/listInput/Listinput";
import { PlusOutlined } from "@ant-design/icons";
import Datepicker from "./forms/inputs/datepicker";
import Location from "./forms/inputs/Location";
import location from "../assets/icons/location@2x.png";
import FileInput from "./forms/fileInput/FileInput";
import { InputText } from "./forms/inputs/InputText";
import ReportModal from "../models/ReportModal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useApi from "../utils/useApi";
import { useNavigate, useParams } from "react-router-dom";
import { Spin } from "antd";
import { errorNotf } from "../utils/notifications/Toast";
import dayjs from "dayjs";

//   risk_assessment
// report_type
// processing_time
// department_id
// result

const PreparingStudy = ({ change }) => {
  const { getData, postData } = useApi();

  const { data: { data = [] } = {} } = useQuery(
    ["admin", ["/departments", ""]],
    getData
  );

  const [showSvg, setShowSvg] = useState(false);

  const [fils, setFils] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [prevData, setPrevData] = useState({});
  console.log("🚀 ~ PreparingStudy ~ prevData:", prevData);

  const [videos, setVideos] = useState([]);
  const [media, setMedia] = useState([]);
  const date = new Date();
  const { id } = useParams();

  useEffect(() => {
    if (showSvg) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [showSvg]);
  const queryClient = useQueryClient();

  const {
    isLoading,
    error,
    data: { data: { report_classification } = {} } = {},
  } = useQuery(["users", ["/report-classification", ""]], getData);
  const { data: { data: reportType = [] } = {} } = useQuery(
    ["users", ["/report-types", ""]],
    getData
  );

  console.log("🚀 ~ PreparingStudy ~ reportType:", reportType);
  const { data: res } = useQuery(["users", ["/reports"], id], getData, {
    onSuccess: (res) => {},
  });
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    resetField,
    getValues,
    clearErrors,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      description: "",
      address: "",
      date: "",
      suspects: "" || [],
      processing_time: "",
      files: "",
      risk_type: "",
      report_type_id: null,
      risk_assessment: "",
      result: "",
      _method: "PUT",
      action: "prepare_initial_study",
    },
  });

  useEffect(() => {
    reset({
      description: res?.data?.report?.description,
      address:
        res?.data?.report?.address === "غير موجود"
          ? ""
          : res?.data?.report?.address,
      suspects: res?.data?.report?.suspects || [],
      report_classification: res?.data?.report?.report_classification?.name,
      date: isNaN(new Date(res?.data?.report?.date))
        ? ""
        : res?.data?.report?.date,
      processing_time: "",
      files: "",
      risk_type: "",
      risk_assessment: "",
      result: "",
      _method: "PUT",
      action: "prepare_initial_study",
      delete_file_paths: [],
      delete_suspects: [],
    });

    setVideos(res?.data?.report?.media?.videos);
    setImgs(res?.data?.report?.media?.images);
    setFils(res?.data?.report?.media?.files);
  }, [reset, res]);

  //   const fetchData = async () => {
  //     // Check for cached data
  //     const cachedData = queryClient.getQueryData(["users", ["/reports"], id]);

  //     if (cachedData) {
  //       // Use cached data
  //       setPrevData(cachedData.data.report);
  //       reset({
  //         mode: "all",
  //         defaultValues: {
  //           description: cachedData.data.report.description || "",
  //           address: cachedData.data.report.address || "",
  //           date: cachedData.data.report.date || "",
  //           suspects: cachedData.data.report.suspects || [],
  //           processing_time: cachedData.data.report.processing_time || "",
  //           files: cachedData.data.report.files || "",
  //           risk_type: cachedData.data.report.risk_type || "",
  //           risk_assessment: cachedData.data.report.risk_assessment || "",
  //           result: cachedData.data.report.result || "",
  //           _method: "PUT",
  //           action: "prepare_initial_study",
  //         },
  //       });
  //     } else {
  //       // Fetch data if not found in cache
  //       try {
  //         const res = await queryClient.fetchQuery(
  //           ["users", ["/reports"], id],
  //           getData
  //         );
  //         setPrevData(res.data.report);
  //         reset({
  //           mode: "all",
  //           defaultValues: {
  //             description: "ffff",
  //             address: "",
  //             date: "",
  //             suspects: "" || [],

  //             processing_time: "",
  //             files: "",
  //             risk_type: "",
  //             risk_assessment: "",
  //             result: "",
  //             _method: "PUT",
  //             action: "prepare_initial_study",
  //           },
  //         });
  //       } catch (error) {
  //         console.error("Error fetching data:", error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [id, queryClient]);

  const getDanger = (percent) => {
    console.log("🚀 ~ getDanger ~ percent:", percent);
    if (percent <= 0.3) {
      setValue("risk_assessment", "منخفض");
      setValue("processing_time", 30);
    } else if (percent <= 0.6) {
      setValue("risk_assessment", "متوسط");
      setValue("processing_time", 20);
    } else {
      setValue("risk_assessment", "عالي");
      setValue("processing_time", 15);
    }
    clearErrors(["risk_assessment", "processing_time"]);
  };
  const navigate = useNavigate();

  const mutation = useMutation(postData, {
    onSuccess: () => {
      navigate(`/dash/${id}/previewStudy`);
    },
    onError: (err) => {
      errorNotf(err.response.data.message);
    },
  });

  const onSubmit = (val) => {
    const x = mutation.mutate([`/reports/${id}`, val]);
    // change(3);

    // setLoc(3);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className=" bg-white p-10 w-[100%]">
          <div className="flex items-center flex-wrap gap-6 mt-8 ">
            <SelectInput
              errors={errors}
              control={control}
              placeholder="...التصنيف"
              inpTitle="تصنيف البلاغ"
              nameType="report_classification"
              note=""
              options={report_classification?.map((opt) => ({
                value: opt.id,
                label: (
                  <span className="text-sm" key={opt.id}>
                    {opt.name}
                  </span>
                ),
              }))}
            />
            <SelectInput
              errors={errors}
              control={control}
              placeholder="اختر نوع البلاغ"
              inpTitle="نوع البلاغ"
              nameType="report_type_id"
              options={reportType?.map((opt) => ({
                value: opt.id,
                label: (
                  <span className="text-sm" key={opt.id}>
                    {opt.name}
                  </span>
                ),
              }))}
            />
          </div>
          <div className="self-center flex flex-wrap gap-6 my-8">
            <div>
              <div
                onClick={() => {
                  setShowSvg(true);
                }}
                className="flex px-8 py-2 mt-10 gap-4  text-white rounded-md cursor-pointer items-center bg-[#33835C] h-[40px]"
              >
                <span>اداة تقييم المخاطر</span>
                <EllipsisOutlined />
              </div>
              {errors.risk_assessment && (
                <p className="text-red-500">{errors.risk_assessment.message}</p>
              )}
            </div>

            <InputText
              errors={errors}
              control={control}
              name="risk_assessment"
              inputTitle="درجة المخاطر"
              inputPlaceHolder="درجة المخاطر"
              readOnly={true}
              required={true}
              // max={50}
            />
            <InputText
              errors={errors}
              control={control}
              name="processing_time"
              inputTitle="عدد أيام معالجة البلاغ"
              inputPlaceHolder="المدة الزمنية...."
              readOnly={true}
              // max={50}
            />

            <SelectInput
              errors={errors}
              control={control}
              placeholder="إختر الإداره المعنية"
              inpTitle="الادارة المعنية بدراسة اليلاغ"
              nameType="department_id"
              options={data.map((opt) => ({
                value: opt.id,
                label: (
                  <span className="text-sm" key={opt.id}>
                    {opt.name_ar}
                  </span>
                ),
              }))}
            />
          </div>
          <div className="mt-4">
            <Textarea
              textAreaTitle={"وصف البلاغ"}
              nameType="description"
              errors={errors}
              control={control}
              watch={watch}
              prevData={prevData?.description}
            />

            <div className="mt-4">
              <Listinput
                listInputTitle="اسماء الاشخاص المشتبه بهم"
                icon={
                  <PlusOutlined
                    style={{ fontSize: "22px", fontWeight: "700" }}
                  />
                }
                control={control}
                errors={errors}
                setValue={setValue}
                watch={watch}
                resetField={resetField}
                nameType="list"
                getValues={getValues}
                prevData={prevData?.description}
              />
            </div>
            <div className="flex gap-8 flex-wrap mt-5">
              <Datepicker
                datePickerTitle={"تاريخ ارتكاب المخالفة"}
                control={control}
                errors={errors}
                setValue={setValue}
                // date={date}
                nameType="date"
                // prevData={prevData?.date}
              />
              <Location
                title={"address"}
                errors={errors}
                control={control}
                width={20}
                src={location}
                inpTitle={"مكان حدوث المخالفة"}
                inputPlaceholder={"أدخل مكان الحادث"}
                prevData={prevData?.address}
              />
            </div>
            <div className="mt-4">
              {/* <SelectInput
                errors={errors}
                control={control}
                placeholder="...نوع المستندات"
                inpTitle="مستندات داعمة للبلاغ"
                nameType="files"
                options={[
                  {
                    value: "تقرير فنى",
                    label: <span className="text-[15px] ">تقرير فنى </span>,
                  },
                  {
                    value: "معاينة",
                    label: <span className="text-[15px] ">معاينة </span>,
                  },
                  {
                    value: "مقطع فيديو",
                    label: <span className="text-[15px] ">مقطع فيديو </span>,
                  },
                ]}
              /> */}
              <div className="mt-4">
                <FileInput
                  fils={fils}
                  setFils={setFils}
                  videos={videos}
                  setVideos={setVideos}
                  imgs={imgs}
                  setImgs={setImgs}
                  register={register}
                  errors={errors}
                  control={control}
                  watch={watch}
                  setValue={setValue}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white h-full  w-[100%] p-10  mt-4 rounded-md">
          {/* <InputText
            errors={errors}
            control={control}
            name="result"
            // max={50}
          /> */}
          <Textarea
            setValue={setValue}
            inputPlaceHolder={"....النتائج"}
            textAreaTitle={"نتائج الدراسة الاولية"}
            nameType="result"
            errors={errors}
            control={control}
            watch={watch}
            prevData={prevData?.description}
          />
        </div>
        <div className="py-5 text-left">
          <button
            type="submit"
            className={`bg-[#33835C] p-2 rounded-md text-white min-w-60`}
          >
            {mutation.isLoading ? (
              <Spin
                indicator={<LoadingOutlined spin style={{ color: "white" }} />}
                size="default"
              />
            ) : (
              "معاينة الدراسة الاولية"
            )}
          </button>
        </div>
      </form>

      {showSvg && (
        <div className="fixed top-0 left-0 z-[99999] bg-[rgba(0,0,0,0.4)] w-screen h-screen">
          <ReportModal title="اداة تقييم المخاطر" setShowMenu={setShowSvg}>
            <ReportOptions getDanger={getDanger} setShowSvg={setShowSvg} />
          </ReportModal>
        </div>
      )}
    </>
  );
};

export default PreparingStudy;
