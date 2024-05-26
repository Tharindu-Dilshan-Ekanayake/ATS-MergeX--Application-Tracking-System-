import React from 'react';
import img1 from '../../../Images/Profile.jpg';


const AvatarBio = () => {
  return (
    <div className='flex items-center justify-center h-2/6 0'>

      <div className="box-border h-28 w-28 rounded-full border-zinc-950 bg-center bg-cover overflow-hidden border-3 mr-5 ">
       <img src={img1} alt='ProfileImg'/>
      </div>

      <div className='flex min-w-fit justify-around ml-5'>

        <div className='flex flex-col justify-between items-start text-neutral-500 font-semibold text-lg width-auto mr-3 '>
          <span >Name</span>
          <span>Email</span>
          <span>Contact Number</span>
          <span>Birthday</span>
        </div>
        
        <div className='flex flex-col justify-between items-start text-neutral-300 font-semibold text-base'> 
          <span>Rasindu Sandeep</span>
          <span>rasindu0823@gmail.com</span>
          <span>0713063361</span>
          <span>08/23/1999</span>
        </div>
      </div>
    </div>
  )
}

export default AvatarBio
