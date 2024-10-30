// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
// import { useState } from "react";
// import { CloudUploadOutlined } from "@ant-design/icons";
// import UsableReport from "./UsableReport";
// import { useForm } from "react-hook-form";
// import { useParams } from "react-router-dom";
// import { useMutation } from "react-query";
// import useApi from "../utils/useApi";
// import SuccessModal from "./successModal";
// import ReportImages from "../component/Reports/ReportImages";

// const ReportInfo = ({ title }) => {
//   const {
//     control,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     mode: "onBlur",
//     defaultValues: {
//       _method: "PUT",
//       action: "request_updates",
//       notes: "",
//       files: [],
//     },
//   });

//   const [currentView, setCurrentView] = useState("default");
//   const { postData } = useApi();

//   let { id } = useParams();
//   const mutation = useMutation(postData, {
//     onSuccess: () => {
//       setCurrentView("success");
//       // successNotf("تم اسناد البلاغ للادارة بنجاح");
//     },
//     onError: (err) => {
//       console.log("🚀 ~ err:", err);
//     },
//   });

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);

//     setValue("files", files);
//   };

//   let onSubmit = (data) => {
//     console.log("🚀 ~ onSubmit ~ data:", data);
//     mutation.mutate([`/reports/${id}`, data]);
//   };
//   return (
//     <>
//       {currentView === "default" ? (
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="px-5 py-3 flex flex-col gap-2">
//             <UsableReport
//               selectTitle={"نوع الاجراء"}
//               textAreaLabel={"يرجى كتابة سبب الرفض"}
//               control={control}
//               data={[]}
//               name=""
//               title={title}
//               notes={"notes"}
//               files={"files"}
//               errors={errors}
//             />
//             <div>
//               <label
//                 htmlFor="fileInput"
//                 className="mb-2 text-[15px] font-medium inline-block"
//               >
//                 ارفاق مستند
//               </label>
//               <div>
//                 <label
//                   className="flex gap-2 justify-center p-2 cursor-pointer bg-[#33835C1A] rounded text-black items-center w-[220px] h-[40px]"
//                   htmlFor="fileInput"
//                 >
//                   <CloudUploadOutlined className="text-[#33835C] text-[20px]" />
//                   <span className="text-sm">إضافة مرفقات</span>
//                 </label>
//                 <input
//                   multiple
//                   id="fileInput"
//                   type="file"
//                   name="files"
//                   className="hidden"
//                   onChange={handleFileChange}
//                 />
//               </div>
//             </div>

//             <div className="py-3 pt-0 flex items-center justify-end">
//               <button
//                 type="submit"
//                 className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
//               >
//                 تاكيد
//               </button>
//             </div>
//           </div>
//         </form>
//       ) : (
//         <SuccessModal title={"تم طلب مستجدات من الإدارة بنجاح"} />
//       )}
//     </>
//   );
// };

// export default ReportInfo;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { CloudUploadOutlined, EyeOutlined } from "@ant-design/icons";
import UsableReport from "./UsableReport";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import useApi from "../utils/useApi";
import SuccessModal from "./successModal";
import prev6 from "../assets/icons/prev6.svg";
import ReportFiles from "../component/Reports/ReportFiles";

