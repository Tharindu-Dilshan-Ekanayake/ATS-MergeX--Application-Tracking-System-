import React, { useState } from 'react';
import profileImg from '../../../Images/Profile.jpg'

const PopUp = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="flex justify-between items-center mt-4 mx-5 bg-neutral-700 px-2 py-1 h-14 rounded-3xl relative" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}>
      <div
        className={`box-border h-12 w-12 rounded-full  bg-center bg-cover overflow-hidden mr-2 relative ${
          isHovered ? 'border-s-2 animate-spin border-orange-500' : 'border-2 border-orange-500'
        }`}
      ></div>
      <div className="box-border h-10 w-10 rounded-full border-orange-500 bg-center bg-cover overflow-hidden mr-2 absolute ml-1">
        <img src={profileImg} alt='profilepic'/>
      </div>

      <p className='flex flex-col mr-1 mb-2'>
        <span className='text-sm font-bold text-neutral-200'>Rasindu</span>
        <span className='font-bold text-xs text-neutral-500'>CANDIDATE</span>
      </p>

    </div>
  );
};

export default PopUp;

