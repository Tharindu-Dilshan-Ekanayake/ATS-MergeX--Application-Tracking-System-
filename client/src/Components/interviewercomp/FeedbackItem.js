import React from 'react';

const FeedbackItem = ({profile, name, date, position}) => {
  return (
    <div id='interview-item' className='flex items-center justify-between px-8 py-4'>
      <div>
        <img src={profile} className='w-14 h-14 rounded-full border-2 border-white'></img>
      </div>
      <div className='text-left -translate-x-24 max-w-44 min-w-44'> 
        <h1>{name}</h1>
        <p className='opacity-50 text-sm'>CANDIDATE</p>
      </div>
      <div className='-translate-x-24 max-w-36 min-w-36'>
        <p className='opacity-50 text-base'>Date - {date}</p>
      </div>
      <div className='-translate-x-20 max-w-32 min-w-32'>
        <p className='opacity-50 text-base'>{position}</p>
      </div>
      <div>
        <button className='px-14 py-4 bg-[#EA7122] text-lg rounded-3xl'>
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackItem;