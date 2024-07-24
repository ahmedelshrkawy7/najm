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
import arrowDown from "../../../src/assets/icons/arrow down.svg";
import Datepicker from "../forms/inputs/datepicker";
import AddAttach from "../forms/fileInput/addAttach";
import FileInput from "../forms/fileInput/FileInput";

const ReportDetails = ({
  control,
  errors,
  labelProps,
  setValue,
  watch,
  setV,
  reportDetailsValues,
}) => {
  const ref = useRef();

  useEffect(() => {
    if (reportDetailsValues.indexOf("") === -1) {
      setV(true);
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
          errors={errors}
          control={control}
        />
        <Location
          title={"InputControl"}
          errors={errors}
          control={control}
          src={arrowDown}
          inpTitle={labelProps.selectTitle}
          inputPlaceholder={"نعم/لا"}
        />
        <Listinput
          listInputTitle={labelProps.listInputTitle}
          icon={<PlusOutlined />}
          control={control}
          errors={errors}
          setValue={setValue}
          watch={watch}
        />
        <div className="flex items-center gap-6 flex-wrap pb-4">
          <Datepicker
            datePickerTitle={labelProps.datePickerTitle}
            control={control}
            errors={errors}
          />

          <Location
            title={"locationInputControl"}
            errors={errors}
            control={control}
            width={24}
            src={location}
            inpTitle={labelProps.locationTitle}
            inputPlaceholder={"شارع"}
          />
        </div>
        <AddAttach errors={errors} control={control} />
        {/* <FileInput /> */}
        {/* <FileInput /> */}
      </div>
    </>
  );
};

export default ReportDetails;
