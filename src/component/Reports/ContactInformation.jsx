import React from 'react'
import ReportsHeader from '../../custom hooks/ReportsHeader';
import { InputText } from '../forms/inputs/InputText';

const ContactInformation = () => {
  return (
    <>
    <ReportsHeader title={"معلومات الاتصال"} subTitle={"يُرجي ملئ الحقول التالية"}/>
     <div className='px-8 pt-4 pb-8  space-y-6'>
       <div className='flex flex-wrap gap-4 items-center'>
        <InputText inputTitle={"الاسم"} inputPlaceHolder={"الاسم..."}/>
        <InputText inputTitle={"البريد الالكترونى"} inputPlaceHolder={"البريد الالكترونى..."}/>
        <InputText inputTitle={"رقم الجوال"} inputPlaceHolder={"رقم الجوال...."}/>
       </div>
     </div>
 </>
  )
}

export default ContactInformation;