import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ReportsHeader from "../../custom hooks/ReportsHeader";
import Textarea from "../forms/inputs/Textarea";
import Listinput from "../forms/listInput/Listinput";
import { PlusOutlined } from "@ant-design/icons";
import Location from "../forms/inputs/Location";
import location from "../../../src/assets/icons/location@2x.png";

import Datepicker from "../forms/inputs/datepicker";
import FileInput from "../forms/fileInput/FileInput";
import SelectInput from "../forms/inputs/SelectInput";

const ReportDetails = ({
  control,
  errors,
  labelProps,
  setValue,
  watch,
  setV,
  reportDetailsValues,
  title,
  resetField,
  register,
  fils,
  setFils,
  imgs,
  setImgs,
  listInputControl,
  values,
  getValues,
  date,
  description,
}) => {
  const isHidden = watch("suspectKnown") === "0";
  const [validDate, setValidDate] = useState("");
  useEffect(() => {
    if (
      reportDetailsValues.indexOf("") === -1 &&
      watch("suspectKnown") === "1" &&
      listInputControl.length > 0
    ) {
      if (!watch("datePickerControl")) {
        setV(true);
      } else if (watch("datePickerControl") && Date.now() >= date.getTime()) {
        setV(true);
      } else {
        setV(false);
      }
    } else if (
      reportDetailsValues.indexOf("") === -1 &&
      watch("suspectKnown") === "0"
    ) {
      if (!watch("datePickerControl")) {
        setV(true);
      } else if (watch("datePickerControl") && Date.now() >= date.getTime()) {
        setV(true);
      } else {
        setV(false);
      }
    } else {
      setV(false);
    }
  }, [reportDetailsValues]);

  return (
    <>
      <ReportsHeader
        title={"تفاصيل البلاغ"}
        subTitle={"يُرجي ملئ الحقول التالية"}
      />
      <div className="px-8 pt-4 pb-8  space-y-6">
        <Textarea
          textAreaTitle={labelProps.textarea}
          nameType="description"
          errors={errors}
          control={control}
          watch={watch}
          iconLabel={"*"}
        />
        <SelectInput
          errors={errors}
          control={control}
          inpTitle={labelProps.selectTitle}
          nameType="suspectKnown"
          iconLabel={"*"}
        />

        {!isHidden && (
          <Listinput
            listInputTitle={labelProps.listInputTitle}
            icon={
              <PlusOutlined style={{ fontSize: "22px", fontWeight: "700" }} />
            }
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
            resetField={resetField}
            values={values}
            iconLabel={"*"}
            nameType="list"
            getValues={getValues}
          />
        )}
        <div className="flex items-center gap-6 flex-wrap pb-4">
          <Datepicker
            datePickerTitle={labelProps.datePickerTitle}
            control={control}
            errors={errors}
            date={date}
            nameType="date"
          />

          <Location
            title={"address"}
            errors={errors}
            control={control}
            width={20}
            src={location}
            inpTitle={labelProps.locationTitle}
            inputPlaceholder={"أدخل مكان الحادث"}
          />
        </div>
        <FileInput
          fils={fils}
          setFils={setFils}
          imgs={imgs}
          setImgs={setImgs}
          register={register}
          errors={errors}
          control={control}
        />
        <div className="rounded-md -mt-20 bg-[#D74D521A] w-fit h-[40px] flex items-center">
          <p className="p-4 text-[13px] text-[#D74D52] leading-7  ">
            في حال تعذر رفع المستندات بسبب تجاوز السعة المسموح بها يرجى إرسال
            المستندات على البريد الإلكتروني wb@najm.sa , متبوعاً برقم البلاغ،
            علماً سيتم التزويد برقم البلاغ بشكل تلقائي عند إرسال البلاغ.
          </p>
        </div>
        {/* <FileInput /> */}
      </div>
    </>
  );
};

export default ReportDetails;
