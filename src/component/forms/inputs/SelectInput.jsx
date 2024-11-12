/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";
import { DownOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const SelectInput = ({
  inpTitle,
  errors,
  control,
  iconLabel,
  nameType,
  options,
  placeholder,
  disapled,
  note,
}) => {
  return (
    <div className="flex flex-col self-start gap-4 ">
      <div className="flex gap-2">
        <h2>{inpTitle}</h2>
        <span className="text-red-500">{iconLabel}</span>
        {note && (
          <Tooltip
            title={<p className="text-white">{note}</p>}
            overlayStyle={{
              // width: "100%",
              // maxWidth: "none",
              // paddingInline: "40px",
              whiteSpace: "normal", // Allow text to wrap within the tooltip
              wordWrap: "break-word", // Break words when necessary
              maxWidth: "none", // Remove any max-width limitation
              width: "92.5%", // Allow width to auto-size based on content
              paddingInline: "16px", // Optional: Adds some padding inside
              textAlign: "left",
              right: "3.7%",
            }}
            // Prevents max-width constraint
          >
            <ExclamationCircleOutlined
              style={{ color: "red", marginLeft: "8px", cursor: "pointer" }}
            />
          </Tooltip>
        )}
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
              className="w-[70vw] flex items-center h-[40px] sm:w-[280px] relative"
              options={options}
              // dropdownMatchSelectWidth={false}
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
