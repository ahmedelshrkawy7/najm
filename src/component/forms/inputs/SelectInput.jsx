/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { DownOutlined } from "@ant-design/icons";
const SelectInput = ({
  inpTitle,
  errors,
  control,
  iconLabel,
  nameType,
  options,
  placeholder,
  disapled,
}) => {
  return (
    <div className="flex flex-col self-start gap-4">
      <div className="flex gap-2">
        <h2>{inpTitle}</h2>
        <span className="text-red-500">{iconLabel}</span>
      </div>

      <Controller
        control={control}
        name={nameType}
        // rules={{ required: "هذا الحق مطلوب", message: "هذا الحقل مطلوب" }}
        rules={{
          required: {
            value: true,
            message: "هذا الحقل مطلوب",
          },
        }}
        render={({ field, fieldState }) => (
          <div>
            <Select
              placeholder={placeholder}
              {...field}
              suffixIcon={<DownOutlined className="text-[16px]" />}
              defaultValue={field.value}
              // value={field.value || undefined}
              className="w-[70vw] flex items-center h-[40px] sm:w-[280px]"
              options={options}
              // allowClear={field.value && true}
              disabled={disapled}
            />
            {fieldState.error && disapled !== true && (
              <p className="text-red-500">{fieldState.error.message}</p>
            )}
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
