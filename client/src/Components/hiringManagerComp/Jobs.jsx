import React from 'react'
import { IoBagHandle } from "react-icons/io5";
export default function Jobs() {
  return (
    <div>
       <div className="job_container flex items-center justify-around 900px:justify-between bg-[rgba(255,_255,_255,_0.04)] h-[25px] 450px:h-[30px] sm:h-[35px] 1010px:h-[40px] border-[1px] border-[solid] border-[rgba(255,255,255,0.04)]">
    <div className="title flex items-center justify-center pl-2 ">
        <IoBagHandle className='w-[15px] h-[15px] 450px:w-[20px] 450px:h-[20px] sm:w-[23px] sm:h-[23px] 900px:w-[20px] 900px:h-[20px] 1010px:w-[25px] 1010px:h-[25px]' />
        <p className='text-[#ffffff] 320px:text-[0.4rem]  450px:text-[0.5rem] sm:text-[0.6rem]   900px:text-[0.7rem]  1010px:text-[0.8rem] ml-4'>Software Engineer</p>
    </div>
   </div>
    </div>
  )
}
