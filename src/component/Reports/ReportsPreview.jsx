import ReportsHeader from "../../custom hooks/ReportsHeader";

import ReportsTextIcon from "./ReportsTextIcon";
import note from "../../assets/icons/note.svg";
import prev2 from "../../assets/icons/prev2.svg";
import prev3 from "../../assets/icons/prev3.svg";
import prev4 from "../../assets/icons/prev4.svg";
import prev5 from "../../assets/icons/prev5.svg";
import prev6 from "../../assets/icons/prev6.svg";
import prev7 from "../../assets/icons/prev7.svg";
import prev8 from "../../assets/icons/prev8.svg";
import prev9 from "../../assets/icons/prev9.svg";
import prev1 from "../../assets/icons/prev1.svg";
import ReportImages from "./ReportImages";
import ReportFiles from "./ReportFiles";
import { useState } from "react";
import {
  UserOutlined,
  ContainerOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import DispalyData from "../../custom hooks/DispalyData";

const ReportsPreview = ({
  labelProps,
  values,
  fils,
  setFils,
  imgs,
  setImgs,
  title,
  src,
}) => {
  const date = new Date(values[3]?.$d);
  const fullDate =
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
  console.log(values, fils, imgs);
  return (
    <DispalyData
      imgs={imgs}
      fils={fils}
      values={values}
      setFils={setFils}
      setImgs={setImgs}
    />
  
  );
};

export default ReportsPreview;
