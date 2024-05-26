import React, { useState,useContext } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function UserDropdown() {
  const { user } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div  className=' relative z-50'>
    <button onClick={toggleDropdown} id="dropdownAvatarNameButton" className="className='accLabel flex flex-row flex ring-[2.5px] ring-[#eb7323] bg-[#2b2b2b] sm:pl-[5px] items-center justify-start rounded-[30px] gap-[4px] w-[150px] h-[45px] lg:rounded-[25px] lg:gap-[8px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content]" >
    { !!user &&  <img src={user.image} alt="" className='userImg rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] w-[35px] h-[35px] border-[1.5px] lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] esm:m-1 ' />}
        <div className='block esm:hidden sm:block'>
         { !!user && <p className='name text-[#ffffff] text-left mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem]'> {user?.lname}</p>}
         {!!user &&  <p className='post text-[#ffffff] opacity-[30%] mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem] '>{user.role}</p>}
         </div>
  
 
</button>

      {isOpen && (
       
        
        <div id="dropdownAvatarName" className="absolute border-2 border-[#eb7323] bg-[#2b2b2b] mt-[10px]  w-[150px] esm:w-[fit-content]  sm:w-[180px] lg:w-[200px] divide-y divide-[#525252] rounded-[15px] shadow ">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="font-medium">Pro User</div>
            <div className="truncate text-[#eb7323]">name@flowbite.com</div>
          </div>
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformdropdownAvatarNameButtonationButton">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] dark:hover:text-white">Dashboard</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] dark:hover:text-white">Settings</a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] dark:hover:text-white">Earnings</a>
            </li>
          </ul>
          <div className="py-2">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] dark:text-gray-200 dark:hover:text-white">Sign out</a>
          </div>
        </div>
      )}
    </div>
   
  );
}