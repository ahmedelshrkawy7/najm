/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import ReportDetails from "./Reports/ReportDetails";
import { useForm } from "react-hook-form";
import SelectInput from "./forms/inputs/SelectInput";
import ReportsHeader from "../custom hooks/ReportsHeader";
import { DownOutlined, LoadingOutlined } from "@ant-design/icons";
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
import { useParams } from "react-router-dom";
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
    ["admin", ["/admin/departments", ""]],
    getData
  );

  const [showSvg, setShowSvg] = useState(false);

  const [fils, setFils] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [prevData, setPrevData] = useState({});
  console.log("🚀 ~ PreparingStudy ~ prevData:", prevData);

  const [videos, setVideos] = useState([]);
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
  };

  useEffect(() => {
    const getPrev = async () => {
      const res = await queryClient.getQueryData(["users", ["/reports"], id]);

      // setPrevData(res?.data?.report);

      // Data is found in the cache

      // Data is not found in cache, fetch it
      queryClient
        .fetchQuery(["users", ["/reports"], id], getData)
        .then((res) => {
          console.log(dayjs(res?.data?.report?.date));
          reset({
            description: res?.data?.report?.description,
            address: res?.data?.report?.address,
            suspects: res?.data?.report?.suspects || [],
            report_classification:
              res?.data?.report?.report_classification?.name,
            date: dayjs(res?.data?.report?.date),
            processing_time: "",
            files: "",
            risk_type: "",
            risk_assessment: "",
            result: "",
            _method: "PUT",
            action: "prepare_initial_study",
          });
          setVideos(res?.data?.report?.media?.videos);
          setImgs(res?.data?.report?.media?.images);
          setFils(res?.data?.report?.media?.files);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
      // } else {
      //   reset({
      //     description: "mmm",
      //     address: "fff",
      //     date: "",
      //     suspects: "" || [],

      //     processing_time: "",
      //     files: "",
      //     risk_type: "",
      //     risk_assessment: "",
      //     result: "",
      //     _method: "PUT",
      //     action: "prepare_initial_study",
      //   });
    };
    console.log(getPrev());
  }, [id, queryClient]);

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

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    control,
    resetField,
    getValues,
    reset,
  } = useForm({
    mode: "all",
    defaultValues: {
      description: "",
      address: "",
      date: "",
      suspects: "" || [],
      processing_time: "",
      files: "",
      risk_type: "",
      report_type: "",
      risk_assessment: "",
      result: "",
      _method: "PUT",
      action: "prepare_initial_study",
    },
  });

  console.log(getValues());

  const mutation = useMutation(postData, {
    onSuccess: () => {
      // change(3);
    },
    onError: (err) => {
      errorNotf(err.response.data.message);
    },
  });

  const onSubmit = (val) => {
    const x = mutation.mutate([`/reports/${id}`, val]);
    change(3);
    console.log("🚀 ~ onSubmit ~ x:", x);

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
              options={[
                {
                  value: "احتيال أو فساد أو رشوة او اختلاس او تزوير",
                  label: (
                    <span className="text-[15px] ">
                      احتيال أو فساد أو رشوة او اختلاس او تزوير
                    </span>
                  ),
                },
                {
                  value: "غسل أموال أو تمويل إرهاب",
                  label: (
                    <span className="text-[15px] ">
                      غسل أموال أو تمويل إرهاب
                    </span>
                  ),
                },
                {
                  value: "مخالفة للأنظمة والتعليمات",
                  label: (
                    <span className="text-[15px] ">
                      مخالفة للأنظمة والتعليمات
                    </span>
                  ),
                },
                {
                  value: "مخالفة لسياسة وإجراءات الشركة",
                  label: (
                    <span className="text-[15px] ">
                      مخالفة لسياسة وإجراءات الشركة
                    </span>
                  ),
                },
                {
                  value: "مخالفة لمدونة قواعد السلوك",
                  label: (
                    <span className="text-[15px] ">
                      مخالفة لمدونة قواعد السلوك
                    </span>
                  ),
                },
              ]}
            />
            <SelectInput
              errors={errors}
              control={control}
              placeholder="...النوع"
              inpTitle="نوع البلاغ"
              nameType="report_type"
              options={[
                {
                  value: "سوء أستخدام ممتلكات الشركة",
                  label: (
                    <span className="text-[15px] ">
                      سوء أستخدام ممتلكات الشركة
                    </span>
                  ),
                },
                {
                  value: "سوء استخدام السلطة او اتخاذ القرار",
                  label: (
                    <span className="text-[15px] ">
                      {" "}
                      سوء استخدام السلطة او اتخاذ القرار
                    </span>
                  ),
                },
                {
                  value: "سوء استخدام الصلاحيات الممنوحة",
                  label: (
                    <span className="text-[15px] ">
                      سوء استخدام الصلاحيات الممنوحة
                    </span>
                  ),
                },
                {
                  value: "الحصول على منافع او مكافأت غير مستحقة",
                  label: (
                    <span className="text-[15px] ">
                      الحصول على منافع او مكافأت غير مستحقة
                    </span>
                  ),
                },
                {
                  value: "الإفصاح عن معلومات سرية بطريقة غير نظامية",
                  label: (
                    <span className="text-[15px] ">
                      الإفصاح عن معلومات سرية بطريقة غير نظامية
                    </span>
                  ),
                },
              ]}
            />
            <SelectInput
              errors={errors}
              control={control}
              placeholder="...الدرجة"
              inpTitle="درجة المخاطر"
              nameType="risk_assessment"
              disapled={true}
              options={[
                {
                  value: "عالى",
                  label: <span className="text-[15px] ">عالى</span>,
                },
                {
                  value: "متوسط",
                  label: <span className="text-[15px] ">متوسط</span>,
                },
                {
                  value: "منخفض",
                  label: <span className="text-[15px] ">منخفض</span>,
                },
              ]}
            />
            <div
              onClick={() => {
                setShowSvg(true);
              }}
              className="flex   px-8 py-2 mt-10 gap-4  text-white rounded-md cursor-pointer items-center bg-[#33835C]"
            >
              <span>اداة تقييم المخاطر</span>
              <DownOutlined />
            </div>
            <SelectInput
              errors={errors}
              control={control}
              placeholder="المدة الزمنية...."
              inpTitle="مدة معالجة البلاغ"
              nameType="processing_time"
              disapled={true}
              options={[
                {
                  value: "15  ",
                  label: <span className="text-[15px] ">15 يوم عمل</span>,
                },
                {
                  value: "20 ",
                  label: <span className="text-[15px] ">20 يوم عمل</span>,
                },
                {
                  value: "30",
                  label: <span className="text-[15px] ">30 يوم عمل</span>,
                },
              ]}
            />
            <SelectInput
              errors={errors}
              control={control}
              placeholder="...الادارة"
              inpTitle="الادارة المعنية بدراسة اليلاغ"
              nameType="department_id"
              options={data.map((opt) => ({
                value: opt.id,
                label: (
                  <span className="text-sm" key={opt.id}>
                    {opt.name}
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
            <div className="flex gap-8 flex-wrap">
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
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white  w-[100%] p-10  mt-4 rounded-md">
          <InputText
            errors={errors}
            control={control}
            name="result"
            inputTitle={"نتائج الدراسة الاولية"}
            inputPlaceHolder={"....النتائج"}
            setValue={setValue}
            // max={50}
          />
        </div>
        <div className="py-5     text-left">
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
