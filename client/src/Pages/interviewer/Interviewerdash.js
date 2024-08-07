import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../../Context/UserContext';
import InterviewNav from '../../Components/interviewercomp/InterviewNav'
import './custom.css';
import Header from '../../Components/interviewercomp/InterviewerHeader';
import InterviewBar from '../../Components/interviewercomp/InterviewBar';
import axios from 'axios';
import CardL from '../../Components/hiringManagerCompo/CardL.jsx'
import AdminChatBotBottom from '../../Components/admincomp/AdminChatBotBottom.js';


export default function Interviewerdash() {

  const { user } = useContext(UserContext);
  const [interviews, setInterviews] = useState([]);
  const today = new Date();

  const selectedDateSchedules = interviews.filter(schedule =>
      new Date(schedule.date).toLocaleDateString() === today.toLocaleDateString()
      && (schedule.primary_interviewer === user._id || schedule.second_interviewer === user._id)
  );

  const [carddetails,setCardDetails] = useState({
   applications :0,
   acceptedApplications:0,
   todayinterveiw:0,
   interviewedCandiates:0


});


  useEffect(() => {
    
    const fetchInterviewSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:8000/schedule/getinterviewschedule'); 
        setInterviews(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviewSchedules(); 

    getTotalCandidates();
    getacceptedapplications();
    gettodayinterviewcount();
    getEvaluations();
  }, []); 

  const getEvaluations = async ()=>{
    try{
       const respone = await axios.get('/dashboard/totalevaluations');
       setCardDetails((prevState)=>({
         ...prevState,
         interviewedCandiates:respone.data.total
       }));
    }
    catch(err){
      console.log(err);
    }
   }

  const getTotalCandidates = async () => {
    try{
     const response = await axios.get('/dashboard/getcandidatecount');
      setCardDetails((prevState)=>({
         ...prevState,
         candidates:response.data.candidatecount
      }));
    }catch(err){
       console.log(err);
    }
  }

  const getacceptedapplications = async ()=>{
    try{
        const response = await axios.get('/reporting/getallacceptedapplicationcount');
        setCardDetails((prevState)=>({
          ...prevState,
          acceptedApplications:response.data.total
        }));
    }catch(err){
      console.log(err);
    } 
   }

   const gettodayinterviewcount = async ()=>{
    try{
        const response = await axios.get('/dashboard/gettodayinterview');
        setCardDetails((prevState)=>({
          ...prevState,
          todayinterveiw:response.data.todayInterviews
        }));
    }catch(err){
      console.log(err);
    }
   }

  return (

    <div>
      <div className='flex' >
        <div>
          <InterviewNav/>
        </div>
        <div>
          <Header/>
        </div> 
        <div id='background'  className="z-0 mx-8 mt-24 w-80 h-80vh rounded-3xl">
          <div className='flex items-center justify-around mt-5'>
             <CardL  name="Applications" subName="to evaluate" val={carddetails.acceptedApplications-carddetails.interviewedCandiates }></CardL>
             <CardL name='Today' subName="interviews" val={selectedDateSchedules.length}></CardL>
             <CardL name='New Messages' val='3'></CardL>
             <CardL name="Total" subName="Candidates" val={carddetails.candidates}></CardL>
             
          </div>
          <div>
            <div className='mt-16 ml-8'>
              <p className='mt-8 ml-8 text-xl text-left'>Today's Interviews</p>
            </div>
            <div id='bar-container' className='mt-5 overflow-y-auto max-h-80'>
            {selectedDateSchedules.length === 0 ? (
              <div className='mt-10 font-medium text-lg'>No scheduled interviews for today</div>
            ) : (
              selectedDateSchedules
                .sort((a, b) => new Date(`1970-01-01T${a.start_time}Z`) - new Date(`1970-01-01T${b.start_time}Z`))
                .map((interview, index) => (
                  <InterviewBar
                    key={index}
                    interviewTitle={interview.subject}
                    interviewDate={new Date(interview.date).toLocaleDateString()}
                    interviewTime={interview.start_time}
                  />
                ))
            )}
            </div>
          </div>
        </div>
        </div>
         {/* Move AdminChatBotBottom here and wrap it in a positioned div */}
      <div className="absolute bottom-0 right-0 z-50">
        <AdminChatBotBottom/>
      </div>
    </div>
  )
}

