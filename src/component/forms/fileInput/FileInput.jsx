/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import exportSvg from "../../../assets/icons/export.svg";
import { Controller } from "react-hook-form";
import ReportsTextIcon from "../../Reports/ReportsTextIcon";
import img1 from "../../../assets/icons/calendar.svg";
import ReportImages from "../../Reports/ReportImages";
import ReportFiles from "../../Reports/ReportFiles";
import { CloudUploadOutlined } from "@ant-design/icons";

const FileInput = ({
  imgs,
  setImgs,
  fils,
  setFils,
  videos,
  setVideos,
  register,
  control,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeFile = (e) => {
    console.log("🚀 ~ handleChangeFile ~ e:", e.target.files);
    let allImages = [...e.target.files].filter((file) =>
      file.type.startsWith("image")
    );
    let allVideos = [...e.target.files].filter(
      (file) => file.type.startsWith("video") || file.type.startsWith("audio")
    );

    console.log(allVideos);
    console.log(e.target.files);
    let allFiles = [...e.target.files]
      .map((file) => {
        if (file.name.endsWith(".rar")) {
          return new File([file], file.name, {
            type: "application/x-rar-compressed",
          });
        }
        return file;
      })
      .filter((file) => file.type.startsWith("application"));
    setIsLoading(true);
    setTimeout(() => {
      setImgs([...imgs, ...allImages]);
      setVideos([...videos, ...allVideos]);
      setFils([...fils, ...allFiles]);
      setIsLoading(false);
    }, 0);

    e.target.value = "";
  };

  console.log(imgs, videos);

  return (
    <>
      <div>
        <h2> المرفقات</h2>
      </div>
      <label
        className="flex gap-2 justify-center p-2 cursor-pointer bg-[#33835C1A] rounded text-black items-center w-[220px] h-[40px]"
        htmlFor="fileInput"
      >
        {/* <img className="w-[20px]" src={exportSvg} /> */}
        <CloudUploadOutlined className="text-[#33835C] text-[20px]" />
        <span className="text-sm">إضافة مرفقات</span>
      </label>

      <Controller
        name="files"
        control={control}
        render={({ field: { onChange, value } }) => {
          const handleChange = (e) => {
            onChange([...value, ...e.target.files]);
            handleChangeFile(e);
          };

          return (
            <input
              // onChange={handleChangeFile}
              multiple
              id="fileInput"
              type="file"
              name="files"
              className="hidden"
              onChange={handleChange}
            />
          );
        }}
      />
      <small className="text-gray-600">
        {" "}
        يمكن إضافة ملفات متعددة بصيغ مختلفة.{" "}
      </small>
      {(imgs?.length > 0 || videos?.length > 0) && (
        <>
          <ReportImages
            videos={videos}
            setVideos={setVideos}
            setImgs={setImgs}
            imgs={imgs}
            preview={true}
          />
        </>
      )}
      {isLoading === true && fils.length === 0 && imgs.length === 0 && (
        <div className="flex items-center justify-center w-52 mt-8">
          <div className="loader my-4"></div>
        </div>
      )}
      {fils.length > 0 && (
        <ReportFiles setFils={setFils} fils={fils} preview={true} />
      )}
    </>
  );
};

export default FileInput;
