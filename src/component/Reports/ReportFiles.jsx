import React from "react";

const ReportFiles = ({ fils, setFils, preview }) => {
  const handleDeleteFiles = (id) => {
    const files = [...fils];
    files.splice(id, 1);
    setFils(files);
  };
  return (
    <>
      <div className="flex gap-10 mt-8">
        {fils?.map((file, index) => (
          <div className="relative">
            {preview && (
              <span
                onClick={() => handleDeleteFiles(index)}
                className="absolute cursor-pointer -left-2 -top-1 w-4 h-4 bg-white text-green-500 rounded-full flex items-center justify-center"
              >
                X
              </span>
            )}
            <div className="flex items-center gap-4 bg-[#DC60651A] p-2 px-4 rounded-md border border-[#D74D5224]">
              <div className="text-left">
                <h2 className="font-bold text-[#D74D52]">{file.name}</h2>
                <span className="text-sm text-gray-400">
                  {Math.ceil(file.size * Math.pow(10, -6))}
                  <span className="ml-1">mb</span>
                </span>
              </div>
              <img className="rounded-md" src="../src/assets/pdf.png" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReportFiles;
