import { Select } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

const SelectInput = ({ inpTitle, errors, control }) => {
  return (
    <div className="flex flex-col self-start gap-4">
      <div>
        <h2>{inpTitle}</h2>
      </div>

      <Controller
        control={control}
        name="suspectKnown"
        rules={{ required: "هذا الحق مطلوب", message: "هذا الحقل مطلوب" }}
        render={({ field, fieldState }) => (
          <div>
            <Select
              placeholder="dasdfawd"
              defaultValue="نعم/لا"
              {...field}
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
