import React, { useState } from "react";
import exportSvg from "../../../assets/icons/export.svg";
const FileInput = () => {
  const [file, selectedFile] = useState({});
  console.log(file?.status);
  console.log(file);

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
        onChange={(e) => selectedFile(URL.createObjectURL(e.target.files[0]))}
        id="fileInput"
        type="file"
        className="hidden"
      />
      {file && <img src={file} />}
    </div>
  );
};

export default FileInput;
