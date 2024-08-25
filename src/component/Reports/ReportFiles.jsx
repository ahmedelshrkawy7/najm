<<<<<<< HEAD
import React, { memo } from "react";
=======
import React from "react";
import ReportsTextIcon from "./ReportsTextIcon";
import prev7 from "../../assets/icons/prev7.svg";
>>>>>>> be7af2d7b91c5769345ab15712a600fdedf031bb

const ReportFiles = ({ fils, setFils, preview }) => {
  const handleDeleteFiles = (id) => {
    const files = [...fils];
    files.splice(id, 1);
    setFils(files);
  };

  const backgroundColors = {
    doc: "#E8F0FE",
    docx: "#E8F0FE",
    pdf: "#FDECEC",
    rar: "#FFF4E5",
    zip: "#FFF4E5",
    default: "#F0F0F0",
  };

  const textColors = {
    doc: "#1E4F91",
    docx: "#1E4F91",
    pdf: "#D74D52",
    rar: "#C07530",
    zip: "#C07530",
    pptx: "#D74D52",
    default: "#000000",
  };

  const fileIcons = {
    doc: "word.png",
    docx: "word.png",
    pdf: "pdf.png",
    rar: "rar.png",
    zip: "zip.png",
    rar: "rar.png",
    pptx: "powerpoint.png",
    default: "default.png",
  };

  const getFileExtension = (fileName) => {
    return fileName.split(".").pop().toLowerCase();
  };

  const getBackgroundColor = (file) => {
    const extension = getFileExtension(file.name);
    return backgroundColors[extension] || backgroundColors.default;
  };

  const getTextColor = (file) => {
    const extension = getFileExtension(file.name);
    return textColors[extension] || textColors.default;
  };

  const makeSrc = (file) => {
    const extension = getFileExtension(file.name);
    return fileIcons[extension] || fileIcons.default;
  };

  return (
    <>
      <div
        className={`flex mb-4 flex-col  
       mt-4 gap-2`}
      >
        <div className="flex items-center gap-2 ">
          <div className=" rounded-full   h-12  flex items-center justify-center">
            <img src={prev7} />
          </div>

          <span className="font-medium !min-w-[100px]">
            الملفات ( {fils.length} )
          </span>
        </div>
      </div>{" "}
      <div className="flex flex-wrap gap-10 mt-8">
        {fils?.map((file, index) => (
          <div className="relative cursor-pointer">
            {preview && (
              <span
                onClick={() => handleDeleteFiles(index)}
                className="absolute cursor-pointer w-5 h-5 p-2 h-1 -left-2 -top-1 text-center  bg-[#33835C]  text-white rounded-full flex items-center justify-center z-50"
              >
                <span className="-mt-[3px] text-[20px] font-bold">&times;</span>
              </span>
            )}
            <div
              className={`flex items-center gap-4  ${
                file.type.endsWith("pdf") ? "bg-[#DC60651A]" : "bg-blue-100"
              } p-2 px-4 rounded-md border border-[#D74D5224]`}
              style={{ backgroundColor: getBackgroundColor(file) }}
              onClick={() => {
                window.open(URL.createObjectURL(file), "_blank");
              }}
            >
              <div className="text-left">
                <h2
                  className={`font-bold  w-[120px] text-nowrap overflow-hidden text-ellipsis ${
                    file.type.endsWith("pdf")
                      ? "text-[#D74D52]"
                      : "text-blue-400"
                  }`}
                  style={{ direction: "ltr", color: getTextColor(file) }}
                >
                  {file.name}
                </h2>
                <span
                  className={`text-sm ${
                    file.type.endsWith("pdf")
                      ? "text-gray-400"
                      : "text-blue-300"
                  }`}
                >
                  {(file.size * Math.pow(10, -6)).toFixed(2)}
                  <span className="ml-1">mb</span>
                </span>
              </div>

              <img
                className="rounded-md w-[20px]"
                src={`../../../src/assets/${makeSrc(file)}`}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

<<<<<<< HEAD
export default memo(ReportFiles);
=======
export default React.memo(ReportFiles);
>>>>>>> be7af2d7b91c5769345ab15712a600fdedf031bb
