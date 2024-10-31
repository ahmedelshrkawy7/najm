/* eslint-disable react/prop-types */
import { DownOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { Controller } from "react-hook-form";

const UsableReport = ({
  selectTitle = "",
  textAreaLabel = "",
  placeholder,
  data = [],
  control = () => {},
  name,
  title,
  notes,
  errors,
}) => {
  console.log(title);
  return (
    <>
      {!title ? (
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
      ) : (
        <>
          <label
            htmlFor="select"
            className="mb-0 text-[15px] font-medium inline-block"
          >
            {selectTitle}
          </label>
          {/* <Controller
            name=""
            control={control}
            render={({ field }) => ( */}
          <Input
            // {...field}
            disabled
            value={title}
            className="w-[50%] sm:w-1/3 lg:w-[220px] flex items-center h-[37px] "
            //   />
            // )}
          />
        </>
      )}
      {textAreaLabel && (
        <div className="relative my-1 mb-2">
          <label htmlFor="textarea" className="font-medium text-[15px]">
            {textAreaLabel}
          </label>
          <textarea
            {...control.register(notes, {
              required: "هذا الحقل مطلوب",
            })}
            id="textarea"
            name={notes}
            className="mt-2 border border-gray-300 p-2 rounded-md w-full resize-none h-24 outline-none placeholder:text-sm"
            placeholder="اكتب هنا"
          ></textarea>
          {errors?.[notes] && (
            <span className="text-red-500 absolute -bottom-4 right-0">
              {errors[notes].message}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default UsableReport;
