import ReportsHeader from "../../custom hooks/ReportsHeader";

import ReportsTextIcon from "./ReportsTextIcon";
import note from "../../assets/icons/note.svg";
import prev2 from "../../assets/icons/prev2.svg";
import prev3 from "../../assets/icons/prev3.svg";
import prev4 from "../../assets/icons/prev4.svg";
import prev5 from "../../assets/icons/prev5.svg";
import prev6 from "../../assets/icons/prev6.svg";
import prev7 from "../../assets/icons/prev7.svg";
import prev8 from "../../assets/icons/prev8.svg";
import prev9 from "../../assets/icons/prev9.svg";
import prev1 from "../../assets/icons/prev1.svg";
import ReportImages from "./ReportImages";
import ReportFiles from "./ReportFiles";
import { useState } from "react";
import {
  UserOutlined,
  ContainerOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import DispalyData from "../../custom hooks/DispalyData";

const ReportsPreview = ({
  labelProps,
  values,
  fils,
  setFils,
  imgs,
  setImgs,
  title,
  src,
}) => {
  console.log(values, fils, imgs);
  return (
    <div className="">
      <DispalyData
        imgs={imgs}
        fils={fils}
        values={values}
        setFils={setFils}
        setImgs={setImgs}
      />
    </div>
    // <div className="flex flex-col  gap-8">
    //   <ReportsHeader title={"بيانات البلاغ"} />
    //   <div className="px-8 pt-8 flex flex-col  gap-8">
    //     <div className="border rounded-md border-gray-300">
    //       <div className="flex  p-4  rounded-xl flex-col gap-6 mb-2">
    //         <div className="flex   gap-2 items-center  rounded-full">
    //           <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
    //             <img src="../../../src/assets/icons/export.svg" />
    //           </div>
    //           <h2 className="text-lg self-center  font-semibold">
    //             تصنيف البلاغ
    //           </h2>
    //         </div>
    //         <div className="self-start  -ml-1 mr-14 flex items-center bg-[#33835C] p-10 px-8 gap-2   rounded-lg text-white">
    //           <div className="bg-white rounded-full flex justify-center items-center w-8 h-8">
    //             <img className="w-full h-full" src={src} />
    //           </div>
    //           <span>{title}</span>
    //         </div>
    //       </div>
    //       <div className=" mt-5 p-4   rounded-xl">
    //         <div className="flex   gap-2 items-center  rounded-full">
    //           <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
    //             <ContainerOutlined className="text-[#33835C]" />
    //           </div>
    //           <h2 className="text-lg self-center  font-semibold">
    //             تفاصيل البلاغ
    //           </h2>
    //         </div>
    //         <div className="border border-gray-200 text-wrap rounded-xl pb-3 mt-4 pl-[42px] mr-8">
    //           <ReportsTextIcon
    //             icon={note}
    //             description={true}
    //             subTitle={values[0] ? values[0] : "من فضلك اعد ادخال البيانات"}
    //           />
    //         </div>
    //         <div className="    lg:gap-6">
    //           <ReportsTextIcon
    //             subTitle={fullDate === "NaN/NaN/NaN" ? "لا يوجد" : fullDate}
    //             icon={prev4}
    //             title={labelProps.datePickerTitle}
    //           />
    //           <ReportsTextIcon
    //             subTitle={values[2] === "1" ? "نعم" : "لا"}
    //             icon={prev2}
    //             title={labelProps.selectTitle}
    //           />
    //         </div>
    //         <div className="    lg:gap-6">
    //           <ReportsTextIcon
    //             subTitle={values[1] ? values[1] : "لا يوجد"}
    //             icon={prev5}
    //             title={labelProps.locationTitle}
    //           />

    //           {values[2] === "1" && (
    //             <ReportsTextIcon
    //               bottom={true}
    //               subTitle={
    //                 values[4] ? (
    //                   <div className="flex  max-h-[260px] scrollbar scrollbar-w-2 scrollbar-thumb-[#33835c] scrollbar-thumb-rounded-full  overflow-x-scroll gap-2 flex-wrap">
    //                     {values[4]?.map((val) => (
    //                       <div className="tag flex items-center ">
    //                         <h3 className="flex items-center">{val.name}</h3>
    //                         <button className="cursor-default">
    //                           <UserOutlined />
    //                         </button>
    //                       </div>
    //                       // <div className="border rounded-sm  py-1 px-4 border-[#33835C]">
    //                       //   <span>{val.name}</span>
    //                       // </div>
    //                     ))}
    //                   </div>
    //                 ) : (
    //                   "من فضلك اعد ادخال البيانات"
    //                 )
    //               }
    //               icon={prev3}
    //               title={labelProps.listInputTitle}
    //             />
    //           )}
    //         </div>
    //       </div>
    //     </div>

    //     {!!imgs.length && !!fils.length && (
    //       <>
    //         <div className="flex   gap-2 items-center  rounded-full">
    //           <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full mr-4">
    //             <img src={prev9} />
    //           </div>
    //           <h2 className="text-lg self-center  font-semibold">
    //             المستندات الداعمه للاشتباه
    //           </h2>
    //         </div>

    //         <div className="border  border-gray-300 py-1  rounded-lg p-8 ">
    //           <div className="">
    //             <div className="">
    //               <ReportImages imgs={imgs} setImgs={setImgs} />
    //             </div>
    //           </div>
    //           <div className="pb-8">
    //             {/* <ReportsTextIcon icon={prev7} title={`الملفات(${fils.length}) `} /> */}
    //             <div>
    //               <ReportFiles fils={fils} setFils={setFils} />
    //             </div>
    //           </div>
    //         </div>
    //       </>
    //     )}
    //   </div>
    //   <div className="flex   gap-2 items-center rounded-full px-8 ms-4">
    //     <div className="h-12 w-12 bg-[#33835C1A] flex items-center justify-center rounded-full">
    //       <PhoneOutlined className="text-[#33835C]" />
    //     </div>
    //     <h2 className="text-lg self-center  font-semibold"> معلومات الاتصال</h2>
    //   </div>
    //   <div className="border border-gray-300 rounded-lg mb-6 mt-0 m-8 p-4">
    //     <div className="flex flex-wrap justify-between md:-ml-1   mt-2  items-center">
    //       <ReportsTextIcon
    //         row={true}
    //         subTitle={values[5] ? values[5] : "من فضلك اعد ادخال البيانات"}
    //         icon={note}
    //         title={"الاسم"}
    //       />
    //       <ReportsTextIcon
    //         row={true}
    //         subTitle={values[6] ? values[6] : "من فضلك اعد ادخال البيانات"}
    //         icon={prev1}
    //         title={"البريد الالكترونى"}
    //       />
    //       <ReportsTextIcon
    //         row={true}
    //         subTitle={values[7] ? values[7] : "من فضلك اعد ادخال البيانات"}
    //         icon={prev8}
    //         title={"رقم الجوال"}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default ReportsPreview;
