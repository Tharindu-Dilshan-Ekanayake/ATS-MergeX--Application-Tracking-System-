import React from 'react'

export default function CardEsm(props) {
  const words = props.name.split(' ');
  const wordPairs = [];

  for (let i = 0; i < words.length; i += 2) {
    wordPairs.push(words.slice(i, i + 2).join(' '));
  }

  return (
    <div>
      <div className={`card_s w-[100px] h-[100px] bg-[linear-gradient(180deg,_rgba(234,_113,_34,_0.2)_0%,_rgba(43,_43,_43,_0)_100%)] 320px:rounded-[5px] 500px:rounded-[15px] sm:rounded-[30px] flex justify-center items-center`}>

        <div className="txt mx-[auto] my-[0] text-center">
          {wordPairs.map((pair, index) => (
            <p key={index} className='text-[#ffffff] 320px:text-[0.2rem]  450px:text-[0.4rem] sm:text-[0.6rem]   900px:text-[0.8rem]  1010px:text-[11px] sm:mt-[20px] md:mt-[0px] md:translate-y-[0.6rem] lg:translate-y-[1rem] 2xl:translate-y-[0.8rem]  translate-x-0'>{pair}</p>
          ))}
          <h1 className={`text-[#ea7122] mt-[10px] md:pt-[10px] 320px:text-[1rem] 450px:text-[1.4rem] sm:text-[3rem]  900px:text-[4rem] 1010px:text-[2rem] ml-[0.8rem] sm:-translate-y-[0.5rem] 320px:-translate-x-[0.5rem] 500px-translate-y-[0.8rem] -translate-x-[0.8rem] `}>{props.val}</h1>
        </div>
      </div>
    </div>
  )
}