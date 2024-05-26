import { BsFillBellFill } from "react-icons/bs";
import React, { useContext, useState } from 'react';
import Dropdown from '../../Components/hiringManagerComp/Dropdown';
import Greatings from "../Greatings";
import { UserContext } from '../../Context/UserContext.js';

export default function Topbar() {
  
  const { user } = useContext(UserContext);   
 

  return(
    
    <div className='topBarCover h-[40px] flex justify-between  text-center  mt-[7px] mr-[25px] lg:mt-[10px] lg:mr-[30px] md:mt-[8px] md:mr-[27px]' >

{!!user && (
  <div className="message flex flex-row pl-[50px] lg:pl-[30px] text-[1.3rem] lg:text-[2rem]  md:text-[1.45rem] justify-center esm:text-[0.9rem] esm:items-center">
        <p className='text-white opacity-[60%] '><Greatings/></p>
        <p className='text-white' > Hi, {user.lname}</p>
      </div>
          )}
      
      <div id="demo-customized-button" className="accLabelCover flex flex-row items-center ml-auto gap-[10px] mt-[7px] lg:mt-[20px] ">
        <BsFillBellFill className='items-center w-[20px] h-20 sm:w-[25px] sm:h-[25px] md:w-[30px] md:h-[30px] lg:w-[35px] lg:h-[35px]' />
        <Dropdown ></Dropdown>
      </div>
    </div>
  )
}

  