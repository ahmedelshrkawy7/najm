import React from "react";

const ReportFiles = ({ fils, setFils, preview }) => {
  const handleDeleteFiles = (id) => {
    const files = [...fils];
    files.splice(id, 1);
    setFils(files);
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
            <div className="flex items-center gap-4 bg-[#DC60651A] p-2 px-4 rounded-md border border-[#D74D5224]">
              <div className="text-left">
                <h2
                  className="font-bold text-[#D74D52] w-[120px] text-nowrap overflow-hidden text-ellipsis "
                  style={{ direction: "ltr" }}
                >
                  {file.name}
                </h2>
                <span className="text-sm text-gray-400">
                  {(file.size * Math.pow(10, -6)).toFixed(2)}
                  <span className="ml-1">mb</span>
                </span>
              </div>

              <img
                className="rounded-md w-[20px]"
                src={`../../../src/assets/${
                  file.type.endsWith("pdf") ? "pdf.png" : "doc.svg"
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
