import { useContext } from "react"
import ReportsHeader from "../../custom hooks/ReportsHeader"
import UserContext from "../../store/UserContext"

const ReportsPreview = () => {
  const {userData}= useContext(UserContext);
  console.log(userData)
  return (
    <>
    <ReportsHeader title={"معاينة البلاغ"}/>
     <div className='px-8 pt-4'>
       ئءؤءئرؤئؤ
     </div>
 </>
)
  
}

export default ReportsPreview