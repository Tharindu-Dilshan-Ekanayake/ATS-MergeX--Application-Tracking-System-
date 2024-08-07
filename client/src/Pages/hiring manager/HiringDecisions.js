import React, { useContext, useState,useEffect } from 'react';
import Topbar from '../../Components/hiringManagerCompo/Topbar.jsx';
import PostTag from '../../Components/hiringManagerCompo/PostTag.jsx';
import ProgressLine from '../../Components/hiringManagerCompo/ProgressLine.jsx';
import HiringmanagerNav from '../../Components/hiringManagerCompo/HiringManagerNav';
import { UserContext } from '../../Context/UserContext.js';
import axios from 'axios';
import { toast } from "react-hot-toast";
import { IoChevronBackCircle } from "react-icons/io5";
import AdminChatBotBottom from '../../Components/admincomp/AdminChatBotBottom.js';

export default function HiringDecision() {

  
  const [selected,setselected]=useState(null);
  const { users, setUsers } = useContext(UserContext);
  const [showDetails,setshowDetails]=useState(false); 
  const [existEvolution, setexistEvolution] = useState([]);
  const [evoluations, setEvoluations] = useState([]);
  const [candidates, setCandidate] = useState([]);
  const [showEvaluated,setShowEvaluated] = useState(false);
  const [hired,sethired] = useState(true);
  const [rejected,setreject]= useState(false);
  const [hiredevalutions,sethiredevaluations]= useState([]);
  const [hiredCandidate,sethiredcandidate]= useState([]);
  const [rejectedevaluations,setrejectedEvaluations]= useState([]);
  const [rejectedCandidate,setrejectedcandidate]= useState([]);
   
const clearcandiates=()=>{
  setCandidate([]);
  setEvoluations([]);
}

const clearhiredcandiates=()=>{
  sethiredcandidate([]);
  sethiredevaluations([]);
  setexistEvolution([]);
}

const clearrejectedcandiates=()=>{
  setrejectedcandidate([]);
  setrejectedEvaluations([]);
  setexistEvolution([]);
}
 

  const [data,setData]=useState({
    candidatename:'',
    candidateid:'',
    candidateemail:'',
    interviewername:'',
    interviewerid:'',
    problemsolution:0,
    languageproficiency:0,
    interviewercomments:'',
    addcomment:0,
    collaboration:0,
    adoptability:0,
    decisionmaking:0,
    leadership:0,
    clarity:0,
    activelistening:0,
    empathy:0,
    presentationskills:0,
    technical:0,
    cultural:0,
    communication:0,
    overallcomment:'',
    hiringManagerComment: "",
    recruiterComment: "",
    isHired:false,
    isRejected:false
  });
  
 
  const getInterviewdCandidates = async () => {
    try{
      const resposne = await axios.get('http://localhost:8000/evaluation/getcandidateforfinaldecision');
      setEvoluations(resposne.data);
      
    }
    catch(error){
      console.error(" Can't get evoluations",error);
    }
    };

    const getrejectedevaluations = async ()=>{
     try{
      const response = await axios.get('http://localhost:8000/evaluation/getrejectedList');
      setrejectedEvaluations(response.data);
     }
     catch(error){
        console.error("can't get rejected evaluations");
     }

    }

const gethiredevaluations = async ()=>{
  try{
    const response = await axios.get('http://localhost:8000/evaluation/gethiredCandidtaesList');
    sethiredevaluations(response.data);
  }
  catch(error){
   console.log(" can't get evaluations");
  }
}
  
      const getImg = async (user_id) => {
        if (!user_id){
          console.error("User ID is required");
          return;
        }
      try {
        const response = await axios.get(`http://localhost:8000/evaluation/getimg/${user_id}`);
        setCandidate(prevState => prevState.map(candidate =>
          candidate.userid === user_id ? { ...candidate, image: response.data.image } : candidate
        ));
  
        
      } catch (error) {
        console.error(error);
      }
    };

    const gethiredImg = async (user_id) => {
      if (!user_id){
        console.error("User ID is required");
        return;
      }
    try {
      const response = await axios.get(`http://localhost:8000/evaluation/getimg/${user_id}`);
      sethiredcandidate(prevState => prevState.map(candidate =>
        candidate.userid === user_id ? { ...candidate, image: response.data.image } : candidate
      ));

      
    } catch (error) {
      console.error(error);
    }
  };

  const getrejectedImg = async (user_id) => {
    if (!user_id){
      console.error("User ID is required");
      return;
    }
  try {
    const response = await axios.get(`http://localhost:8000/evaluation/getimg/${user_id}`);
    setrejectedcandidate(prevState => prevState.map(candidate =>
      candidate.userid === user_id ? { ...candidate, image: response.data.image } : candidate
    ));

    
  } catch (error) {
    console.error(error);
  }
};

  
      const processCandidates = async () => {
      
      evoluations.forEach((evoluation)=>{
        const { _id,candidateid, candidatename, candidateemail, position} = evoluation;
        setCandidate(prevState => [...prevState, {
          _id,
          userid:candidateid,
          username: candidatename,
          email: candidateemail,
          image: '', // initial placeholder value
          post: position // initial placeholder value
        }]);
        getImg(candidateid);
        console.log("Candidates data:",candidates);
      });
  
    };
    const processhiredCandidates = async () => {
      
      hiredevalutions.forEach((evoluation)=>{
        const { _id,candidateid, candidatename, candidateemail, position} = evoluation;
        sethiredcandidate(prevState => [...prevState, {
          _id,
          userid:candidateid,
          username: candidatename,
          email: candidateemail,
          image: '', // initial placeholder value
          post: position // initial placeholder value
        }]);
        gethiredImg(candidateid);
        console.log("Candidates data:",candidates);
      });
  
    };

    const processrejectedCandidates = async () => {
      
      rejectedevaluations.forEach((evoluation)=>{
        const { _id,candidateid, candidatename, candidateemail, position} = evoluation;
        setrejectedcandidate(prevState => [...prevState, {
          _id,
          userid:candidateid,
          username: candidatename,
          email: candidateemail,
          image: '', // initial placeholder value
          post: position // initial placeholder value
        }]);
        getrejectedImg(candidateid);
        console.log("Candidates data:",candidates);
      });
  
    };

useEffect(() => {
  const fetchEvaluation = async () => {
    if (showDetails && selected) { // Check if showDetails is true and selected._id is defined before fetching
      try {
        console.log('Fetching evaluation for candidate ID:', selected.userid); // Debug log
        const response = await axios.get(
          `http://localhost:8000/evaluation?candidateid=${selected.userid}&position=${encodeURIComponent(selected.post)}`
        );
        console.log('Evaluation response:', response); // Debug log
        
        if (response.data) {
         
          setData(response.data);
          setexistEvolution(response.data);
          // Use response.data directly
        }
       
       
      } catch (error) {
        console.error(error);
        console.log(selected);
       
      }
    }
  };

  fetchEvaluation();
}, [showDetails, selected]);
  

const updateEvaluation = async (event) => {
  event.preventDefault();
  if (!hiringDecision) {
    toast.error('Admin blocked temporarily');
    return;
  }
  try {
    const response = await axios.put(
      `http://localhost:8000/hmfeedback/update/${existEvolution._id}`,
      { isHired: data.isHired,isRejected:data.isRejected }
    );
    if (response.data.error) {
      console.error("Error in updating Evaluations");
      toast.error("Error.Not updated",response.data.error);
    } else {
     
      console.log("send data to database" ,data);
      if(data.isHired===false){
        toast.error("Rejected");
      }else{
      toast.success("Hired");
      }
    }
  } catch (error) {
    console.error("Error updating evaluation:", error);
    toast.error("System Error");
  }
};

const handleClick = async (event) => {
  // Update state and then call updateEvaluation
  data.isHired = true;
  console.log(data);
  // Call updateEvaluation function
  await updateEvaluation(event);
};
const reject = async (event) => {
  // Update state and then call updateEvaluation
  data.isRejected = true;
  console.log(data);
  // Call updateEvaluation function
  await updateEvaluation(event);
};

const sethiredTrue=()=> {
  setreject(false);
  sethired(true);
}

const setrejectedTrue= ()=>{
  sethired(false);
  setreject(true);
}

// useEffect(()=>{
//   getInterviewdCandidates();
  
// },[]);
useEffect(() => {
  console.log("Evoluations data:",evoluations);
}
,[evoluations]);

useEffect(() => {
  processCandidates();
}, [evoluations]);

useEffect(() => {
  console.log("Candidates data:",candidates);
}
,[candidates]);

const setshowEvaluatedtrue = () => {
  
  setShowEvaluated(true);
  
}

const setshowEvaluatedfalse = ()=>{
  setShowEvaluated(false);
}

useEffect(()=>{
  if(showEvaluated){
    if(!rejected){
    gethiredevaluations();
    clearrejectedcandiates();
    clearcandiates();

  }else{
    getrejectedevaluations();
    clearhiredcandiates();
    clearcandiates();
  }
  }else{
    getInterviewdCandidates();
    clearhiredcandiates();
    clearrejectedcandiates();
  }

},[showEvaluated,hired,rejected]);

useEffect(()=>{
   processhiredCandidates();
},[hiredevalutions])

useEffect(()=>{
  processrejectedCandidates();
},[rejectedevaluations])

//access
const [hiringDecision, setHiringDecision] = useState(false);

  useEffect(() => {
    // Fetch the current state of create_user_account from the backend
    const fetchCreateUserAccount = async () => {
      try {
        const response = await axios.get('/access/getmakedecision');
        setHiringDecision(response.data.make_decision);
      } catch (error) {
        console.error('Error fetching create user account state:', error);
      }
    };

    fetchCreateUserAccount();
  }, []);

return (
  <div className='flex w-screen'>
      <div className='fixed'>       
        <HiringmanagerNav/>
      </div>
      <div className='w-screen lg:ml-[320px] md:ml-72 ml-[260px] '>
      <Topbar title='Hiring Decision' ></Topbar>
      <div className={`content  text-white flex flex-row p-[0px]    m-[30px]  h-fit rounded-[30px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  ${showDetails===false ? ' justify-center h-[85vh] ' :null}`} >
      {/* bg-[#212121] */}

      {!showDetails ? (<div>{!showEvaluated ? ( <button className="absolute right-[60px] top-[120px] p-[10px] rounded-[10px] bg-[#EA7122]" onClick={setshowEvaluatedtrue}>Show Checked Cadidates</button>):( <button className="absolute right-[60px] top-[120px] p-[10px] rounded-[10px] bg-[#EA7122]" onClick={setshowEvaluatedfalse}>Show Unchecked Cadidates</button>)} </div>):(<IoChevronBackCircle  onClick={()=>{setshowDetails(false)}}  className="absolute right-[60px] top-[120px] w-[50px] h-[50px] text-[#EA7122]" />)}     
      <div className='candidates  flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px]  sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]'>
          <p className='text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]'>Candidates</p>
          {/* <PostTag></PostTag> */}
          <div className='flex flex-row justify-around'>  {!showDetails && showEvaluated ? (<button className={`w-[150px] ${!rejected ? "p-[5px]  border-[2px] border-[#EA7122] rounded-[15px]  ": null}`} onClick={sethiredTrue}>Hired List</button> ):(null)}  {!showDetails && showEvaluated ? (<button className={`w-[150px] ${rejected ? "p-[5px]  border-[2px] border-[#EA7122] rounded-[15px]  ": null}`} onClick={setrejectedTrue}>Rejected List</button> ):(null)}     </div> 
          <div className={`max-h-[75vh] flex justify-center overflow-y-auto ${showDetails===false ? 'w-[600px]' :null}`}  >

          <div className="h-[75vh] overflow-auto overflow-x-hidden">
        
          {showEvaluated ? ( <div>{hired ? (
            <div>
       
          {hiredCandidate.map((candidate,index) => (
           
          <button
              key={index}
              onClick={() => {
                setshowDetails(true);
                setselected(candidate);
              }}
              className={` hover:scale-105 accLabel m-[10px] my-[5px]  flex flex-row   bg-[#2b2b2b] sm:pl-[5px]  items-center   rounded-[30px]  sm:gap-[4px] esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]   sm:w-[150px] sm:h-[45px]  lg:rounded-[25px]  lg:gap-[12px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] ${
                showDetails === false
                  ? "lg:w-[500px] justify-between  m-[30px]"
                  : null
              }`}
            >
              <div
                className={` ${
                  showDetails === false
                    ? "flex justify-evenly gap-[12px]"
                    : " flex flex-row  gap-[12px] justify-start"
                } `}
              >
                <img
                  src={candidate.image}
                  alt=""
                  className="userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
                />
                <div className="block ">
                  <p className="name text-left text-[#ffffff] mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]">
                    {candidate.username}{" "}
                  </p>
                  <p className="post text-left text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]">
                    {candidate.post}
                  </p>
                </div>
              </div>
              <p
                className={`post ${
                  showDetails === false ? "block" : "hidden"
                } mr-[60px] text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]`}
              >
                {candidate.email}
              </p>
            </button>
                  ))}</div>
          ):(
            <div>
       
          {rejectedCandidate.map((candidate,index) => (
           
          <button
              key={index}
              onClick={() => {
                setshowDetails(true);
                setselected(candidate);
              }}
              className={` hover:scale-105 accLabel m-[10px] my-[5px]  flex flex-row   bg-[#2b2b2b] sm:pl-[5px]  items-center   rounded-[30px]  sm:gap-[4px] esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]   sm:w-[150px] sm:h-[45px]  lg:rounded-[25px]  lg:gap-[12px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] ${
                showDetails === false
                  ? "lg:w-[500px] justify-between  m-[30px]"
                  : null
              }`}
            >
              <div
                className={` ${
                  showDetails === false
                    ? "flex justify-evenly gap-[12px]"
                    : " flex flex-row  gap-[12px] justify-start"
                } `}
              >
                <img
                  src={candidate.image}
                  alt=""
                  className="userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
                />
                <div className="block ">
                  <p className="name text-left text-[#ffffff] mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]">
                    {candidate.username}{" "}
                  </p>
                  <p className="post text-left text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]">
                    {candidate.post}
                  </p>
                </div>
              </div>
              <p
                className={`post ${
                  showDetails === false ? "block" : "hidden"
                } mr-[60px] text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]`}
              >
                {candidate.email}
              </p>
            </button>
                  ))}</div>
          )}</div>):(<div> {candidates.map((candidate,index) => (
                    <button
              key={index}
              onClick={() => {
                setshowDetails(true);
                setselected(candidate);
              }}
              className={` hover:scale-105 accLabel m-[10px] my-[5px]  flex flex-row   bg-[#2b2b2b] sm:pl-[5px]  items-center   rounded-[30px]  sm:gap-[4px] esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]   sm:w-[150px] sm:h-[45px]  lg:rounded-[25px]  lg:gap-[12px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] ${
                showDetails === false
                  ? "lg:w-[500px] justify-between  m-[30px]"
                  : null
              }`}
            >
              <div
                className={` ${
                  showDetails === false
                    ? "flex justify-evenly gap-[12px]"
                    : " flex flex-row  gap-[12px] justify-start"
                } `}
              >
                <img
                  src={candidate.image}
                  alt=""
                  className="userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
                />
                <div className="block ">
                  <p className="name text-left text-[#ffffff] mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]">
                    {candidate.username}{" "}
                  </p>
                  <p className="post text-left text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]">
                    {candidate.post}
                  </p>
                </div>
              </div>
              <p
                className={`post ${
                  showDetails === false ? "block" : "hidden"
                } mr-[60px] text-[#ffffff] opacity-[30%]  mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]`}
              >
                {candidate.email}
              </p>
            </button>
                  ))}
   </div>)}
</div>
        

        </div>
        </div>
        {showDetails ? (
        <div className='description flex flex-col w-full pt-[20px] box-border h-[85vh] overflow-auto overflow-x-hidden'>
        <div  className='flex flex-row py-[20px] justify-center gap-5 border-[grey]  border-b-[2px] '>
              <img src={selected.image} alt="" className=' userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[100px] lg:h-[100px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]' />
             <div className='flex flex-col details justify-evenly '>
              <p className='text-left'>{selected.username}</p>
              <p className='text-left text-[#ffffff] opacity-[30%] '>{selected.post}</p>
              <p className='text-left text-[#ffffff] opacity-[30%] '> Interviewer Name:{data.interviewername}</p>
             </div>
             <div className="flex flex-col ">
              {/* {submited ?(<label htmlFor="" className="p-[5px] rounded-[10px] bg-[#EA7122] h-fit "> Evaluated</label>):null}   */}
           {data.isHired && showEvaluated? (  <label htmlFor="" className="p-[5px] rounded-[10px] bg-green-700 h-fit " >Hired</label>):null}   
         {data.isRejected && showEvaluated? (      <label htmlFor="" className="p-[5px] rounded-[10px] bg-[#484848] h-fit text-[red] ">Rejected</label>):null} 
                </div>

             </div>
         
             <p className='bg-[#2b2b2b] pl-[20px] py-[15px]  border-[grey]  border-b-[2px]'>Requirements to be considered </p>
              
           <div className='m-[70px]'>
           <div className='mb-[25px]'>
                <div className='pl-[40px] pr-[40px]'>
              <div className=''>
              <p className='text-[0.9rem] mt-[20px] mb-[25px]'>Technical details</p>
               <div className='pl-[80px] pr-[80px]'>
               <ProgressLine progress={data.technical} buffer='60'></ProgressLine>
               </div>
               </div>
              </div>
              <div className='pl-[40px] pr-[40px]'>
              <div className=''>
              <p className='text-[0.9rem] mt-[20px] mb-[25px]'>Cultural Fit</p>
               <div className='pl-[80px] pr-[80px]'>
               <ProgressLine progress={data.cultural} buffer='50'></ProgressLine>
               </div>
               </div>
              </div>
              <div className='pl-[40px] pr-[40px]'>
              <div className=''>
              <p className='text-[0.9rem] mt-[20px] mb-[25px]'>Communiaction</p>
               <div className='pl-[80px] pr-[80px]'>
               <ProgressLine progress={data.communication} buffer='85'></ProgressLine>
               </div>
               </div>
              </div>
              </div>
              <div className='mt-[40px] flex flex-col gap-[15px] items-center'>
              <button type='submit'  onClick={(event) => {
        reject(event);
      }}  className="float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">Reject</button>
              <button type='submit' onClick={(event) => {
        handleClick(event);
      }}  className="float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">Hire</button>
              </div>
           </div>
           
          
            
               
          
             </div>):null}
             
        </div>

      </div> 
       {/* Move AdminChatBotBottom here and wrap it in a positioned div */}
       <div className="absolute bottom-0 right-0 z-50">
        <AdminChatBotBottom/>
      </div>
      </div>

      
 
)
}