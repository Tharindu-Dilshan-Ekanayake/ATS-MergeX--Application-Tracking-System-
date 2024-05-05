import React, { useState } from 'react'
import AdminAccess from './AdminAccess';
import RecruiterAccess from './RecruiterAccess';
import HiringManagerAccess from './HiringManagerAccess';
import InterViewerAccess from './InterViewerAccess';
import CandidateAccess from './CandidateAccess';

export default function AccessCompo() {

  const [state, setState] = useState(1);
    

    const action = (index) => {
        setState(index);
    }

  return (
    <div className='  ml-[70px] bg-gradient-to-b from-[#272727] to-[#17171A] rounded-[30px]  h-[800px] w-[1400px] mr-[70px]'>
      <div className=''>
            <div className='w-full bg-[#525252] h-200 rounded-[30px]'>
                <div className="flex items-center justify-between bg-[#2B2B2B] bg-opacity-90 w-full h-20 rounded-t-[30px] text-center text-[18px]">
                    <div onClick={() => action(1)} className={`text-center flex-1 cursor-pointer ${state === 1 ? 'bg-[#2B2B2B] text-white h-20 flex items-center justify-center rounded-tl-[30px]' : 'text-white opacity-25'}`}>
                        Admin
                    </div>
                    <div onClick={() => action(2)} className={`text-center flex-1 cursor-pointer ${state === 2 ? 'bg-[#2B2B2B] text-white h-20 flex items-center justify-center' : 'text-white opacity-25'}`}>
                        Recruiter
                    </div>
                    <div onClick={() => action(3)} className={`text-center flex-1 cursor-pointer ${state === 3 ? 'bg-[#2B2B2B] text-white h-20 flex items-center justify-center' : 'text-white opacity-25'}`}>
                        Hiring Manager
                    </div>
                    <div onClick={() => action(4)} className={`text-center flex-1 cursor-pointer ${state === 4 ? 'bg-[#2B2B2B] text-white h-20 flex items-center justify-center ' : 'text-white opacity-25'}`}>
                        Interviewer
                    </div>
                    <div onClick={() => action(5)} className={`text-center flex-1 cursor-pointer ${state === 5 ? 'bg-[#2B2B2B] text-white h-20 flex items-center justify-center rounded-tr-[30px]' : 'text-white opacity-25'}`}>
                        Candidate
                    </div>
                </div>
                
                <div>
                  
                    <div className={` ${state === 1 ? 'bg-gradient-to-b from-[#272727] to-[#17171A] text-white rounded-b-[30px] h-[730px]' : 'hidden'}`}>
                      <AdminAccess/>
                    </div>
                    <div className={`  ${state === 2 ? 'bg-gradient-to-b from-[#272727] to-[#17171A] text-white rounded-b-[30px] h-[730px]' : 'hidden'}`}>
                        <RecruiterAccess/>
                    </div>
                    <div className={` ${state === 3 ? 'bg-gradient-to-b from-[#272727] to-[#17171A] text-white rounded-b-[30px] h-[730px]' : 'hidden'}`}>
                        <HiringManagerAccess/>
                    </div>
                    <div className={` ${state === 4 ? 'bg-gradient-to-b from-[#272727] to-[#17171A] text-white rounded-b-[30px] h-[730px]' : 'hidden'}`}>
                        <InterViewerAccess/>
                    </div>
                    <div className={`  ${state === 5 ? 'bg-gradient-to-b from-[#272727] to-[#17171A] text-white rounded-b-[30px] h-[730px]' : 'hidden'}`}>
                        <CandidateAccess/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
