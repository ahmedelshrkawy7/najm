import { DatePicker } from "antd";
import calendarIcon from "../../../assets/icons/calendar.svg";
import { Controller } from "react-hook-form";

const Datepicker = ({ control, errors, datePickerTitle }) => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="flex flex-col self-start gap-4">
      <div>
        <h2>{datePickerTitle}</h2>
      </div>
      <Controller
        control={control}
        name="datePickerControl"
        rules={{ required: "هذا الحق مطلوب" }}
        render={({ field, fieldState }) => (
          <div>
            <DatePicker
              {...field}
              //  onChange={onChange}
              suffixIcon={<img src={calendarIcon} />}
              style={{ width: "300px", padding: "10px" }}
              className=" hover:border-green-600 focus:border-green-600 "
            />
            {errors.datePickerControl && (
              <p className="text-red-500 ">
                {errors.datePickerControl.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default Datepicker;
