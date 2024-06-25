import React from 'react';
import moment from 'moment';
import { GrFormView } from "react-icons/gr";

const SingleStatus = ({status, index, handleViewStatus}) => {

  const statusTime = moment(status.time, 'HH:mm:ss'); // Parse the time string using moment

  if (!statusTime.isValid()) {
    console.error('Invalid time format:', status.time);
    return null; // Skip rendering if the time format is invalid
  }

  const timeAgo = statusTime.fromNow();
  const formattedTimeAgo = timeAgo.includes('seconds') ? timeAgo.replace('seconds', 'secs') : timeAgo;

  return (
    <div className='bg-neutral-400 rounded-xl'>
      <div key={index} className="flex items-center justify-between h-[100px] bg-gradient-to-b from-[#2B2B2B] to-[#333333] hover:opacity-90 hover:bg-red-500 rounded-lg border-neutral-600 mt-1">
        <div className="h-[75px] w-[75px] rounded-full overflow-hidden ml-8">
          <img src={status.image} alt="status" className="object-cover w-full h-full" />
        </div>
        <div className="w-[50px]"></div>
        <div className="w-[350px] text-left">
          <p>{status.description}</p>
          <div className="text-sm text-gray-400">
            {status.user_fname} {status.user_lname}
          </div>
          <div className="text-sm text-gray-400">
            {formattedTimeAgo}
          </div>
        </div>
        <div className="mr-4">
          <button onClick={() => handleViewStatus(status)}>
            <GrFormView className="size-[50px] hover:opacity-40" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default SingleStatus
