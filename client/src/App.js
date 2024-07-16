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
import Recruiterdash from './Pages/recruiter/Recruiterdash';
import Interviewerdash from './Pages/interviewer/Interviewerdash';
import Hiringmanagerdash from './Pages/hiring manager/Hiringmanagerdash';
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
import ProtectedRoute from './Components/ProtectedRoute';

import JobApproval from './Pages/hiring manager/JobApproval';
import InterviewFeedback from './Pages/hiring manager/InterviewFeedback';
import HiringDecisions from './Pages/hiring manager/HiringDecisions';
import Reporting from './Pages/hiring manager/Reporting';
import MessageHiringManager from './Pages/hiring manager/MessageHiringManager';
import OTP from './Pages/OTP';
import Landingpage from './Components/LandingPage/Landingpage';
import QandA from './Pages/admin/QandA';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true



function App() {

  
  return (
    <div className="overflow-x-hidden App">

      <UserContextProvider>
      <Toaster position='bottom-right' toastOptions={{duration: 3000}}></Toaster>
      
        <Routes>
          
          <Route path='/' element={<Landingpage/>}></Route>
          <Route  path='/login'element={<Login/>}> </Route>
          <Route  path='/forget'element={<ForgetPassword/>}> </Route>
          <Route path='verifyotp' element={<OTP/>}/>
          <Route  path='/changepassword'element={<ChangePw/>}> </Route>
          <Route  path='/createNewAccount'element={<NewCandidateCreateAccount/>}> </Route>
          <Route  path='/register'element={ <Register/>}> </Route>
          
          <Route path='/admindash' element={<ProtectedRoute><Admindash /></ProtectedRoute>} />
          <Route path='/recruiterdash' element={<ProtectedRoute><RecruiterLayout /></ProtectedRoute>}>
            <Route index element={<Recruiterdash />} />
            <Route path="JobPosting" element={<JobPosting />} />
            <Route path="CandidateCommunication" element={<CandidateCommunication />} />
            <Route path="ApplicationManagement" element={<ApplicationManagement />} />
            <Route path="CandidateAssessment" element={<CandidateAssessment />} />
            <Route path="Message" element={<Message />} />
          </Route>

          <Route path='/interviewerdash' element={<ProtectedRoute><Interviewerdash /></ProtectedRoute>} />
          <Route path='/interview' element={<ProtectedRoute><Interview /></ProtectedRoute>} />
          <Route path='/feedbacksubmission' element={<ProtectedRoute><Feedbacksubmission /></ProtectedRoute>} />
          <Route path='/evaluation' element={<ProtectedRoute><Evaluation /></ProtectedRoute>} />
          <Route path='/scheduling' element={<ProtectedRoute><Scheduling /></ProtectedRoute>} />
          <Route path='/message' element={<ProtectedRoute><InterviewMessage /></ProtectedRoute>} />

          <Route path='/hiringmanagerdash' element={<ProtectedRoute><Hiringmanagerdash /></ProtectedRoute>} />
          <Route path='/hiringmanagerjobapproval' element={<ProtectedRoute><JobApproval/></ProtectedRoute>} />
          <Route path='/hiringmanagerinterviewfeedback' element={<ProtectedRoute><InterviewFeedback/></ProtectedRoute>} />
          <Route path='/hiringmanagerhiringdecisions' element={<ProtectedRoute><HiringDecisions/></ProtectedRoute>} />
          <Route path='/hiringmanagerreporting' element={<ProtectedRoute><Reporting/></ProtectedRoute>} />
          <Route path='/hiringmanagermessage' element={<ProtectedRoute><MessageHiringManager/></ProtectedRoute>} />
          
          <Route path='/candidatedash' element={<ProtectedRoute><Candidatedash /></ProtectedRoute>}>
            <Route path='editProfile' element={<EditProfile />} />
            <Route path='landingPage' element={<LandingPage />} />
            <Route path='statusPage' element={<Status />} />
            <Route path='submissionPage' element={<PendingSubmission />} />
            <Route path='sessionPage' element={<Session />} />
            <Route path='invitationPage' element={<Invitation />} />
          </Route>

          <Route path='/admincreateuser' element={<ProtectedRoute><CreateNewUser /></ProtectedRoute>} />
          <Route path='/adminmodifyuser' element={<ProtectedRoute><ModifyUserAccount /></ProtectedRoute>} />
          <Route path='/admindeleteuser' element={<ProtectedRoute><DeleteUserAccount /></ProtectedRoute>} />
          <Route path='/adminroleassignment' element={<ProtectedRoute><RoleAssignment /></ProtectedRoute>} />
          <Route path='/adminaccesscontrol' element={<ProtectedRoute><AccessControl /></ProtectedRoute>} />
          <Route path='/adminsystemsettings' element={<ProtectedRoute><SystemSettings /></ProtectedRoute>} />
          <Route path='/adminqandas' element={<ProtectedRoute><QandA/></ProtectedRoute>}></Route>

          <Route path='/userdetails' element={<ProtectedRoute><ViewUserCard /></ProtectedRoute>} />
        </Routes>

        </UserContextProvider>
      

      
    </div>
  );
}

export default App;




