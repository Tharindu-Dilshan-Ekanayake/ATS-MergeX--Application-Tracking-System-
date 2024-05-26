import React from 'react'
import PopUp from './PopUp'
import { Outlet } from 'react-router-dom'



const RightContainer = () => {
  return (
    <div className='w-10/12 h-screen bg-zinc-900'>

      <div className='flex justify-between items-center8 bg-zinc-900' style={{height:'10%'}}>
        <div className='flex items-center mx-5'>
          <p className='text-4xl'>
            <span className='text-neutral-500 '>Good morning ,</span>
            <span className='text-neutral-300 font-semibold'>Rasindu</span>
          </p>
        </div>
        <PopUp/>
      </div>

      <div className='box-content bg-neutral-800 overflow-auto rounded-3xl mx-5 my-5' style={{height:'86%'}}>
        <Outlet/>
      </div>
      

    </div>
  )
}

export default RightContainer
