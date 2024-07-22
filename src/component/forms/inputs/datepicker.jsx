import { DatePicker } from "antd";
import calendarIcon from "../../../assets/icons/calendar.svg";

const Datepicker = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="flex flex-col self-start gap-4">
      <div>
        <h2>تاريخ ارتكاب المخالفة</h2>
      </div>
      <DatePicker
        onChange={onChange}
        suffixIcon={<img src={calendarIcon} />}
        style={{ width: "300px",padding:"10px" }}
        className=" hover:border-green-600 focus:border-green-600 "
      />
      
    </div>
  );
};

export default Datepicker;
