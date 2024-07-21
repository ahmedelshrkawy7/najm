import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import ReportsHeader from '../../custom hooks/ReportsHeader'
import UserContext from '../../store/UserContext';
import { useForm, useWatch } from 'react-hook-form';

const ReportDetails = () => {
  const {register,watch} =useForm()
  const {userData,addUserData} =useContext(UserContext);
  const watchData = watch(["username","email","password"])
  const [userName,email,password] =watchData
  // console.log(userName,email,password)
  // const obj = useMemo(() => {
  //   return {userName,email,password}
  // },[userName,email,password]);
  
  useEffect(() => {
    addUserData({...userData,...{
      userName,
      email,
      password
    }})
}, [userName,email,password]); 


  
  return (
    <>
       <ReportsHeader title={"تفاصيل البلاغ"} subTitle={"يرجى ملئ الحقول الاتية"}/>
        <div className='px-8 pt-4'>
          <input {...register("username")} type='text' placeholder='userName' className='mb-4 w-1/2 p-2'/>
          <input {...register("email")}  type='email' placeholder='email' className='mb-4 w-1/2 p-2'/>
          <input {...register("password")}  type='password' placeholder='password' className='mb-4 w-1/2 p-2'/>
        </div>
    </>
  )
}

export default ReportDetails