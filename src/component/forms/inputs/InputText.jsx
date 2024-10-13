/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Input, Space } from "antd";
import { useState } from "react";
import { Controller } from "react-hook-form";

export const InputText = ({
  inputTitle,
  inputPlaceHolder,
  name,
  errors,
  control,
  pattern,
  setValue,
  max,
  icon,
  validate,
}) => {
  return (
    <div className="flex w-full md:w-auto flex-col self-start gap-4 ">
      <div className="flex gap-2">
        <h2> {inputTitle} </h2>
        <span className="text-red-500">{icon}</span>
      </div>
      <Space.Compact size="large">
        <Controller
          control={control}
          name={name}
          rules={{
            required:
              (name === "user_email" || name === "result") && "هذا الحقل مطلوب",
            pattern: pattern,
            validate: validate,
          }}
          render={({ field, fieldState }) => (
            <div className="w-full">
              <Input
                {...field}
                maxLength={max}
                onChange={(e) => {
                  {
                    field.onChange(e);
                    name === "user_phone" &&
                      setValue(
                        "user_phone",
                        e.target.value.replace(/[a-zA-Z]+/g, "")
                      );
                    name === "user_name" &&
                      setValue(
                        "user_name",
                        e.target.value.replace(/[0-9]+/g, "")
                      );
                  }
                }}
                className="hover:border-emerald-500   focus:border-emerald-500 w-full md:min-w-[300px] "
                placeholder={inputPlaceHolder}
              />
              {errors[name] && (
                <p className="text-red-500">{errors[name].message}</p>
              )}
            </div>
          )}
        />
      </Space.Compact>
    </div>
  );
};
