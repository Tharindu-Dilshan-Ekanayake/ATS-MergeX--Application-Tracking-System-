import React from 'react';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';

export default function Message() {  
const name = 'Message';

  return (
    <div>
        <div className='flex'>
        <div>
          <InterviewNav/>
        </div>
        <div>
          <Description name={name} />
        </div>
        </div>

      
    </div>
  )
}