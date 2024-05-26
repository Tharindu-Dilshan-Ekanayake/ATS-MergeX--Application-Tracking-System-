import React from 'react';
import { TiGroup } from 'react-icons/ti';

const InterviewItem = ({ title, date, time }) => {
  return (
    <div id='interview-item' className='flex items-center justify-between px-8 py-4'>
      <div>
        <TiGroup size={100} style={{ color: 'rgba(255, 255, 255, 0.25)' }} />
      </div>
      <div className='max-w-40 min-w-40 -translate-x-10'>
        <h1 className='text-2xl font-medium'>{title}</h1>
      </div>
      <div className='opacity-50 text-left max-w-40 min-w-40 -translate-x-6'>
        <p>Date - {date}</p>
        <p>Time - {time}</p>
        <p>Link - www.zoom.com</p>
        <p>Password - 1234Dlwq</p>
      </div>
      <div>
        <button className='px-12 py-5 bg-[#EA7122] text-lg rounded-3xl'>
          Join Interview
        </button>
      </div>
    </div>
  );
};

export default InterviewItem;