import { Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { DownOutlined } from "@ant-design/icons";
const SelectInput = ({ inpTitle, errors, control, iconLabel }) => {
  return (
    <div className="flex flex-col self-start gap-4">
      <div className="flex gap-2">
        <h2>{inpTitle}</h2>
        <span className="text-red-500">{iconLabel}</span>
      </div>

      <Controller
        control={control}
        name="suspectKnown"
        rules={{ required: "هذا الحق مطلوب", message: "هذا الحقل مطلوب" }}
        render={({ field, fieldState }) => (
          <div>
            <Select
              {...field}
              suffixIcon={<DownOutlined className="text-[16px]" />}
              defaultValue={field.value}
              className="w-[70vw] flex items-center h-[43.6px] sm:w-[300px] "
              options={[
                { value: "0", label: <span className="text-[16px] ">لا</span> },
                {
                  value: "1",
                  label: <span className="text-[16px] ">نعم</span>,
                },
              ]}
            />
          </div>
        )}
      />
      {errors.inputControl && (
        <p className="text-red-500">{errors.inputControl.message}</p>
      )}
    </div>
  );
};

export default SelectInput;
