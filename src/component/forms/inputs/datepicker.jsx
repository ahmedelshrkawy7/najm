import { DatePicker } from "antd";
import calendarIcon from "../../../assets/icons/calendar.svg";
import { Controller } from "react-hook-form";

const Datepicker = ({ control, date, errors, datePickerTitle }) => {
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
        name="date"
        rules={{ required: "هذا الحق مطلوب" }}
        render={({ field, fieldState }) => (
          <div>
            <DatePicker
              {...field}
              placeholder="اختر التاريخ"
              //  onChange={onChange}
              suffixIcon={<img width={20} src={calendarIcon} />}
              className=" hover:border-green-600 focus:border-green-600 w-[70vw] md:w-[300px] p-[10px] "
            />
            {date.getTime() > Date.now() && (
              <p className="text-red-500">التاريخ غير صالح</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default Datepicker;
