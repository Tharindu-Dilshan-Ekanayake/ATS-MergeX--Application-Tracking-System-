import React, { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import InterviewNav from '../../Components/interviewercomp/InterviewNav'
import './custom.css';
import Header from '../../Components/interviewercomp/InterviewerHeader';
import Card from '../../Components/interviewercomp/Card';
import InterviewBar from '../../Components/interviewercomp/InterviewBar';


export default function Interviewerdash() {

  const { user } = useContext(UserContext);

  return (
    <div>
      <div className='flex'>
        <div>
          <InterviewNav/>
        </div>
        <div>
          <Header/>
        </div>
        <div id='background' className="w-80 h-80vh rounded-3xl z-0 mt-24 mx-8">
          <div className='flex items-center justify-around mt-5'>
            <Card title="Applications" value="10" />
            <Card title="Candidates" value="10" />
            <Card title="Upcomming" value="10" />
            <Card title="Unread" value="02" />
          </div>
          <div>
            <div className='ml-8 mt-16'>
              <p className='text-left ml-8 mt-8 text-xl'>Today's Interviews</p>
            </div>
            <div id='bar-container' className='mt-5 max-h-80 overflow-y-auto'>
              <InterviewBar
                interviewTitle="SE Interview"
                interviewDate="12/02/2024"
                interviewTime="9.00 AM"
              />
              <InterviewBar
                interviewTitle="UI Interview"
                interviewDate="12/02/2024"
                interviewTime="9.00 AM"
              />
              <InterviewBar
                interviewTitle="PM Interview"
                interviewDate="12/02/2024"
                interviewTime="9.00 AM"
              />
              <InterviewBar
                interviewTitle="QA Interview"
                interviewDate="12/02/2024"
                interviewTime="9.00 AM"
              />
              <InterviewBar
                interviewTitle="SE Interview"
                interviewDate="12/02/2024"
                interviewTime="9.00 AM"
              />
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

