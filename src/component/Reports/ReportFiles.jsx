import React from "react";

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
      <div className="flex flex-wrap gap-10 mt-8">
        {fils?.map((file, index) => (
          <div className="relative">
            {preview && (
              <span
                onClick={() => handleDeleteFiles(index)}
                className="absolute cursor-pointer w-2 p-2 h-1 -left-2 -top-1 text-center  bg-[#33835C]  text-white rounded-full flex items-center justify-center z-50"
              >
                <span className="-mt-[2px] text-[15px]">&times;</span>
              </span>
            )}
            <div
              className={`flex items-center gap-4  ${
                file.type.endsWith("pdf") ? "bg-[#DC60651A]" : "bg-blue-100"
              } p-2 px-4 rounded-md border border-[#D74D5224]`}
              style={{ backgroundColor: getBackgroundColor(file) }}
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
                src={`../../../src/assets/${
                  // file.type.endsWith("pdf") ? "pdf.png" : "doc.svg"
                  makeSrc(file)
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReportFiles;
