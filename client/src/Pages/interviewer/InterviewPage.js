import React from 'react';
import '../interviewer/custom.css';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import InterviewItem from '../../Components/interviewercomp/InterviewItem';

export default function InterviewPage() {
  const name = 'Interview';

  return (
    <div>
        <div className='flex'>
        <div>
          <InterviewNav/>
        </div>
        <div>
            <Description name={name} />
        </div>
        <div id='background' className="w-80 h-80vh rounded-3xl z-0 mt-24 mx-8">
            <div id='container' className='mt-8 px-8'>
              <InterviewItem
                title="SE Interview"
                date="12/2/2024"
                time="9.00 am"
              />
              <InterviewItem
                title="SE Interview"
                date="12/2/2024"
                time="9.00 am"
              />
              <InterviewItem
                title="SE Interview"
                date="12/2/2024"
                time="9.00 am"
              />
              <InterviewItem
                title="SE Interview"
                date="12/2/2024"
                time="9.00 am"
              />
              <InterviewItem
                title="SE Interview"
                date="12/2/2024"
                time="9.00 am"
              />
              <InterviewItem
                title="SE Interview"
                date="12/2/2024"
                time="9.00 am"
              />
              <InterviewItem
                title="SE Interview"
                date="12/2/2024"
                time="9.00 am"
              />
              <InterviewItem
                title="SE Interview"
                date="12/2/2024"
                time="9.00 am"
              />
              <InterviewItem
                title="SE Interview"
                date="12/2/2024"
                time="9.00 am"
              />
            </div>
        </div>
        </div>
    </div>
  )
}