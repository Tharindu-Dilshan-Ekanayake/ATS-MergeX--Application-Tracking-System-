import React, { useState, useEffect } from "react";
import Navbar from "../../Components/hiringManagerCompo/Navbar.jsx";
import Topbar from "../../Components/hiringManagerCompo/Topbar.jsx";
import PendingJobs from "../../Components/hiringManagerCompo/PendingJobs.jsx";
import axios from "axios";
import HiringmanagerNav from '../../Components/hiringManagerCompo/HiringManagerNav';


export default function JobApproval() {

  
  const [jobpostings, setJobPostings] = useState([]);
  // const [showEvaluated,setShowEvaluated] = useState(false);

  // const setshowEvaluatedtrue = () => {
  
  //   setShowEvaluated(true);
    
  // }
  
  // const setshowEvaluatedfalse = ()=>{
  //   setShowEvaluated(false);
  // }
  

  useEffect(() => {
    axios
      .get("/job/getAllPendingJobPostings")
      .then((response) => {
        setJobPostings(response.data);
        console.log("Pending job postings:", response.data);
      })
      .catch((error) => {
        console.log("Error fetching pending job postings:", error);
      });
  }, []);

 
  return (
    <div className='flex w-screen'>
      <div className='fixed'>
        <HiringmanagerNav/>
      </div>
      <div className='w-screen lg:ml-[320px] md:ml-72 ml-[260px] '>

      <div   >
            <Topbar 
              title='Job Approval'
            ></Topbar>
            <div className="content text-white p-[30px]  m-[30px]  h-[85vh] rounded-[30px] ">
            {/* bg-[#212121] */}
              <p className="pb-[20px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem] ">
                Pending jobs
              </p>
              {/* <div>{!showEvaluated ? ( <button className="absolute right-[60px] top-[95px] p-[10px] rounded-[10px] bg-[#EA7122]" onClick={setshowEvaluatedtrue}>View Checked Job Posting</button>):( <button className="absolute right-[60px] top-[95px] p-[10px] rounded-[10px] bg-[#EA7122]" onClick={setshowEvaluatedfalse}>View Unchecked Job Postings</button>)} </div> */}
              <div>
                <div className="overflow-auto h-[75vh] ">
                  {jobpostings.map((jobposting) => (
                    <PendingJobs
                      key={jobposting._id}
                      id={jobposting._id}
                      post={jobposting.jobTitle}
                      date={jobposting.updatedAt}
                      sallary={jobposting.salary}
                      requiredExperience={jobposting.requiredExperience}
                      requiredSkills={jobposting.requiredSkills}
                      vacancies={jobposting.vacancies}
                      description={jobposting.description}
                 
                    ></PendingJobs>
                  ))}
                  {/* <PendingJobs post='Software Engineer' date='2024-06-03' recruiter='Pramudi'></PendingJobs> */}
                </div>
              </div>
            </div>
          </div>






      </div>
      </div>
          
  );
}
