/* eslint-disable react/prop-types */
import { DownOutlined } from "@ant-design/icons";
import { Select } from "antd";

const UsableReport = ({ selectTitle = "", textAreaLabel = "" }) => {
  return (
    <>
      <div>
        <label
          htmlFor="select"
          className="mb-2 text-[15px] font-medium inline-block"
        >
          {selectTitle}
        </label>
        <Select
          id="select"
          placeholder="النوع .."
          className="w-[50%] sm:w-1/3 flex items-center h-[37px] "
          suffixIcon={<DownOutlined className="text-[13px]" />}
          options={[
            {
              value: "0",
              label: <span className="text-[13px]">لا</span>,
            },
            {
              value: "1",
              label: <span className="text-[13px]">نعم</span>,
            },
          ]}
        />
      </div>
      <div>
        <label htmlFor="textarea" className="font-medium text-[15px]">
          {textAreaLabel}
        </label>
        <textarea
          id="textarea"
          className="mt-2 border border-gray-300 p-2 rounded-md w-full resize-none h-24 outline-none placeholder:text-sm"
          placeholder="اكتب هنا"
        ></textarea>
      </div>
    </>
  );
};

export default UsableReport;