const ReportInfo = ({ title }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      _method: "PUT",
      action: "request_updates",
      notes: "",
      files: "",
    },
  });

  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [documentFiles, setDocumentFiles] = useState([]);
  const [currentView, setCurrentView] = useState("default");
  const { postData } = useApi();
  let { id } = useParams();

  const mutation = useMutation(postData, {
    onSuccess: () => {
      setCurrentView("success");
    },
    onError: (err) => {
      console.log("🚀 ~ err:", err);
    },
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const images = files.filter((file) => file.type.startsWith("image"));
    const videos = files.filter((file) => file.type.startsWith("video"));
    const documents = files.filter((file) =>
      file.type.startsWith("application")
    );

    setImageFiles((prev) => [...prev, ...images]);
    setVideoFiles((prev) => [...prev, ...videos]);
    setDocumentFiles((prev) => [...prev, ...documents]);

    // setValue("files", [
    //   ...imageFiles,
    //   ...videoFiles,
    //   ...documentFiles,
    //   ...files,
    // ]);
    setValue("files", [...files]);
  };

  const handleDeleteImages = (id) => {
    const images = [...imageFiles];
    images.splice(id, 1);
    setImageFiles(images);
  };

  const handleDeleteVideos = (id) => {
    const videos = [...videoFiles];
    videos.splice(id, 1);
    setVideoFiles(videos);
  };

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    mutation.mutate([`/reports/${id}`, data]);
  };
  return (
    <>
      {currentView === "default" ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-5 py-3 flex flex-col gap-2">
            <UsableReport
              selectTitle={"نوع الاجراء"}
              textAreaLabel={"يرجى كتابة سبب الرفض"}
              control={control}
              data={[]}
              name=""
              title={title}
              notes={"notes"}
              files={"files"}
              errors={errors}
            />
            <div>
              <label
                htmlFor="fileInput"
                className="mb-2 text-[15px] font-medium inline-block"
              >
                ارفاق مستند
              </label>
              <div>
                <label
                  className="flex gap-2 justify-center p-2 cursor-pointer bg-[#33835C1A] rounded text-black items-center w-[220px] h-[40px]"
                  htmlFor="files"
                >
                  <CloudUploadOutlined className="text-[#33835C] text-[20px]" />
                  <span className="text-sm">إضافة مرفقات</span>
                </label>
                <input
                  {...control.register("files", {
                    required: { value: true, message: "هذا الحقل مطلوب" },
                  })}
                  multiple
                  id="files"
                  type="file"
                  name="files"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
              {errors.files && (
                <span className="text-red-500">{errors.files.message}</span>
              )}
            </div>

            {imageFiles.length > 0 && (
              <div className="flex flex-wrap flex-col mt-2 gap-6">
                <div
                  className={`flex flex-col  
        gap-1`}
                >
                  <div className="flex items-center gap-4 ">
                    <div className=" rounded-full   h-12  flex items-center justify-center">
                      <img src={prev6} />
                    </div>

                    <span className="font-medium !min-w-[100px]">
                      الصور ( {imageFiles.length} )
                    </span>
                  </div>
                </div>
                {imageFiles.map((img, index) => (
                  <div key={Math.random()}>
                    <div className=" relative h-full w-[220px]  ">
                      {
                        <>
                          <div
                            className="relative wrapper transition-all duration-1000 h-full border border-gray-300 rounded-md "
                            style={{ aspectRatio: 16 / 9 }}
                          >
                            <img
                              className="rounded-md object-cover cursor-pointer  w-full h-full"
                              src={
                                img.file_url
                                  ? img.file_url
                                  : URL.createObjectURL(img)
                              }
                              draggable="false"
                            />
                          </div>
                          <div
                            onClick={() => handleDeleteImages(index)}
                            className="absolute cursor-pointer w-5 h-5 -left-2 -top-1  text-white rounded-full flex items-center justify-center z-50 bg-green-700 "
                          >
                            <span className=" font-bold  -mt-[3px] text-[20px] ">
                              &times;
                            </span>
                          </div>
                        </>
                      }
                    </div>
                  </div>
                ))}
              </div>
            )}
            {videoFiles.length > 0 && (
              <div className="flex flex-wrap flex-col mt-2 gap-6">
                <div className={`flex flex-col gap-1`}>
                  <div className="flex items-center gap-4 ">
                    <div className=" rounded-full h-12 flex items-center justify-center">
                      <img src={prev6} />
                    </div>

                    <span className="font-medium !min-w-[100px]">
                      الفيديو ( {videoFiles.length} )
                    </span>
                  </div>
                </div>
                {videoFiles.map((img, index) => (
                  <div key={Math.random()}>
                    <div className="relative h-full w-[220px]">
                      {
                        <>
                          <div
                            className="relative wrapper transition-all duration-1000 h-full border border-gray-300 rounded-md "
                            style={{ aspectRatio: 16 / 9 }}
                          >
                            <video
                              className="rounded-md object-cover cursor-pointer inline-block w-full h-full"
                              src={img?.file_url || URL?.createObjectURL(img)}
                              muted
                            />
                          </div>
                          <div
                            onClick={() => handleDeleteVideos(index)}
                            className="absolute cursor-pointer w-5 h-5 -left-2 -top-1  text-white rounded-full flex items-center justify-center z-50 bg-green-700 "
                          >
                            <span className=" font-bold  -mt-[3px] text-[20px] ">
                              &times;
                            </span>
                          </div>
                        </>
                      }
                    </div>
                  </div>
                ))}
              </div>
            )}

            {documentFiles.length > 0 && (
              <ReportFiles
                preview={true}
                setFils={setDocumentFiles}
                fils={documentFiles}
                setValue={setValue}
                watch={watch}
              />
            )}
          </div>

          <div className="py-3 pt-0 flex items-center justify-end ml-5">
            <button
              type="submit"
              className="bg-[#33835C] text-white p-1 px-10 rounded-lg"
            >
              تاكيد
            </button>
          </div>
        </form>
      ) : (
        <SuccessModal title={"تم طلب مستجدات من الإدارة بنجاح"} />
      )}
    </>
  );
};

export default ReportInfo;
