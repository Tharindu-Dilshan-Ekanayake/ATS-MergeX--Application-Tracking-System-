import React, { useContext } from 'react';
//import Logout from '../../Components/Logout';
import { UserContext } from '../../Context/UserContext';
import InterviewNav from '../../Components/interviewercomp/InterviewNav'
import './custom.css';
import Header from '../../Components/interviewercomp/InterviewerHeader';

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
          <h1>{user.lname}</h1>
        </div>
      </div>
    </div>
  )
}

