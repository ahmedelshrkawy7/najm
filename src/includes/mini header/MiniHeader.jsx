import {Breadcrumb } from "../../import"


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
     
    <div  className="bg-[linear-gradient(to_right,rgba(0,128,2,0),rgba(0,128,2,1)),url('../src/assets/aa.webp')]  text-black w-screen h-72 border" >
         <div className='flex main_container mx-auto flex-col justify-center h-full'>
           <h2 className='text-white text-3xl font-bold'>الابلاغ عن المخالفات</h2>
           <Breadcrumb  className='mt-4' separator=">"  items={breadCrumbItems} />
           </div>                   
       </div> 
    
  )
}

export default MiniHeader