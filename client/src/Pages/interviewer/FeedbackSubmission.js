import React from 'react';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import FeedbackItem from '../../Components/interviewercomp/FeedbackItem';
import pro from '../../Images/pro1.png';

export default function FeedbackSubmission() {
  const name = 'Feedback Submission';

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
          <div id='container' className='mt-8 px-6'>
            <FeedbackItem
              profile={pro}
              name= 'Mudusaritha Gangamina'
              date= '2023/12/07'
              position= 'UI / UX'
            />
            <FeedbackItem
              profile={pro}
              name= 'Mudusaritha Gangamina'
              date= '2023/12/07'
              position= 'UI / UX'
            />
            <FeedbackItem
              profile={pro}
              name= 'Mudusaritha Gangamina'
              date= '2023/12/07'
              position= 'UI / UX'
            />
            <FeedbackItem
              profile={pro}
              name= 'Mudusaritha Gangamina'
              date= '2023/12/07'
              position= 'UI / UX'
            />
            <FeedbackItem
              profile={pro}
              name= 'Mudusaritha Gangamina'
              date= '2023/12/07'
              position= 'UI / UX'
            />
            <FeedbackItem
              profile={pro}
              name= 'Mudusaritha Gangamina'
              date= '2023/12/07'
              position= 'UI / UX'
            />
            <FeedbackItem
              profile={pro}
              name= 'Mudusaritha Gangamina'
              date= '2023/12/07'
              position= 'UI / UX'
            />
            <FeedbackItem
              profile={pro}
              name= 'Mudusaritha Gangamina'
              date= '2023/12/07'
              position= 'UI / UX'
            />
          </div>
        </div>
        </div>
    </div>
  )
}