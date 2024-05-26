import { useState } from "react";
import React  from 'react'
import StatusUpdate from "../../Components/recruitercomp/StatusUpdate";


export default function CandidateCommunication() {
  

  const [state, setState] = useState(1);
    

    const action = (index) => {
        setState(index);
    }

  return (
    <div className='  ml-[70px] bg-gradient-to-b from-[#272727] to-[#17171A] rounded-[30px]  h-[800px] w-[1400px] mr-[70px]'>
      
      <div className=''>
            <div className='w-full bg-[#525252] h-200 rounded-[30px]'>
                <div className="flex items-center justify-between bg-[#2B2B2B] bg-opacity-90 w-full h-20 rounded-t-3xl text-center text-[18px]">
                    <div onClick={() => action(1)} className={`text-center flex-1 cursor-pointer ${state === 1 ? 'bg-[#2B2B2B] text-white h-20 flex items-center justify-center rounded-tl-3xl' : 'text-white opacity-25'}`}>
                        Status Update
                    </div>
                    <div onClick={() => action(2)} className={`text-center flex-1 cursor-pointer ${state === 2 ? 'bg-[#2B2B2B] text-white h-20 flex items-center justify-center rounded-tr-3xl' : 'text-white opacity-25'}`}>
                        Send job invitation
                    </div>
                    
                </div>
                
                <div>
                  
                    <div className={` ${state === 1 ? 'bg-gradient-to-b from-[#272727] to-[#17171A] text-white rounded-b-[30px] h-[730px]' : 'hidden'}`}>
                      <StatusUpdate />
                    </div>
                    <div className={`  ${state === 2 ? 'bg-gradient-to-b from-[#272727] to-[#17171A] text-white rounded-b-[30px] h-[730px]' : 'hidden'}`}>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

