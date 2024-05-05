import React from 'react'
import InterviewNav from '../../Components/interviewercomp/InterviewNav'
//import Popup from '../../Components/interviewercomp/Popup'

export default function InterviewPage() {
  return (
    <div>
        <div className='flex'>
        <div>
          <InterviewNav/>
        </div>
        <div className='flex'>
            <h1>Interview</h1>
        </div>
        </div>
    </div>
  )
}