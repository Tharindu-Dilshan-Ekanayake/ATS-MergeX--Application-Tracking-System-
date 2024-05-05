import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';


export default function PostTag() {

  const { users, setUsers } = useContext(UserContext); 


  return (
    <div>

    {users.map((user) => (
      <div className='accLabel my-1  flex flex-row flex  bg-[#2b2b2b] sm:pl-[5px]  items-center justify-start rounded-[30px]  sm:gap-[4px] esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]   sm:w-[150px] sm:h-[45px]  lg:rounded-[25px]  lg:gap-[8px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content]'>
            <img src={user.image} alt="" className='userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]' />
           <div className='block '>
           <p className='name text-[#ffffff] mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]'>{user.fname} </p>
            <p className='post text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]'>{user.role}</p>
           </div>
          </div>
    ) )}





     
    </div>
  )
}
