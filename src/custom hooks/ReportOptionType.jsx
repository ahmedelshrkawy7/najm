import { Checkbox } from "antd";
import React, { useState } from "react";

const ReportOptionType = ({ label }) => {
  const [checked, setChecked] = useState(false);
  const onChange = (e) => {
    console.log(e.target.checked);
    setChecked(e.target.checked);
  };
  return (
    <Checkbox checked={checked} onChange={onChange}>
      {label}
    </Checkbox>
  );
};

export default ReportOptionType;
