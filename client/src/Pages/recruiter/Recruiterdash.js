import React, { useState, useEffect } from 'react';
import CardL from '../../Components/hiringManagerCompo/CardL';
import CardS from '../../Components/hiringManagerCompo/CardS';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

export default function Recruiterdash() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [carddetails,setCardDetails] = useState({
    applications:0,
    acceptedApplications:0,
    interviewedcandidates:0,
    Totalvacancies:0,
    candidates:0,
    postedJobs:0,
    pendingjobs:0,
    newmessages:0,
    todayinterveiw:0

});


 

  const [candidateDetails,setCandidateDetails] = useState([]);

  

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

   const getpostedjobs = async ()=>{
    try{
         const response = await axios.get('/dashboard/totaljobpostingcount'); 
         setCardDetails((prevState)=>({
           ...prevState,
           postedJobs:response.data.jobpostingcount
         }));
    }catch(err){
      console.log(err);
    }
   }

   
 const getpendingjobs = async ()=>{
  try{
  const response = await axios.get('/dashboard/totalpendingjobcount')
  setCardDetails((prevState)=>({
    ...prevState,
    pendingjobs:response.data.pendingjobpostingcount
  }));
  
  }catch(err){
    console.log(err);
  }
 }

 const getEvaluations = async ()=>{
  try{
     const respone = await axios.get('/dashboard/totalevaluations');
     setCardDetails((prevState)=>({
       ...prevState,
       interviewedcandidates:respone.data.total
     }));
  }
  catch(err){
    console.log(err);
  }
 }
 const gettotalvacancies = async ()=>{
  try{
    const response= await axios.get('/dashboard/totalvacancies');
    setCardDetails((prevState)=>({
      ...prevState,
      Totalvacancies:response.data.totalVacancies
    }));  
  }catch(err){
    console.log(err);
  }

 }

 const  getapplications = async ()=>{
  try{
       const response = await axios.get('/reporting/getallapplicationcount');
       setCardDetails((prevState)=>({
        ...prevState,
        applications:response.data.total
      }));
       
  }catch(err){  
    console.log(err);
  }
 }

 const getCandidateDetails = async ()=>{
  try{
        const response = await axios.get('/dashboard/getcandidatedetails') ;
        setCandidateDetails(response.data.candidatedetails);
        

   }catch(err){
    console.log(err);
  }
 }

   useEffect(() => {
    getpostedjobs();
    getpendingjobs();
    getTotalCandidates();
    getacceptedapplications();
    gettodayinterviewcount();
    getEvaluations();
    gettotalvacancies();
    getapplications();
    getCandidateDetails();
    
   },[]);

   useEffect(() => {
    const matchedByFname = candidateDetails.filter(candidate =>
      candidate.fname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const matchedByLname = candidateDetails.filter(candidate =>
      candidate.lname.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    setFilteredCandidates(
      matchedByFname.length > 0 ? matchedByFname : matchedByLname
    );
  }, [searchTerm, candidateDetails]);

  useEffect(() => {
    setFilteredCandidates(candidateDetails);
    console.log(candidateDetails);
  }
  ,[candidateDetails]);

  return (
    <div className="flex items-center ml-[320px] justify-center  ">
      <div className="rounded-3xl  w-full mx-5 mt-2" style={{ background: 'linear-gradient(to bottom, #2B2B2B 0%, rgba(43, 43, 43, 0) 35%)' }}>
        <div className="flex items-center justify-around mt-5">
          <CardL  name="Pending" subName="Jobs" val={carddetails.pendingjobs} />
          <CardL  name="Accepted" subName="Applications" val={carddetails.acceptedApplications} />
          <CardL  name="Today" subName="Interviews" val={carddetails.todayinterveiw} />
          <CardL name="New Messages" val={carddetails.newmessages} />
        </div>
        <div className="flex items-center justify-around mt-8">
        <CardS name="Candidates" val={carddetails.candidates} />
          <CardS  name="Approved" subName="Jobs" val={carddetails.postedJobs} />
          <CardS  name="Vacancies" val={carddetails.Totalvacancies} />
          <CardS name="Interviewed" subName="Candidates" val={carddetails.interviewedcandidates} />
          <CardS  name="Total" subName="Applications" val={carddetails.applications} />
          
        </div>

        <div className="flex flex-col items-center mt-20">
        <div className="w-[60%] flex items-center justify-center mb-4 p-4 rounded-2xl border-2 border-[#2B2B2B]" style={{ background: 'linear-gradient(to bottom, #2B2B2B 0%, rgba(43, 43, 43, 0) 80%)' }} >  
          <input
            type="text"
            placeholder="Search Candidate's Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent focus:outline-none text-white opacity-25 w-full"
          />
          <FaSearch className="text-gray-500 ml-2" />
        </div>
        <div className="w-[75%] max-h-[700px] overflow-y-auto pr-2">
          {filteredCandidates.map((candidate, index) => (
            <div key={index} className="flex items-center justify-between p-4 mb-2 rounded border-x-2 border-[#2B2B2B]" style={{ background: 'linear-gradient(to bottom, #2B2B2B 0%, rgba(43, 43, 43, 0) 60%)' }}>
              <div className='items-center block '>
                <img src={candidate.image} alt='' className='rounded-full border-[2px] w-[50px] h-[50px]' />
              </div>
              <div>
                <p className="text-lg font-bold">{candidate.fname} {candidate.lname}</p>
                
              </div>
              <div>
                <p className="text-sm">{candidate.email}</p>
              </div>
              <div>
                <p className="text-sm text-white opacity-25">{candidate.phone_number}</p>
              </div>
            </div>
          ))}
          {filteredCandidates.length === 0 && (
            <p className="text-gray-500 text-center mt-4">No candidates found</p>
          )}
        </div>

        </div>
        </div>

    </div>
  );
}
