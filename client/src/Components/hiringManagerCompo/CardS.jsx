import React from 'react'

export default function CardS(props) {
  return (
    <div className="[perspective:2000px]">
     <div 
        style={{ width: props.w ? `${props.w}px` : '200px', height: props.h ? `${props.h}px` : '200px' }}
        className={`hover:[transform:rotateY(15deg)_rotateX(5deg)] rounded-[15px] [box-shadow:0_10px_20px_rgba(0,_0,_0,_0.3),_0_6px_6px_rgba(0,_0,_0,_0.23)] [transition:transform_0.3s_ease-in-out] [transform:rotateY(0deg)] bg-[linear-gradient(to_top,_#100c08_0%,_#2B2B2B_100%)] 320px:rounded-[5px] 500px:rounded-[15px] sm:rounded-[30px] flex justify-center items-center`}
      >

        <div className="txt mx-auto my-0 text-center">
          <p className='text-lg text-white text-center'>{props.name}<br/>{props.subName}</p>
          <h1 className='text-6xl text-[#EA7122] mt-3 text-center font-bold'>{props.val}</h1>
        </div>
      </div>
    </div>
  )
}
