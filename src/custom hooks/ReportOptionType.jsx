/* eslint-disable react/prop-types */
import { Checkbox } from "antd";
// import React, { useState } from "react";
import { Controller } from "react-hook-form";

const ReportOptionType = ({ label, name, control }) => {
  // const [checked, setChecked] = useState(false);
  // const onChange = (e) => {
  //   console.log(e.target.checked);
  //   setChecked(e.target.checked);
  // };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        const isChecked = value.includes(label);
        const handleCheckboxChange = (e) => {
          const newValue = e.target.checked
            ? [...value, label]
            : value.filter((item) => item !== label);
          onChange(newValue);
        };
        return (
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            className="custom-checkbox font-medium"
          >
            {label}
          </Checkbox>
        );
      }}
    />
  );
};

export default ReportOptionType;
