/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { DatePicker } from "antd";
import calendarIcon from "../../../assets/icons/calendar.svg";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";

const Datepicker = ({
  control,
  nameType,
  errors,
  setValue,
  datePickerTitle,
  // prevData,
}) => {
  const date = new Date();
  // const onChange = (date, dateString) => {
  //   if (date) {
  //     console.log("Valid date selected:", dateString);
  //     setValue("date", dateString);
  //   } else {
  //     console.log("No valid date selected");
  //     setValue("date", "");
  //   }
  // };
  // console.log(prevData);
  return (
    <div className="flex flex-col self-start gap-4">
      <div>
        <h2>{datePickerTitle}</h2>
      </div>
      <Controller
        control={control}
        name={nameType}
        rules={{
          validate: (value) => {
            // Ensure the selected date is today or in the past
            return value
              ? dayjs(value).isBefore(dayjs().endOf("day")) ||
                  "التاريخ يجب ان يكون اليوم او يوم سابق"
              : true;
          },
        }}
        render={({ field, fieldState, ...f }) => {
          console.log("🚀 ~ f:", f);
          console.log("🚀 ~ fieldState:", fieldState);
          console.log("🚀 ~ field:", field);
          const handleChange = (date, dateString) => {
            console.log("🚀 ~ handleChange ~ dateString:", dateString);
            field.onChange(dateString);
          };

          return (
            <div>
              <DatePicker
                placeholder="اختر التاريخ"
                // {...field}
                value={field.value ? dayjs(field.value) : null}
                onBlur={field.onBlur}
                ref={field.ref}
                onChange={handleChange}
                format="YYYY-MM-DD"
                suffixIcon={<img width={20} src={calendarIcon} />}
                className=" hover:border-green-600 focus:border-green-600 w-[70vw] md:w-[300px] p-[10px] "
              />
              {/* {date.getTime() > Date.now() && (
              <p className="text-red-500">التاريخ غير صالح</p>
            )} */}
              {errors.date && (
                <p className="text-red-500">{errors.date.message}</p>
              )}
            </div>
          );
        }}
      />
    </div>
  );
};

export default Datepicker;
