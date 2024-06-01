import React  from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import ForgetPassword from './Pages/ForgetPassword';
import ChangePw from './Pages/ChangePw';


import axios from 'axios';



import NewCandidateCreateAccount from './Pages/NewCandidateCreateAccount';
import {Toaster} from 'react-hot-toast'

import Admindash from './Pages/admin/Admindash';
//import Recruiterdash from './Pages/recruiter/Recruiterdash';
import Interviewerdash from './Pages/interviewer/Interviewerdash';

import Candidatedash from './Pages/candidate/Candidatedash';
import Register from './Pages/Register';
import UserContextProvider from './Context/UserContext';
import CreateNewUser from './Pages/admin/CreateNewUser'
import ModifyUserAccount from './Pages/admin/ModifyUserAccount';

import RoleAssignment from './Pages/admin/RoleAssignment';
import AccessControl from './Pages/admin/AccessControl';
import SystemSettings from './Pages/admin/SystemSettings';
import DeleteUserAccount from './Pages/admin/DeleteUserAccount';

// Candidatedash Page 
import EditProfile from './Pages/candidate/pages/EditProfile';
import LandingPage from './Pages/candidate/pages/LandingPage';
import Status from './Pages/candidate/pages/Status';
import PendingSubmission from './Pages/candidate/pages/PendingSubmission';
import Session from './Pages/candidate/pages/Session';
import Invitation from './Pages/candidate/pages/Invitation';

import RecruiterLayout from './Components/recruitercomp/RecruiterLayout';
import JobPosting from './Pages/recruiter/JobPosting';
import CandidateCommunication from './Pages/recruiter/CandidateCommunication';
import ApplicationManagement from './Pages/recruiter/ApplicationManagement';
import CandidateAssessment from './Pages/recruiter/CandidateAssessment';
import Message from './Pages/recruiter/Message';
import ViewUserCard from './Components/admincomp/ViewUserCard';

import Evaluation from './Pages/interviewer/Evaluation';
import Interview from './Pages/interviewer/InterviewPage';
import Feedbacksubmission from './Pages/interviewer/FeedbackSubmission';
import Scheduling from './Pages/interviewer/Scheduling';
import InterviewMessage from './Pages/interviewer/Message';
import Dashboard from './Pages/hiring manager/Dashboard';
import HiringDecision from './Pages/hiring manager/HiringDecision';
import JobApproval from './Pages/hiring manager/JobApproval';
import InterviewFeedback from './Pages/hiring manager/InterviewFeedback';
import Reporting from './Pages/hiring manager/Reporting';
import JobCard from './Components/hiringManagerComp/JobCard';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true



function App() {

  
  return (
    <div className="App">

      <UserContextProvider>
      <Toaster position='bottom-right' toastOptions={{duration: 3000}}></Toaster>
      
        <Routes>
          <Route path='/jobcard' element={<JobCard/>}></Route>
          <Route  path='/'element={<Login/>}> </Route>
          <Route  path='/forget'element={<ForgetPassword/>}> </Route>
          <Route  path='/changepassword'element={<ChangePw/>}> </Route>
          <Route  path='/createNewAccount'element={<NewCandidateCreateAccount/>}> </Route>
          <Route  path='/register'element={ <Register/>}> </Route>
          
          <Route path='/admindash' element={<Admindash/> }></Route>
          <Route path='/recruiterdash' element={<RecruiterLayout />}>
            
            <Route path="JobPosting" element={<JobPosting />} />
            <Route path="CandidateCommunication" element={<CandidateCommunication />} />
            <Route path="ApplicationManagement" element={<ApplicationManagement />} />
            <Route path="CandidateAssessment" element={<CandidateAssessment />} />
            <Route path="Message" element={<Message />} />
          </Route>

          <Route path='/interviewerdash' element={<Interviewerdash/>}></Route>
          <Route path='/interview' element={<Interview/>}></Route>
          <Route path='/feedbacksubmission' element={<Feedbacksubmission/>}></Route>
          <Route path='/evaluation' element={<Evaluation/>}></Route>
          <Route path='/scheduling' element={<Scheduling/>}></Route>
          <Route path='/message' element={<InterviewMessage/>}></Route>

          <Route path='/hiringmanagerdash' element={<Dashboard/>}></Route>

          <Route path='/candidatedash' element={<Candidatedash/>}>
            <Route path='editProfile' element={<EditProfile/>} />
            <Route path='landingPage' element={<LandingPage/>} />
            <Route path='statusPage' element={<Status/>} />
            <Route path='submissionPage' element={<PendingSubmission/>} />
            <Route path='sessionPage' element={<Session/>} />
            <Route path='invitationPage' element={<Invitation/>} />
          </Route>

          <Route path='/admincreateuser' element={<CreateNewUser/>}/>
          <Route path='/adminmodifyuser' element={<ModifyUserAccount/>}/>
          <Route path='/admindeleteuser' element={<DeleteUserAccount/>}/>
          <Route path='/adminroleassignment' element={<RoleAssignment/>}/>
          <Route path='/adminaccesscontrol' element={<AccessControl/>}/>
          <Route path='/adminsystemsettings' element={<SystemSettings/>}/>

          <Route path = '/userdetails' element={<ViewUserCard/>}/>
         
          
        <Route path='/hiringdecision' element={<HiringDecision/>}></Route> 
        <Route path='/jobapproval' element={<JobApproval/>}></Route>
        <Route path='/hiringmanagerinterviewfeedback' element={<InterviewFeedback/>}></Route>
        <Route path='/reporting' element={<Reporting/>}></Route>
      {/*  
        
        <Route path='/hiringmanagermessage' element={<HiringManagerMessage/>}></Route>
         */}

        </Routes>

        </UserContextProvider>
      

      
    </div>
  );
}

export default App;




