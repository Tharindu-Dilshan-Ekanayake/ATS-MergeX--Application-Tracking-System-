import React from 'react';

const Card = ({ title, value }) => {
  return (
    <div>
      <div id='card' className='pt-8 w-56 h-56 rounded-3xl'>
        <p className='text-2xl text-white text-center'>{title}</p>
        <h1 className='text-8xl text-[#EA7122] mt-4 text-center font-bold'>{value}</h1>
      </div>
    </div>
  );
};

export default Card;