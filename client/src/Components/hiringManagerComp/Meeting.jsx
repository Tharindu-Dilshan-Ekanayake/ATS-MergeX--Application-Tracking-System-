import React from 'react'
import { SlCalender } from "react-icons/sl";
export default function Meeting() {
  return (
    <div>
      <div className="meeting_container flex items-center justify-around 900px:justify-between bg-[rgba(255,_255,_255,_0.04)] h-[25px] 450px:h-[30px] sm:h-[35px] 1010px:h-[40px] border-[1px] border-[solid] border-[rgba(255,255,255,0.04)]">
    <div className="title flex items-center justify-center pl-2">
        <SlCalender  className='text-[15px]  450px:text-[20px]  sm:text-[23px]  900px:text-[20px] 1010px:text-[25px] ' />
        <p className='text-[#ffffff] 320px:text-[0.4rem]  450px:text-[0.5rem] sm:text-[0.6rem]   900px:text-[0.7rem]  1010px:text-[0.8rem] ml-4'>SE Interview</p>
    </div>
    <div className="date pr-2 320px:text-[0.3rem]  450px:text-[0.4rem] sm:text-[0.5rem]   900px:text-[0.6rem]  1010px:text-[0.7rem]">
        <p className='text-[rgba(255,_255,_255,_0.25)] '>Date - 12/2/2024</p>
        <p className='text-[rgba(255,_255,_255,_0.25)] '>Time - 9.00 am</p>
    </div>
   </div>
    </div>
  )
}
