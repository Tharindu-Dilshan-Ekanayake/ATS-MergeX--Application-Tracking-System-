import React from 'react';
import { TiGroup } from 'react-icons/ti';

const InterviewItem = ({ title, date, time, meeting, password}) => {

  return (
    <div id='interview-item' className='flex items-center justify-between px-8 py-4'>
      <div>
        <TiGroup size={100} style={{ color: 'rgba(255, 255, 255, 0.25)' }} />
      </div>
      <div className='max-w-60 min-w-60 -translate-x-10'>
        <h1 className='text-xl font-medium'>{title}</h1>
      </div>
      <div className='opacity-50 text-left max-w-64 min-w-64 -translate-x-6'>
        <p>Date - {date}</p>
        <p>Time - {time}</p>
        <p>Link - <a href={meeting} target="_blank" rel="noopener noreferrer">Meeting Link</a></p>
        <p>Password - {password}</p>
      </div>
      <div>
      <a href={meeting} target="_blank" rel="noopener noreferrer"> 
          <button className='w-60 h-14 bg-[#EA7122] text-lg rounded-3xl'>
            Join Interview
          </button>
        </a>
      </div>
    </div>
  );
};

export default InterviewItem;