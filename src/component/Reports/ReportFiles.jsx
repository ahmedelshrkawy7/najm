/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import ReportsTextIcon from "./ReportsTextIcon";
import prev7 from "../../assets/icons/prev7.svg";

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
    xls: "#E8F5E9",
    xlsx: "#E8F5E9",
    default: "#F0F0F0",
  };

  const textColors = {
    doc: "#1E4F91",
    docx: "#1E4F91",
    pdf: "#D74D52",
    rar: "#C07530",
    zip: "#C07530",
    pptx: "#D74D52",
    ppt: "#D74D52",
    // xls: "#E8F5E9",
    // xlsx: "#E8F5E9",
    default: "#000000",
  };

  const fileIcons = {
    doc: "word.png",
    docx: "word.png",
    pdf: "pdf.png",
    rar: "rar.png",
    zip: "zip.png",
    pptx: "powerpoint.png",
    ppt: "powerpoint.png",
    xls: "excel.png",
    xlsx: "excel.png",
    default: "default.png",
  };

  const getFileExtension = (fileName) => {
    if (!fileName) return "";
    return fileName.split(".").pop().toLowerCase();
  };

  const getBackgroundColor = (file) => {
    const extension = getFileExtension(file?.name || file?.file_name);
    return backgroundColors[extension] || backgroundColors.default;
  };

  const getTextColor = (file) => {
    const extension = getFileExtension(file?.name || file?.file_name);
    return textColors[extension] || textColors.default;
  };

  const makeSrc = (file) => {
    const extension = getFileExtension(file?.name || file?.file_name);
    return fileIcons[extension] || fileIcons.default;
  };
  console.log(fils);

  return (
    <>
      {!!fils?.length && (
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
        </div>
      )}
      <div className="flex flex-wrap gap-10 mt-8">
        {fils?.map((file, index) => (
          <div className="relative cursor-pointer" key={file.id}>
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
                file?.type?.startsWith("application") ||
                file?.file_name.endsWith("pdf")
                  ? "bg-[#DC60651A]"
                  : "bg-blue-100"
              } p-2 px-4 rounded-md border border-[#D74D5224]`}
              style={{ backgroundColor: getBackgroundColor(file) }}
              onClick={() => {
                window.open(
                  file?.file_url || URL?.createObjectURL(file),
                  "_blank"
                );
              }}
            >
              <div className="text-left">
                <h2
                  className={`font-bold  w-[120px] text-nowrap overflow-hidden text-ellipsis ${
                    file?.type?.startsWith("application") ||
                    file?.file_name.endsWith("pdf")
                      ? "text-[#D74D52]"
                      : "text-blue-400"
                  }`}
                  style={{ direction: "ltr", color: getTextColor(file) }}
                >
                  {file?.name || file.file_name}
                </h2>
                <span
                  className={
                    "text-sm text-gray-400"
                    // `text-sm
                    // ${
                    //   file?.type?.startsWith("application") ||
                    //   file?.file_name?.endsWith("pdf")
                    //     ? "text-gray-400"
                    //     : "text-blue-300"
                    // } `
                  }
                >
                  {/* || file?.file_size * Math.pow(10, -6)).toFixed( 2 ) */}
                  {(!isNaN(Number(file?.file_size)) &&
                    file?.file_size !== null &&
                    (Number(file?.file_size) / 1024 ** 2).toFixed(3)) ||
                    (file?.size / 1024 ** 2).toFixed(3)}
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

export default React.memo(ReportFiles);
