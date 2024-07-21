import { DatePicker } from "antd";
import calendarIcon from "../../../assets/icons/calendar.svg";

const Datepicker = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2>thsi is header</h2>
      </div>
      <DatePicker
        onChange={onChange}
        suffixIcon={<img src={calendarIcon} />}
        style={{ width: "300px" }}
        className=" hover:border-green-600 focus:border-green-600 "
      />
    </div>
  );
};

export default Datepicker;
