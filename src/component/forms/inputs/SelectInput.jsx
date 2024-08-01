import { Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

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
              defaultValue={field.value}
              style={{ width: "300px" }}
              options={[
                { value: "0", label: <span>لا</span> },
                { value: "1", label: <span>نعم</span> },
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
