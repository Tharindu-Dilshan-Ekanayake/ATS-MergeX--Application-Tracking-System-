import React from 'react'

export default function cardL(props) {
  return (
    <div>
      <div className='card_L  350px:w-[39px] 350px:h-[39px] 450px:w-[60px] 450px:h-[60px] 500px:w-[75px] 500px:h-[75px] sm:w-[110px] sm:h-[110px]   md:w-[140px] md:h-[140px]  900px:w-[170px] 900px:h-[170px] 1140px:w-[230px]   1140px:h-[230px]  1300px:w-[200px] 1300px:h-[200px] 1010px:w-[200px] 1010px:h-[200px] 2xl:w-[230px] 2xl:h-[230px] bg-[linear-gradient(to_bottom,_#2b2b2b_0%,_rgba(43,_43,_43,_0)_100%)] 320px:rounded-[10px] 500px:rounded-[20px] sm:rounded-[30px] flex justify-center items-center'>
    <div className="txt mx-[auto] my-[0] text-center">
        <p className='text-[rgb(255,255,255)] 320px:text-[0.3rem] 450px:text-[0.5rem] sm:text-[0.8rem]   900px:text-[1rem] 1010px:text-[1.4rem] 
       320px:mt-[3px] 350px:mt-[0px]   sm:mt-[25px]  md:mt-[0px]  lg:-translate-y-[0.8rem]'>{props.name}</p>
        <h1 className='text-[#ea7122] 320px:text-[1rem] 450px:text-[1.4rem] sm:text-[3rem]  900px:text-[4rem] 1010px:text-[5rem] ml-[0.8rem] sm:-translate-y-[0.5rem] 320px:-translate-x-[0.5rem] 500px:-translate-x-[0.7rem]'>{props.val}</h1>
    </div>
   </div>
    </div>
  )
}
