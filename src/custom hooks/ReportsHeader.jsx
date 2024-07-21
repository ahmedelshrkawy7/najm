import React from 'react'

const ReportsHeader = ({title,subTitle}) => {
  return (
    <>
    <h2 className="bg-[#33835C] text-xl px-8 py-4 text-white">{title}</h2>
    <h2 className='text-black px-8 mt-5'>{subTitle}</h2>
    </>
  )
}

export default ReportsHeader;