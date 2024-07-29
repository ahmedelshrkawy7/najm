import React, { useState } from "react";
import exportSvg from "../../../assets/icons/export.svg";
import { Controller } from "react-hook-form";
import ReportsTextIcon from "../../Reports/ReportsTextIcon";
import img1 from "../../../assets/icons/calendar.svg";
import ReportImages from "../../Reports/ReportImages";
import ReportFiles from "../../Reports/ReportFiles";
const FileInput = ({ imgs, setImgs, fils, setFils, register }) => {
  
  const handleChangeFile = (e) => {
    let allImages = [...e.target.files].filter((file) =>
      file.type.startsWith("image")
    );
    console.log(allImages);
    setImgs([...imgs, ...allImages]);
    let allFiles = [...e.target.files].filter((file) =>
      file.type.endsWith("pdf")
    );
    setFils([...fils, ...allFiles]);
  };

  return (
    <div>
      <label
        className="flex gap-2 justify-center p-2 cursor-pointer bg-[#33835C1A] rounded text-[#33835C]  w-[300px]"
        htmlFor="fileInput"
      >
        <img src={exportSvg} />
        <span className="text-sm">ارفق الملف هنا </span>
      </label>
      <input
        onChange={handleChangeFile}
        multiple
        id="fileInput"
        type="file"
        className="hidden"
      />
      {imgs && <ReportImages setImgs={setImgs} imgs={imgs} preview={true} />}
      {fils && <ReportFiles setFils={setFils} fils={fils} preview={true} />}
    </div>
  );
};

export default FileInput;
