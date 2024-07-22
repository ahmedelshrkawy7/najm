import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReportsHeader from "../../pages/user/ReportsHeader";
import UserContext from "../../store/UserContext";
import { Controller, useForm, useWatch } from "react-hook-form";
import Textarea from "../forms/inputs/Textarea";
import { InputText } from "../forms/inputs/InputText";
import Listinput from "../forms/listInput/Listinput";
import { PlusOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Location from "../forms/inputs/Location";
import location from "../../../src/assets/icons/location@2x.png";
import arrowDown from "../../../src/assets/icons/arrow down.svg";
import { DatePicker } from "antd";
import Datepicker from "../forms/inputs/datepicker";
import AddAttach from "../forms/fileInput/addAttach";

const ReportDetails = ({ register, watch, control, handleSubmit, errors }) => {
  const { userData, addUserData } = useContext(UserContext);
  const watchData = watch("textareaControl");
  console.log(watchData);

  //   useEffect(() => {
  //     addUserData({...userData,...{
  //       userName,
  //       email,
  //       password
  //     }})
  // }, [userName,email,password]);

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <ReportsHeader
        title={"تفاصيل البلاغ"}
        subTitle={"يُرجي ملئ الحقول التالية"}
      />
      <div className="px-8 pt-4 pb-8  space-y-6">
        {/* <input {...register("email")} type='text' placeholder='email'/> */}
        <Textarea errors={errors} control={control} />
        <Controller
          control={control}
          name={"InputControl"}
          rules={{ required: "هذا الحقل مطلوب", message: "هذا الحقل مطلوب" }}
          render={({ field, fieldState }) => (
            <Location
              name={field.name}
              field={field}
              errors={errors}
              control={control}
              src={arrowDown}
              inpTitle={"هل انت على علم باسماء المشتبه بهم؟"}
              inputPlaceholder={"نعم/لا"}
            />
          )}
        />
        <Listinput icon={<PlusOutlined />} />
        <div className="flex items-center gap-6 flex-wrap pb-4">
          <Datepicker />
          <Controller
            control={control}
            name="locationInputControl"
            rules={{ required: "هذا الحق مطلوب", message: "هذا الحقل مطلوب" }}
            render={({ field, fieldState }) => (
              <Location
                name={field.name}
                field={field}
                errors={errors}
                control={control}
                width={24}
                src={location}
                inpTitle={"مكان حدوث المخالفة"}
                inputPlaceholder={"شارع"}
              />
            )}
          />
        </div>
        <AddAttach />
        <button type="submit">ADD</button>
      </div>
    </form>
  );
};

export default ReportDetails;
