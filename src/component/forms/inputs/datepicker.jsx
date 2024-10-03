/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { DatePicker } from "antd";
import calendarIcon from "../../../assets/icons/calendar.svg";
import { Controller } from "react-hook-form";

const Datepicker = ({
  control,
  nameType,
  errors,
  setValue,
  datePickerTitle,
  // prevData,
}) => {
  const date = new Date();
  const onChange = (date, dateString) => {
    if (date) {
      console.log("Valid date selected:", dateString);
      setValue("date", dateString);
    } else {
      console.log("No valid date selected");
      setValue("date", "");
    }
  };
  // console.log(prevData);
  return (
    <div className="flex flex-col self-start gap-4">
      <div>
        <h2>{datePickerTitle}</h2>
      </div>
      <Controller
        control={control}
        name={nameType}
        rules={{ required: "هذا الحق مطلوب" }}
        render={({ field, fieldState }) => (
          <div>
            <DatePicker
              // {...field}
              placeholder="اختر التاريخ"
              onChange={onChange}
              format="YYYY-MM-DD"
              suffixIcon={<img width={20} src={calendarIcon} />}
              className=" hover:border-green-600 focus:border-green-600 w-[70vw] md:w-[300px] p-[10px] "
            />
            {/* {date.getTime() > Date.now() && (
              <p className="text-red-500">التاريخ غير صالح</p>
            )} */}
            {field.value && new Date(field.value).getTime() > Date.now() && (
              <p className="text-red-500">التاريخ غير صالح</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default Datepicker;
