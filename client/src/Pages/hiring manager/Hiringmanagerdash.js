import React, { useState ,useEffect} from 'react';
import TopbarDash from '../../Components/hiringManagerCompo/DashboardTopBar.jsx';
import CardL from '../../Components/hiringManagerCompo/CardL.jsx';
import CardS from '../../Components/hiringManagerCompo/CardS.jsx';
import Meeting from '../../Components/hiringManagerCompo/Meeting.jsx';
import Jobs from '../../Components/hiringManagerCompo/Jobs.jsx';
import HiringmanagerNav from '../../Components/hiringManagerCompo/HiringManagerNav'
import axios from 'axios';


export default function Hiringmanagerdash() {
   
   const [carddetails,setCardDetails] = useState({
         applications :0,
         acceptedApplications:0,
         hire:0,
         postedJobs:0,
         pendingjobs:0,
         candidates:0,
         interviewedCandiates:0,
         totalVacancies:0


   });


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

   const gettotalvacancies = async ()=>{
    try{
      const response= await axios.get('/dashboard/totalvacancies');
      setCardDetails((prevState)=>({
        ...prevState,
        totalVacancies:response.data.totalVacancies
      }));  
    }catch(err){
      console.log(err);
    }

   }

   const gethired = async ()=>{
    try{
        const response = await axios.get('/reporting/getallhiredcount');
        setCardDetails((prevState)=>({
          ...prevState,
          hire:response.data.hiredcount
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
       interviewedCandiates:respone.data.total
     }));
  }
  catch(err){
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

   useEffect(()=>{
    getTotalCandidates();
    getapplications();
    getacceptedapplications();
    gettotalvacancies();
    gethired();
    getpendingjobs();
    getEvaluations();
    getpostedjobs();

   },[])

   useEffect(()=>{
    console.log(carddetails);
   },[carddetails])


  return   (
    <div className='flex w-screen'>
      <div className='fixed '>
        <HiringmanagerNav/>
      </div>
      <div className='w-screen lg:ml-[320px] md:ml-72 ml-[260px] '>
          
      <TopbarDash  className='z-40' ></TopbarDash>
        <div className='content items-center flex flex-col justify-center z-40 text-white p-[25px] bg-transparent m-[30px] h-[85vh] overflow-auto rounded-[30px] '> 
        {/*  bg-[linear-gradient(to_top,_#100c08_0%,_#2B2B2B_100%)]  */}
        <div className="card_container mt-[10px] flex flex-col gap-5 "> 
            <div className="card_container_1 flex  mb-6 justify-center gap-24 ">
                <CardL name="Hired" val={carddetails.hire} />
                <CardL name="Evaluations" val={carddetails.interviewedCandiates}/>
                <CardL name="Pending Jobs" val={carddetails.pendingjobs}/>
                <CardL name="Total Vacancies" val={carddetails.totalVacancies-carddetails.hire}/>
            </div>

            <div className="card_container_2 flex flex-row  mb-6 justify-center gap-20  sm:ml-[50px] sm:mr-[50px] lg:ml-[100px] lg:mr-[100px] ">
                    
                    <CardS name="Approved Jobs" val={carddetails.postedJobs}/>
                    <CardS name="Total Applications" val={carddetails.applications}/>
                    <CardS name="Accepted Applications" val={carddetails.acceptedApplications}/>
                    <CardS name="Total Candidates" val={carddetails.candidates}/>
                    
                </div> 

            </div>
            {/* <div className=" flex mb-[20px] justify-center gap-32 bg-transparent">
               
            <div className="[perspective:1000px]">
  <div className="bg-[linear-gradient(to_top,_#100c08_0%,_#2B2B2B_100%)] rounded-[15px] [box-shadow:0_10px_20px_rgba(0,_0,_0,_0.3),_0_6px_6px_rgba(0,_0,_0,_0.23)] [transition:transform_0.3s_ease-in-out] [transform:rotateY(0deg)] mb-[20px] w-[400px] p-[5px]">
    <h1 className='text-[#ffffff] 320px:text-[0.7rem] 450px:text-[0.8rem] sm:text-[0.9rem] 900px:text-[1.1rem] 1010px:text-[1.2rem] mb-2'>Today's Meeting</h1>
    <div className="meeting-list h-[400px] overflow-auto">
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
      <Meeting />
    </div>
  </div>
</div>

           
          
<div className="[perspective:1000px]">
  <div className="bg-[linear-gradient(to_top,_#100c08_0%,_#2B2B2B_100%)] rounded-[15px] [box-shadow:0_10px_20px_rgba(0,_0,_0,_0.3),_0_6px_6px_rgba(0,_0,_0,_0.23)] [transition:transform_0.3s_ease-in-out] [transform:rotateY(0deg)] w-[400px] p-[5px]">
    <h1 className='text-[#ffffff] 320px:text-[0.7rem] 450px:text-[0.8rem] sm:text-[0.9rem] 900px:text-[1.1rem] 1010px:text-[1.2rem] mb-2'>Jobs</h1>
    <div className="jobs-list h-[400px] overflow-auto">
      <Jobs />
    </div>
  </div>
</div>


              
           </div> */}

        </div>
       

          
                              
         
                  
                </div>
      
    </div>
  )
}
