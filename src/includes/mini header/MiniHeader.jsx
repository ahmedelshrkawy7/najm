import React from 'react';


import { Breadcrumb } from "antd";

const breadCrumbItems= [
    {
        title:(
            <>
            <span>&#10050;</span>
            <span>الرئيسية</span>
            </>
        ),
        path:"/"
    },
    {
    title:"تقديم بلاغ",
    path:"/reportsPage"
    }
]
const MiniHeader = () => {
  return (
    <>
    <img src="../../assets/aa.webp" alt="" />
    <div  className="bg-[url('../src/assets/aa.webp')] text-black w-screen relative h-72 border border-red-600" >
       <div style={{backgroundImage:"linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1)"}} className='absolute top-0 left-0 w-full h-full  bg-gradient-to-r from-green-300 to-green-500  '>
         <div className='flex container mx-auto flex-col justify-center h-full'>
           <h2 className='text-white text-3xl font-bold'>الابلاغ عن المخالفات</h2>
           <div style={{backgroundImage:"url('../../assets/aa.webp')"}}>
           </div>
           <Breadcrumb  className='mt-4' separator=">"  items={breadCrumbItems} />
         </div>
       </div> 
    </div>
    </>
  )
}

export default MiniHeader