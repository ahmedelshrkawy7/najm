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
}) => {
  const ref = useRef();
  const isHidden = watch("suspectKnown") === "0";
  useEffect(() => {
    if (
      reportDetailsValues.indexOf("") === -1 ||
      listInputControl.length > 0 ||
      isHidden
    ) {
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
          watch={watch}
          iconLabel={"*"}
        />
        <SelectInput
          errors={errors}
          control={control}
          inpTitle={labelProps.selectTitle}
          iconLabel={"*"}
        />

        {!isHidden && (
          <Listinput
            listInputTitle={labelProps.listInputTitle}
            icon={<PlusOutlined />}
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
            resetField={resetField}
            values={values}
            iconLabel={"*"}
            getValues={getValues}
          />
        )}
        <div className="flex items-center gap-6 flex-wrap pb-4">
          <Datepicker
            datePickerTitle={labelProps.datePickerTitle}
            control={control}
            errors={errors}
          />

          <Location
            title={"address"}
            errors={errors}
            control={control}
            width={24}
            src={location}
            inpTitle={labelProps.locationTitle}
            inputPlaceholder={"شارع"}
          />
        </div>
        {/* <AddAttach errors={errors} control={control} /> */}
        <FileInput
          fils={fils}
          setFils={setFils}
          imgs={imgs}
          setImgs={setImgs}
          register={register}
          errors={errors}
          control={control}
        />
        {/* <FileInput /> */}
      </div>
    </>
  );
};

export default ReportDetails;
