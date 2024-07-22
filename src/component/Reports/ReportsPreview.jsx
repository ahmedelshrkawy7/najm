import { useContext } from "react"
import ReportsHeader from "../../custom hooks/ReportsHeader"
import UserContext from "../../store/UserContext"
import ReportsTextIcon from "./ReportsTextIcon";
import img1 from "../../assets/icons/calendar.svg"
const ReportsPreview = () => {
  const {userData}= useContext(UserContext);
  console.log(userData.title)
  return (
    <>
    <ReportsHeader title={"بيانات البلاغ"}/>
     <div className='px-8 pt-4'>
       <div className="flex border border-gray-300 p-4 rounded-xl flex-col gap-6 mb-2">
        <div className="flex justify-between items-center border-b border-gray-300 pb-4">
          <h2 className="text-xl font-semibold">تصنيف البلاغ</h2>
          <img src="../../../src/assets/icons/export.svg" />
        </div>
        <button className="self-start bg-[#33835C] p-4 px-5 mb-4 rounded-lg text-white">مخالفة لمدونة قواعد السلوك</button>
       </div>
       <div className="border mt-5 border-gray-300 mb-6 py-4 rounded-xl">
       <div className="flex justify-between items-center mx-4  border-b border-gray-300 pb-4">
          <h2 className="text-xl font-semibold">تفاصيل البلاغ</h2>
          <img  src="../../../src/assets/icons/export.svg" />
        </div>
         <div className="px-4">
         <ReportsTextIcon  icon={img1} title={"وأريد أن أتقدم بشكوي ضد الأشخاص الذي تم ذكرهم لقيامهم باعمال فاسدة ضد الدولة"}/>
         </div>
        <div className="flex px-4 gap-6">
        <ReportsTextIcon icon={img1} title={"وصف البلاغ"}/>
        <ReportsTextIcon icon={img1} title={"وصف البلاغ"}/>
        </div>
        <div className="flex px-4 gap-6 border-b">
        <ReportsTextIcon icon={img1} title={"وصف البلاغ"}/>
        <ReportsTextIcon icon={img1} title={"وصف البلاغ"}/>
        </div>
        <div className="p-4 py-1">
           <div className="border-b border-gray-300">
           <ReportsTextIcon icon={img1} title={"وصف البلاغ"}/>
           </div>
        <div className="border-b border-gray-300 ">
         <ReportsTextIcon icon={img1} title={"وصف البلاغ"}/>
         <div className="flex flex-wrap pb-4 gap-2">
            <img  src="../../../src/assets/Component 10.png"/>
            <img   src="../../../src/assets/Component 10.png"/>
            <img   src="../../../src/assets/Component 10.png"/>
            <img   src="../../../src/assets/Component 10.png"/>
         </div>
        </div>
        <div className="pb-4">
        <ReportsTextIcon icon={img1} title={"وصف البلاغ"}/>
         <div className="flex items-center border border-[#DC60651A] rounded-lg  justify-end  w-[250px] p-2 gap-4 bg-[#DC60651A]">
          <div className="flex flex-col items-end ">
          <span className="text-[#D74D52] text-md">File.pdf</span>
          <span className="text-xs">21 MB</span>
          </div>
          <img src="../../../src/assets/svgexport-7 1.png" />
         </div>
        </div>
       
        </div>
       </div>
       <div className="border border-gray-300 p-4 rounded-lg mb-6">
       <div className="flex justify-between items-center border-b border-gray-300 pb-4">
          <h2 className="text-xl font-semibold">معلومات الاتصال</h2>
          <img src="../../../src/assets/icons/export.svg" />
        </div>        <div className="flex gap-24 items-center">
        <ReportsTextIcon icon={img1} title={"وصف البلاغ"}/>
        <ReportsTextIcon icon={img1} title={"وصف البلاغ"}/>
        <ReportsTextIcon icon={img1} title={"وصف البلاغ"}/>

        </div>
       </div>
     </div>
 </>
)
  
}

export default ReportsPreview