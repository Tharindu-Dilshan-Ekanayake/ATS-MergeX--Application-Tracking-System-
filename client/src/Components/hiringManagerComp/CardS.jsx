import React from 'react'

export default function CardS(props) {
  return (
    <div>
      <div className={`card_s 350px:w-[35px] 350px:h-[35px] 450px:w-[50px] 450px:h-[50px] 500px:w-[60px] 500px:h-[60px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] 900px:w-[140px] 900px:h-[140px] 1140px:w-[180px] 1140px:h-[180px] 1300px:w-[160px] 1300px:h-[160px] 1010px:w-[160px] 1010px:h-[160px] 2xl:w-[180px] 2xl:h-[180px] bg-[linear-gradient(to_bottom,_#2b2b2b_0%,_rgba(43,_43,_43,_0)_100%)] bg-[${props.bgcolor}] 320px:rounded-[5px] 500px:rounded-[15px] sm:rounded-[30px] flex justify-center items-center`}>

    <div className="txt mx-[auto] my-[0] text-center">
        <p className='text-[#ffffff] 320px:text-[0.2rem]  450px:text-[0.4rem] sm:text-[0.6rem]   900px:text-[0.8rem]  1010px:text-[1rem] sm:mt-[20px] md:mt-[0px] md:translate-y-[0.6rem] lg:translate-y-[1rem] 2xl:translate-y-[-0.01rem] 2xl:pt-[20px]  translate-x-0'>{props.name}</p>
        <h1 className={`text-[#ea7122] md:pt-[10px] 320px:text-[1rem] 450px:text-[1.4rem] sm:text-[3rem]  900px:text-[4rem] 1010px:text-[5rem] ml-[0.8rem] sm:-translate-y-[0.5rem] 320px:-translate-x-[0.5rem] 500px-translate-y-[0.8rem] -translate-x-[0.8rem]`}>{props.val}</h1>
    </div>
   </div>
    </div>
  )
}
