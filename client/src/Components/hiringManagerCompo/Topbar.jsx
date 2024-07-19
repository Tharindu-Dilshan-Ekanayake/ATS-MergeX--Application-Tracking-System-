
import React, { useContext, useState } from 'react';
import Dropdown from '../../Components/hiringManagerCompo/Dropdown.jsx';
import Greatings from "../Greatings";
import { UserContext } from '../../Context/UserContext.js';
import { MdOutlineNotificationsActive } from "react-icons/md";
import Popup from '../../Components/interviewercomp/Popup.js';




export default function Topbar(props) {
  

  const { user } = useContext(UserContext);   
 

  return(
    
    <div className='topBarCover h-[40px] flex justify-between  text-center  mt-[7px] mr-[25px] lg:mt-[10px] lg:mr-[30px] md:mt-[8px] md:mr-[27px]' >
<div>
      <div id='header' className='flex justify-between'>
          <div className='flex w-1/2'>
            <Greatings/> <p className="text-3xl text-white font-medium ml-2"> Gangamina</p>
          </div>
          <div className='flex items-center justify-between'>
            <MdOutlineNotificationsActive size={50} className="hover:text-white hover:opacity-70 mt-4"/>
            {!!user && <Popup
              img = {user.image}
              name = {user?.lname}
              role = {user?.role}
             />}
          </div>
        </div>
    </div>  </div>
  )
}

  