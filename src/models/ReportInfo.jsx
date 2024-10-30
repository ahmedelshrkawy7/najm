/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { CloudUploadOutlined } from "@ant-design/icons";
import UsableReport from "./UsableReport";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import useApi from "../utils/useApi";
import SuccessModal from "./successModal";

const ReportInfo = ({ title }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      _method: "PUT",
      action: "request_updates",
      notes: "",
      files: [],
    },
  });

  const [currentView, setCurrentView] = useState("default");
  const { postData } = useApi();

  let { id } = useParams();
  const mutation = useMutation(postData, {
    onSuccess: () => {
      setCurrentView("success");
      // successNotf("تم اسناد البلاغ للادارة بنجاح");
    },
    onError: (err) => {
      console.log("🚀 ~ err:", err);
    },
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    setValue("files", files);
  };

  let onSubmit = (data) => {
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
                  htmlFor="fileInput"
                >
                  <CloudUploadOutlined className="text-[#33835C] text-[20px]" />
                  <span className="text-sm">إضافة مرفقات</span>
                </label>
                <input
                  multiple
                  id="fileInput"
                  type="file"
                  name="files"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            <div className="py-3 pt-0 flex items-center justify-end">
              <button
                type="submit"
                className=" bg-[#33835C] text-white p-1 px-10 rounded-lg "
              >
                تاكيد
              </button>
            </div>
          </div>
        </form>
      ) : (
        <SuccessModal title={"تم طلب مستجدات من الإدارة بنجاح"} />
      )}
    </>
  );
};

export default ReportInfo;

/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// import { useState } from "react";
// import { CloudUploadOutlined } from "@ant-design/icons";
// import UsableReport from "./UsableReport";
// import { useForm } from "react-hook-form";
// import { useParams } from "react-router-dom";
// import { useMutation } from "react-query";
// import useApi from "../utils/useApi";
// import SuccessModal from "./successModal";

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

//   const [imageFiles, setImageFiles] = useState([]);
//   const [videoFiles, setVideoFiles] = useState([]);
//   const [documentFiles, setDocumentFiles] = useState([]);
//   const [currentView, setCurrentView] = useState("default");
//   const { postData } = useApi();
//   let { id } = useParams();

//   const mutation = useMutation(postData, {
//     onSuccess: () => {
//       setCurrentView("success");
//     },
//     onError: (err) => {
//       console.log("🚀 ~ err:", err);
//     },
//   });

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);

//     const images = files.filter((file) => file.type.startsWith("image"));
//     const videos = files.filter((file) => file.type.startsWith("video"));
//     const documents = files.filter((file) =>
//       file.type.startsWith("application")
//     );

//     // Update states
//     setImageFiles((prev) => [...prev, ...images]);
//     setVideoFiles((prev) => [...prev, ...videos]);
//     setDocumentFiles((prev) => [...prev, ...documents]);

//     // Update form state with all files
//     setValue("files", [
//       ...imageFiles,
//       ...videoFiles,
//       ...documentFiles,
//       ...files,
//     ]);
//     // setValue("files", [...files]);
//   };

//   // const removeFile = (fileName, type) => {
//   //   if (type === "image") {
//   //     setImageFiles((prev) => prev.filter((file) => file.name !== fileName));
//   //   } else if (type === "video") {
//   //     setVideoFiles((prev) => prev.filter((file) => file.name !== fileName));
//   //   } else if (type === "document") {
//   //     setDocumentFiles((prev) => prev.filter((file) => file.name !== fileName));
//   //   }

//   //   // Update form state
//   //   setValue("files", [
//   //     ...imageFiles.filter((file) => file.name !== fileName),
//   //     ...videoFiles.filter((file) => file.name !== fileName),
//   //     ...documentFiles.filter((file) => file.name !== fileName),
//   //   ]);
//   // };

//   const onSubmit = (data) => {
//     console.log("🚀 ~ onSubmit ~ data:", data);
//     mutation.mutate([`/reports/${id}`, data]);
//   };
//   console.log(errors, "ghsdsghsdgh");
//   return (
//     <>
//       {currentView === "default" ? (
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="px-5 py-3 flex flex-col gap-2">
// <UsableReport
//   selectTitle={"نوع الاجراء"}
//   textAreaLabel={"يرجى كتابة سبب الرفض"}
//   control={control}
//   data={[]}
//   name=""
//   title={title}
//   notes={"notes"}
//   files={"files"}
//   errors={errors}
// />
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
//                   htmlFor="files"
//                 >
//                   <CloudUploadOutlined className="text-[#33835C] text-[20px]" />
//                   <span className="text-sm">إضافة مرفقات</span>
//                 </label>
//                 <input
//                   {...control.register("files", {
//                     required: { value: true, message: "هذا الحقل مطلوب" },
//                   })}
//                   multiple
//                   id="files"
//                   type="file"
//                   name="files"
//                   className="hidden"
//                   onChange={handleFileChange}
//                 />
//               </div>
//               {errors.files && (
//                 <span className="text-red-500">{errors.files.message}</span>
//               )}
//             </div>

//             {/* Display selected files with previews */}
//             <div className="py-3 space-y-2 flex flex-col">
//               {imageFiles.length > 0 && (
//                 <div>
//                   <h3 className="font-semibold">الصور</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {imageFiles.map((file) => (
//                       <div
//                         key={file.name}
//                         className="relative flex items-center flex-col"
//                       >
//                         <img
//                           src={URL.createObjectURL(file)}
//                           alt={file.name}
//                           className="w-60 h-30 object-cover rounded-md"
//                         />
//                         <span className="text-sm">{file.name}</span>
//                         {/* <button
//                           type="button"
//                           onClick={() => removeFile(file.name, "image")}
//                           className="text-red-600 ml-2"
//                         >
//                           X
//                         </button> */}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {videoFiles.length > 0 && (
//                 <div>
//                   <h3 className="font-semibold">الفيديوهات</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {videoFiles.map((file) => (
//                       <div
//                         key={file.name}
//                         className="relative flex items-center flex-col"
//                       >
//                         <video
//                           src={URL.createObjectURL(file)}
//                           className="w-60 h-30 object-cover rounded-md"
//                           controls
//                         />
//                         <span className="text-sm">{file.name}</span>
//                         {/* <button
//                           type="button"
//                           onClick={() => removeFile(file.name, "video")}
//                           className="text-red-600 ml-2"
//                         >
//                           X
//                         </button> */}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {documentFiles.length > 0 && (
//                 <div>
//                   <h3 className="font-semibold">المرفقات</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {documentFiles.map((file) => (
//                       <div
//                         key={file.name}
//                         className="flex items-center flex-col"
//                       >
//                         <span className="text-sm">{file.name}</span>
//                         {/* <button
//                           type="button"
//                           onClick={() => removeFile(file.name, "document")}
//                           className="text-red-600 ml-2"
//                         >
//                           X
//                         </button> */}
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="py-3 pt-0 flex items-center justify-end">
//               <button
//                 type="submit"
//                 className="bg-[#33835C] text-white p-1 px-10 rounded-lg"
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
