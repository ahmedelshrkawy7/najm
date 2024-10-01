/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import ReportDetails from "./Reports/ReportDetails";
import { useForm } from "react-hook-form";
import SelectInput from "./forms/inputs/SelectInput";
import ReportsHeader from "../custom hooks/ReportsHeader";
import { DownOutlined } from "@ant-design/icons";
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
import { useMutation, useQuery } from "react-query";
import useApi from "../utils/useApi";

//   risk_assessment
// report_type
// processing_time
// department_id
// result

const PreparingStudy = ({
  register,
  watch,
  formState: { errors },
  handleSubmit,
  setValue,
  control,
  resetField,
  getValues,
}) => {
  const { getData } = useApi();

  const { data: { data = [] } = {} } = useQuery(
    ["admin", ["/admin/departments", ""]],
    getData
  );
  console.log(
    "🚀 ~ PreparingStudy ~ data:",
    data.map((dt) => dt.name)
  );

  const [showSvg, setShowSvg] = useState(false);

  const [fils, setFils] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [videos, setVideos] = useState([]);
  const date = new Date();

  useEffect(() => {
    if (showSvg) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [showSvg]);
  console.log(getValues());
  return (
    <>
      <div className=" bg-white p-10 w-[100%]">
        <div className="flex items-center flex-wrap gap-6 mt-8 ">
          <SelectInput
            errors={errors}
            control={control}
            placeholder="...التصنيف"
            inpTitle="تصنيف البلاغ"
            nameType="report_type"
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
                  <span className="text-[15px] ">غسل أموال أو تمويل إرهاب</span>
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
            nameType="risk_assessment"
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
            nameType="risk_type"
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
          />

          <div className="mt-4">
            <Listinput
              listInputTitle="اسماء الاشخاص المشتبه بهم"
              icon={
                <PlusOutlined style={{ fontSize: "22px", fontWeight: "700" }} />
              }
              control={control}
              errors={errors}
              setValue={setValue}
              watch={watch}
              resetField={resetField}
              nameType="list"
              getValues={getValues}
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
            />
            <Location
              title={"address"}
              errors={errors}
              control={control}
              width={20}
              src={location}
              inpTitle={"مكان حدوث المخالفة"}
              inputPlaceholder={"أدخل مكان الحادث"}
            />
          </div>
          <div className="mt-4">
            <SelectInput
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
            />
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
          max={50}
        />
      </div>

      {showSvg && (
        <div className="fixed top-0 left-0 z-[99999] bg-[rgba(0,0,0,0.4)] w-screen h-screen">
          <ReportModal title="اداة تقييم المخاطر" setShowMenu={setShowSvg}>
            <ReportOptions />
          </ReportModal>
        </div>
      )}
    </>
  );
};

export default PreparingStudy;
