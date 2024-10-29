/* eslint-disable react/prop-types */
import { DownOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { Controller } from "react-hook-form";

const UsableReport = ({
  selectTitle = "",
  textAreaLabel = "",
  placeholder,
  data = [],
  control = () => {},
  name,
}) => {
  return (
    <>
      <div>
        <label
          htmlFor="select"
          className="mb-2 text-[15px] font-medium inline-block"
        >
          {selectTitle}
        </label>
        <Controller
          control={control}
          name={name}
          rules={{ required: "يجب اختيار إدارة" }}
          render={({ field }) => (
            <Select
              id="select"
              {...field}
              placeholder={placeholder || "النوع .."}
              className="w-[50%] sm:w-1/3 flex items-center h-[37px] "
              suffixIcon={<DownOutlined className="text-[13px]" />}
            >
              <Option value="" disabled>
                اختر الادارة
              </Option>
              {data.map((opt) => (
                <Option key={opt.id} value={opt.id}>
                  {opt.name_ar}
                </Option>
              ))}
            </Select>
          )}
        />
      </div>
      {textAreaLabel && (
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
      )}
    </>
  );
};

export default UsableReport;
