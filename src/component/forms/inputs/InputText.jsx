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
}) => {
  return (
    <div className="flex  w-full md:w-auto flex-col self-start gap-4">
      <div className="flex gap-2">
        <h2> {inputTitle} </h2>
        <span className="text-red-500">{icon}</span>
      </div>
      <Space.Compact size="large">
        <Controller
          control={control}
          name={name}
          rules={{
            required: "هذا الحقل مطلوب",
            pattern: pattern,
          }}
          render={({ field, fieldState }) => (
            <div>
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
                className="hover:border-emerald-500   focus:border-emerald-500 w-[90%] md:w-[300px]"
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
