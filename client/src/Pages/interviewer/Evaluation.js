import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import InterviewNav from "../../Components/interviewercomp/InterviewNav";
import { UserContext } from "../../Context/UserContext";
import Topbar from "../../Components/hiringManagerCompo/Topbar.jsx";
import PieCharts from "../../Components/interviewercomp/InputPieCharts";
import { toast } from "react-hot-toast";
import { IoChevronBackCircle, IoBagHandleSharp } from "react-icons/io5";


export default function Evaluation() {
  const [selected, setselected] = useState(null);
  const [feedbackTab, setFeedbackTab] = useState(0);
  const [showDetails, setshowDetails] = useState(false);
  const [existEvolution, setexistEvolution] = useState([]);
  const [isexistevaluation, setisexistevaluation] = useState(false);
  const { user } = useContext(UserContext);
  const [application, setApplication] = useState([]);
  const [evaluatedApplication, setEvaluatedApplication] = useState([]);
  const [evaluatedCandidates, setEvaluatedCandidates] = useState([]);
  const [candidates, setCandidate] = useState([]);
  const [showEvaluated,setShowEvaluated] = useState(false);
  const [showApprovedjobPosting, setShowApprovedjobPosting] = useState(true);
  const [approvedjobPosting, setApprovedjobPosting] = useState([]);
  const [showallCandidates, setShowallCandidates] = useState(false);
  const [applicationsbyJobId, setApplicationsbyJobId] = useState([]);
  const [checked, setChecked] = useState(false);
  const [candidatesbyjobId, setCandidatesbyjobId] = useState([]);
  const [checkedEvaluationsbyId, setCheckedEvaluationsbyId] = useState([]);
  const [checkedCandiatesByJobId, setCheckedCandiatesByJobId] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [jobID,setJobID] = useState("");




  const clearCandidates= ()=>{
    setCandidate([]);
    setApplication([]);
  }
 
  const clearEvaluatedCandidates= ()=>{ 
    setEvaluatedCandidates([]);
    setEvaluatedApplication([]);
    setexistEvolution([]);
  }

  const clearcheckedcandiatesbyJobId = ()=>{
    setCheckedCandiatesByJobId([]);
    setCheckedEvaluationsbyId([]);
  }

  const clearcandiatesbyjobid=()=>{
    setApplicationsbyJobId([]);
    setCandidatesbyjobId([]);
  }

  const [data,setData] = useState({
    candidatename: "",
    candidateid: "",
    candidateemail: "",
    position:"",
    job_id:"",
    interviewername: "",
    interviewerid: "",
    problemsolution: 0,
    languageproficiency: 0,
    interviewercomments: "",
    addcomment: 0,
    collaboration: 0,
    adoptability: 0,
    decisionmaking: 0,
    leadership: 0,
    clarity: 0,
    activelistening: 0,
    empathy: 0,
    presentationskills: 0,
    technical: 0,
    cultural: 0,
    communication: 0,
    overallcomment: "",
  });

  const getcheckedEvaluatuonsbyId = async (job_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/evaluation/getcheckedevaluationsbyjobID/${job_id}`
      );
      setCheckedEvaluationsbyId(response.data);
      console.log("UnChecked Evaluations by ID:", response.data);
    } catch (error) {
      console.error("Can't get checked evaluations", error);
    }
  };

  const checkedgetImgByJobId = async (user_id) => {
    if (!user_id) {
      console.error("User ID is required");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:8000/evaluation/getimg/${user_id}`
      );
      setCheckedCandiatesByJobId((prevState) =>
        prevState.map((candidate) =>
          candidate.userid === user_id
            ? { ...candidate, image: response.data.image }
            : candidate
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const processcheckedCandidatesByJobId = async () => {
    checkedEvaluationsbyId.forEach((evoluation) => {
      const { _id, candidateid, candidatename, candidateemail, position } =
        evoluation;
      setCheckedCandiatesByJobId((prevState) => [
        ...prevState,
        {
          _id,
          user_id: candidateid,
          username: candidatename,
          email: candidateemail,
          image: "", // initial placeholder value
          position: position, // initial placeholder value
        },
      ]);
      checkedgetImgByJobId(candidateid);
    });
  };
  

  const handleClick = (value) => {
    setFeedbackTab(value);
  };

  const setshowEvaluatedtrue = () => {
    setShowEvaluated(true);
  }

  const setshowEvaluatedfalse = ()=>{
    setShowEvaluated(false);
  }


  const setcheckedtrue=()=>{
    setChecked(true);
  }

  const setcheckedfalse = ()=>{
    setChecked(false);
  }
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (!isNaN(value) && Number(value) >= 0 && Number(value) <= 100) {
      setData((prevState)=>({
        ...prevState,
        [name]: Number(value),
      }));
    }
  };

  const getPost = async (job_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/evaluation/getpost/${job_id}`);
      setCandidate(prevState => prevState.map(candidate =>
        candidate.job_id === job_id ? { ...candidate, position: response.data.jobTitle } : candidate
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const getPostbyjobid = async (job_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/evaluation/getpost/${job_id}`);
      setCandidatesbyjobId(prevState => prevState.map(candidate =>
        candidate.job_id === job_id ? { ...candidate, position: response.data.jobTitle } : candidate
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const getImg = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/evaluation/getimg/${user_id}`);
      setCandidate(prevState => prevState.map(candidate =>
        candidate.user_id === user_id ? { ...candidate, image: response.data.image } : candidate
      ));
    } catch (error) {
      console.error(error);
    }
  };

  const getImgbyjobid = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/evaluation/getimg/${user_id}`);
      setCandidatesbyjobId(prevState => prevState.map(candidate =>
        candidate.user_id === user_id ? { ...candidate, image: response.data.image } : candidate
      ));
    } catch (error) {
      console.error(error);
    }
  };

  const EvaluatedgetPost = async (job_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/evaluation/getpost/${job_id}`);
      setEvaluatedCandidates(prevState => prevState.map(candidate =>
        candidate.job_id === job_id ? { ...candidate, position: response.data.jobTitle } : candidate
      ));
    } catch (error) {
      console.log(error);
    }
  };

  const EvaluatedgetImg = async (user_id) => {
    try {
      const response = await axios.get(`http://localhost:8000/evaluation/getimg/${user_id}`);
      setEvaluatedCandidates(prevState => prevState.map(candidate =>
        candidate.user_id === user_id ? { ...candidate, image: response.data.image } : candidate
      ));
    } catch (error) {
      console.error(error);
    }
  };

  
  const getApplications = async () => {
    try {
      // const response = await axios.get('http://localhost:8000/cv/getapplications');
      const response = await axios.get('http://localhost:8000/evaluation/getNotEvaluatedApplications');
      setApplication(response.data.applications);
      // application.map((application) => {
      //   console.log("Not Evaluated Applications:", application);
      //   return application;
      // });
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  const processApplications = () => {
    application.forEach(app => {
      const { _id,job_id, user_id, user_name, user_email } = app;
      setCandidate(prevState => [...prevState, {
        _id,
        job_id,
        user_id,
        username: user_name,
        email: user_email,
        image: '', // initial placeholder value
        position: '' // initial placeholder value
      }]);
      getPost(job_id);
      getImg(user_id);
      
    });
    
  };
    
  const processApplicationsbyjobId = () => {
    applicationsbyJobId.forEach(app => {
      const { _id,job_id, user_id, user_name, user_email } = app;
      setCandidatesbyjobId(prevState => [...prevState, {
        _id,
        job_id,
        user_id,
        username: user_name,
        email: user_email,
        image: '', // initial placeholder value
        position: '' // initial placeholder value
      }]);
      getPostbyjobid(job_id);
      getImgbyjobid(user_id);
      console.log("candidatesbyId",candidatesbyjobId);
    });

    console.log("ApplicationsbyJobId:", applicationsbyJobId);
  };

  const processEvaluatedApplications = () => {
    evaluatedApplication.forEach(app => {
      const { _id,job_id, user_id, user_name, user_email } = app;
      setEvaluatedCandidates(prevState => [...prevState, {
        _id,
        job_id,
        user_id,
        username: user_name,
        email: user_email,
        image: '', // initial placeholder value
        position: '' // initial placeholder value
      }]);
      EvaluatedgetPost(job_id);
      EvaluatedgetImg(user_id);

    });
  };
  

  const createEvaluation = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/evaluation/createevaluation",
        data
      );
      if (response.data.error) {
        console.error("Error in creating Evaluations");
        toast.error("System Error");
      } else {
          clear();
        console.log("Evaluations Created Successfully");
        toast.success("Successfully submitted.");
        updateIsEvaluated(selected._id);
        console.log(data);

        setshowDetails(false);setShowApprovedjobPosting(true);
      }
    } catch (error) {
      console.error(error);
      toast.error("All fields must be filled.");
      console.log(data);
    }
  };

  const updateEvaluation = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/evaluation/updateevaluation/${existEvolution._id}`,
        data
      );
      if (response.data.error) {
        console.error("Error in updating Evaluations");
        toast.error("System Error");
      } else {
        clear();
        console.log("Evaluations Updated Successfully");
        toast.success("Successfully updated.");
        updateIsEvaluated(selected._id);
        setshowDetails(false);setShowApprovedjobPosting(true);
        
        
      }
    } catch (error) {
      console.error("Error updating evaluation:", error);
      toast.error("All fields must be filled.");
    }
  };

  const updateIsEvaluated = async (application_id) => {
    if(!application_id) {
      console.error("Application ID is missing");
      return;
    }
      try{
        const response = await axios.put(`http://localhost:8000/evaluation/updateIsEvaluated/${application_id}`);
        if(response.data.error){
          console.error("Error in updating isEvaluated");
          
        }else{
          console.log("isEvaluated Updated Successfully");
        }
      }
      catch(error){
        console.error(error);
      }
    }

    const getEvaluatedApplications = async ()=>{
      
      try{
         const response = await axios.get('/evaluation/getEvaluatedApplications');
         setEvaluatedApplication(response.data.applications);
       } catch (error) {
         console.error('Error fetching applications:', error);
       }
    }

  const clear = () => {
    setData({
      candidatename: "",
      candidateid: "",
      candidateemail: "",
      position:"",
      job_id:"",
      interviewername: "",
      interviewerid: "",
      problemsolution: 0,
      languageproficiency: 0,
      interviewercomments: "",
      addcomment: 0,
      collaboration: 0,
      adoptability: 0,
      decisionmaking: 0,
      leadership: 0,
      clarity: 0,
      activelistening: 0,
      empathy: 0,
      presentationskills: 0,
      technical: 0,
      cultural: 0,
      communication: 0,
      overallcomment: "",
    });
  };

  const getapprovedjobpostings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/evaluation/approvedjobPosting"
      );
      setApprovedjobPosting(response.data);
    } catch (error) {
      console.error("Can't get approved job postings", error);
    }
  };

  useEffect(() => {
    const fetchEvaluation = async () => {
      if (showDetails && selected) {
        try {
          console.log("Fetching evaluation for candidate ID:", selected.user_id);
          // Include the position in the query string
          const response = await axios.get(
            `http://localhost:8000/evaluation?candidateid=${selected.user_id}&position=${encodeURIComponent(selected.position)}`
          );
    
          if (response.data) {
            setexistEvolution(response.data);
            setData(response.data);
          }
    
          setisexistevaluation(true);
        } catch (error) {
          console.error(error);
          clear();
          if (showDetails && selected) {
            setData((prevState) => ({
              ...prevState,
              job_id: selected.job_id,
              candidatename: selected.username,
              candidateid: selected.user_id,
              candidateemail: selected.email,
              position: selected.position,
              interviewername: user.fname,
              interviewerid: user._id,
            }));
            console.log("interviewername", data.interviewername);
          }
    
          setisexistevaluation(false);
        }
      }
    };

    if (showDetails && selected) {
      setData((prevState) => ({
        ...prevState,
        job_id: selected.job_id,
        candidatename: selected.username,
        candidateid: selected.user_id,
        candidateemail: selected.email,
        position:selected.position,
        interviewername: user.fname,
        interviewerid: user._id,
      }));
      console.log("interviewername",data.interviewername);
    }

    fetchEvaluation();

     
    

  }, [showDetails, selected,application,applicationsbyJobId,evaluatedApplication,checkedEvaluationsbyId]);

  const getCandidatesbyJobId= (job_id)=>{
    setApplicationsbyJobId( application.filter((application)=>application.job_id===job_id));
  }
  

  useEffect(() => {
    if(showEvaluated){
      getEvaluatedApplications();
      clearCandidates();
    
    }else{
     
    getApplications();
    clearEvaluatedCandidates();
    }
  }, [showEvaluated]); // Empty dependency array means it runs once on mount

useEffect(() => {
  processApplications();
 
},[application]);

useEffect(()=>{
  processApplicationsbyjobId();
},[applicationsbyJobId]);

useEffect(()=>{
  processEvaluatedApplications();
},[evaluatedApplication]);

useEffect(() => {
  processcheckedCandidatesByJobId();
}, [checkedEvaluationsbyId]);


useEffect(()=>{
 console.log('evaluatedApplication',evaluatedApplication);
},[showEvaluated])
 

// useEffect(() => { 
//   console.log('Candidate',candidates);
// }
// ,[candidates]);

// useEffect(() => {
//   console.log('Evaluated Candidate',evaluatedCandidates);
// },[evaluatedCandidates]);
// useEffect(() => { 
//   console.log(data);
// }
// ,[data]);
useEffect(() => {
  getapprovedjobpostings();
}, []);


const applicationclearandget=()=>{
  clearCandidates();
  getApplications();
}

  return (
    <div className="overflow-hidden">
      <div className="flex w-screen">
        <div className="fixed">
          <InterviewNav />
        </div>

        <div className="w-screen lg:ml-[320px] md:ml-72 ml-[260px] overflow-hidden">
          <Topbar
            msg="Interview Feedback"
            name="Piyushan"
            post="Hiring Manager"
          />
          
        {showApprovedjobPosting?(
          <div
            className={`content  text-white flex flex-row p-[0px]    m-[30px]  h-fit rounded-[30px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  ${
              showDetails === false ? " justify-center h-[85vh] " : null
            }`}
            // bg-[#212121]
          >
            <button
              className="absolute right-[60px] top-[120px] p-[10px] rounded-[10px]  border-[#EA7122] border-[5px] border-[solid] w-[220px]"
              onClick={() => {
                setShowallCandidates(true);
                setShowApprovedjobPosting(false);
                

              }}
            >
              View All Candidates
            </button>
            <div className="candidates  flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px]  sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]">
              <p className="text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]">
                Job Postings
              </p>
              {/* <PostTag></PostTag> */}
              <div
                className={`max-h-[220vh] flex justify-center overflow-y-auto ${
                  showDetails === false ? "w-[600px] max-h-[75vh]" : null
                }`}
              >
                <div className="h-[75vh] overflow-auto overflow-x-hidden">
                  <div>
                    {approvedjobPosting.map((job, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setShowApprovedjobPosting(false);
                          setShowallCandidates(false);
                          clearcandiatesbyjobid();
                          getCandidatesbyJobId(job._id);
                          clearcheckedcandiatesbyJobId();
                          getcheckedEvaluatuonsbyId(job._id);
                          setJobID(job._id);
                          
                        }}
                        className="hover:scale-105 accLabel  my-[5px]  flex flex-row   bg-[#2b2b2b]  items-center   rounded-[30px]   esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]    lg:rounded-[25px]  lg:gap-[12px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] lg:w-[500px]  m-[30px]"
                      >
                        <div className="flex flex-row  esm:w-[90px]  450px:w-[120px]   sm:w-[160px] lg:w-[480px] items-center justify-around ">
                          <IoBagHandleSharp className="w-[30px] h-[30px]"></IoBagHandleSharp>
                          <p className="name text-left text-[#ffffff] mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem] w-[200px]">
                            {job.jobTitle}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>):showallCandidates?(
            
            <div
            className={`content  text-white flex flex-row p-[0px]  h-[85vh]  m-[30px]  rounded-[30px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  ${
              showDetails === false ? " justify-center h-[85vh] " : null
            }`}  
            // bg-[#212121]
          >
        {!showDetails ? (
              <button
                className="absolute left-[360px] top-[120px] p-[10px] rounded-[10px] border-[#EA7122] border-[5px] border-[solid] w-[220px]"
                onClick={() => {
                  setShowApprovedjobPosting(true);
                  setShowallCandidates(false);
                  setCandidate([]);
                }}
              >
                Show Job Postings
              </button>
            ) : null}
     {!showDetails ? (<div>{!showEvaluated ? ( <button className="absolute right-[60px] top-[120px] p-[10px] rounded-[10px] border-[#EA7122] border-[5px] border-[solid] w-[220px]" onClick={setshowEvaluatedtrue}>Show Evaluated Cadidates</button>):( <button className="absolute right-[60px] top-[120px] p-[10px] rounded-[10px] border-[#EA7122] border-[5px] border-[solid] w-[220px]" onClick={setshowEvaluatedfalse}>Show Interviewing Cadidates</button>)} </div>):(<IoChevronBackCircle  onClick={()=>{setshowDetails(false)}}  className="absolute right-[60px] top-[120px] w-[50px] h-[50px] text-[#EA7122]" />)}     
          
          <div
            className={`candidates flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] rounded-tr-[0px] rounded-br-[0px] esm:p-[10px] 450px:p-[15px] sm:p-[25px] sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]`}
          >
            <p className="text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]">
               Candidates
            </p>
            <div
              className={`max-h-[100vh] flex justify-center overflow-y-auto ${
                showDetails === false ? "w-[600px]" : null
              }`}
            >
              <div>

              {showEvaluated ? (<div>{evaluatedCandidates.map((candidate,index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setshowDetails(true);
                      setselected(candidate);
                     
                    }}
                    className={`hover:scale-110 accLabel m-[10px] my-[5px] flex flex-row bg-[#2b2b2b] sm:pl-[5px] items-center rounded-[30px] esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]  lg:rounded-[25px] lg:gap-[12px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] ${
                      showDetails === false ? "lg:w-[500px] justify-between hover:scale-105" : null
                    }`}
                  >
                    <div
                      className={`${
                        showDetails === false ? "flex justify-evenly gap-[12px]" : "flex flex-row gap-[12px] justify-start"
                      }`}
                    >
                      <img
                        src={candidate.image}
                        alt=""
                        className="userImg rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px] 450px:w-[30px] 450px:h-[30px] sm:w-[35px] sm:h-[35px] border-[1.5px] lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
                      />
                      <div className="block">
                        <p className="name text-left text-[#ffffff] mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem] 320px:text-[0.5rem]">
                          {candidate.username}
                        </p>
                        <p className="post text-left text-[#ffffff] opacity-[30%] mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem] 320px:text-[0.5rem]">
                          {candidate.position}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`post ${
                        showDetails === false ? "block" : "hidden"
                      } mr-[60px] text-[#ffffff] opacity-[30%] mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem] 320px:text-[0.5rem]`}
                    >
                       {candidate.email}
                    </p>
                  </button>
                ))}</div>):(<div> {candidates.map((candidate,index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setshowDetails(true);
                      setselected(candidate);
                     
                    }}
                    className={`hover:scale-110 accLabel m-[10px] my-[5px] flex flex-row bg-[#2b2b2b] sm:pl-[5px] items-center rounded-[30px] esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]  lg:rounded-[25px] lg:gap-[12px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] ${
                      showDetails === false ? "lg:w-[500px] justify-between hover:scale-105" : null
                    }`}
                  >
                    <div
                      className={`${
                        showDetails === false ? "flex justify-evenly gap-[12px]" : "flex flex-row gap-[12px] justify-start"
                      }`}
                    >
                      <img
                        src={candidate.image}
                        alt=""
                        className="userImg rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px] 450px:w-[30px] 450px:h-[30px] sm:w-[35px] sm:h-[35px] border-[1.5px] lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
                      />
                      <div className="block">
                        <p className="name text-left text-[#ffffff] mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem] 320px:text-[0.5rem]">
                          {candidate.username}
                        </p>
                        <p className="post text-left text-[#ffffff] opacity-[30%] mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem] 320px:text-[0.5rem]">
                          {candidate.position}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`post ${
                        showDetails === false ? "block" : "hidden"
                      } mr-[60px] text-[#ffffff] opacity-[30%] mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem] 320px:text-[0.5rem]`}
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
            <div className="description flex flex-col w-full box-border max-h-[800px] overflow-y-auto">
              <div className="flex flex-row py-[20px] justify-center gap-5 border-[grey]  border-b-[2px] ">
                <img
                  src={selected.image}
                  alt=""
                  className=" userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[100px] lg:h-[100px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
                />
                <div className="details flex flex-col justify-evenly w-[250px] ">
                  <p className="text-left">{selected.username}</p>
                  <p className="text-left text-[#ffffff] opacity-[30%] ">
                    {selected.position}
                  </p>
                  <p className="text-left text-[#ffffff] opacity-[30%] ">
                   {selected.email}
                  </p>
                </div>
              </div>
              <div className="">
                <p className="  bg-[#2b2b2b] pl-[20px] py-[15px]">
                  Interview Feedback
                </p>

                <div className="flex esm:flex-col md:flex-row esm:text-center  border-[grey]  border-t-[2px]  ">
                  <div
                    className={`technical esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]`}
                    style={{
                      backgroundColor:
                        feedbackTab === 0 ? "#1a1919" : "#1f1f1f",
                    }}
                    onClick={() => handleClick(0)}
                  >
                    <p>Technical</p>
                  </div>
                  <div
                    className="cultural esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]"
                    style={{
                      backgroundColor:
                        feedbackTab === 1 ? "#1a1919" : "#1f1f1f",
                    }}
                    onClick={() => handleClick(1)}
                  >
                    <p>Culturel Fit</p>
                  </div>
                  <div
                    className="communication esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]"
                    style={{
                      backgroundColor:
                        feedbackTab === 2 ? "#1a1919" : "#1f1f1f",
                    }}
                    onClick={() => handleClick(2)}
                  >
                    <p>Communication</p>
                  </div>
                  <div
                    className="overall 450px:p-[10px] esm:p-[5px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]"
                    style={{
                      backgroundColor:
                        feedbackTab === 3 ? "#1a1919" : "#1f1f1f",
                    }}
                    onClick={() => handleClick(3)}
                  >
                    <p>Overall</p>
                  </div>
                </div>

                <div
                  className={` flex flex-col py-[50px]  bg-[#1a1919]   ${
                    feedbackTab === 1 ? "block" : "hidden"
                  } `}
                >
                  <div className="flex flex-col justify-center gap-48  md:flex-row  pb-[10px]">
                    <div className="flex flex-col mb-[20px]">
                      <PieCharts percentage={data.addcomment}></PieCharts>
                      <input
                        type="number"
                        value={data.addcomment}
                        onChange={handleInputChange}
                        name="addcomment"
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Add Comment</p>
                    </div>
                    <div className="flex flex-col mb-[20px]">
                      <PieCharts percentage={data.collaboration}></PieCharts>
                      <input
                        type="number"
                        value={data.collaboration}
                        name="collaboration"
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">
                        Effective Collaboration
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-around">
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts percentage={data.adoptability}></PieCharts>
                      <input
                        type="number"
                        name="adoptability"
                        value={data.adoptability}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Adoptability</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts percentage={data.decisionmaking}></PieCharts>
                      <input
                        type="number"
                        name="decisionmaking"
                        value={data.decisionmaking}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Decision Making</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts percentage={data.leadership}></PieCharts>
                      <input
                        type="number"
                        name="leadership"
                        value={data.leadership}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Leadership Style</p>
                    </div>
                  </div>

                  <div className="flex flex-raw  justify-center">
                    <button
                      type="submit"
                      onClick={clear}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      Clear
                    </button>

                    <button
                      type="submit"
                      onClick={() => handleClick(2)}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      next
                    </button>
                  </div>
                </div>

                <div
                  className={`flex flex-col  justify-around  py-[50px] bg-[#1a1919]   ${
                    feedbackTab === 0 ? "block" : "hidden"
                  } `}
                >
                  {" "}
                  <div className="flex flex-row">
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.problemsolution}
                        topic="Problem Solution"
                      ></PieCharts>
                      <input
                        type="number"
                        name="problemsolution"
                        value={data.problemsolution}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Problem Solution</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.languageproficiency}
                        topic="Language Proficiency"
                      ></PieCharts>
                      <input
                        type="number"
                        name="languageproficiency"
                        value={data.languageproficiency}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">
                        Language Proficiency
                      </p>
                    </div>
                  </div>
                  <form>
                    <div>
                      <p className="p-[20px]">Add Comments</p>
                      <div className="p-[20px] m-[20px] rounded-[30px] bg-[#292929]">
                        <textarea
                          name="interviewercomments"
                          value={data.interviewercomments}
                          onChange={(e) => {
                            setData((prevData) => ({
                              ...prevData,
                              interviewercomments: e.target.value,
                            }));
                          }}
                          className="bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] "
                        />
                      </div>
                    </div>
                  </form>
                  <div className="flex flex-raw  justify-center">
                    <button
                      type="submit"
                      onClick={clear}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleClick(1)}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      next
                    </button>
                  </div>
                </div>

                <div
                  className={`flex flex-col   justify-around   py-[50px] bg-[#1a1919] ${
                    feedbackTab === 3 ? "block" : "hidden"
                  }`}
                >
                  <div className="flex flex-row">
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.technical}
                        topic="Technical details"
                      ></PieCharts>
                      <input
                        type="number"
                        name="technical"
                        value={data.technical}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Technical Details</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.cultural}
                        topic="Culteral Fit"
                      ></PieCharts>
                      <input
                        type="number"
                        name="cultural"
                        value={data.cultural}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Culteral Fit </p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.communication}
                        topic="Communication"
                      ></PieCharts>
                      <input
                        type="number"
                        name="communication"
                        value={data.communication}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Communication</p>
                    </div>
                  </div>
                  <form>
                    <div>
                      <p className="p-[20px]">Additional Notes</p>
                      <div className="p-[20px] m-[20px] rounded-[30px] bg-[#292929]">
                        <textarea
                          name="overallcomment"
                          value={data.overallcomment}
                          onChange={(e) => {
                            setData((prevData) => ({
                              ...prevData,
                              overallcomment: e.target.value,
                            }));
                          }}
                          id=""
                          className="bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] "
                        />
                      </div>
                    </div>
                  </form>
                  <div className="flex flex-raw  justify-center">
                    <button
                      type="submit"
                      onClick={clear}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      Clear
                    </button>
                    {/* <button type='submit' onClick={createEvaluation} className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">submit</button> */}

                    {isexistevaluation === true ? (
                      <button
                        type="submit"
                        onClick={updateEvaluation}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px]"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        type="submit"
                        onClick={createEvaluation}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px]"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>

                <div
                  className={`flex flex-col  py-[50px] bg-[#1a1919]   ${
                    feedbackTab === 2 ? "block" : "hidden"
                  } `}
                >
                  <div className="flex flex-col  md:flex-row justify-around">
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.clarity}
                        topic="Clarity"
                      ></PieCharts>
                      <input
                        type="number"
                        name="clarity"
                        value={data.clarity}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Clarity</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.activelistening}
                        topic="Active listening"
                      ></PieCharts>
                      <input
                        type="number"
                        name="activelistening"
                        value={data.activelistening}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Active listening</p>
                    </div>

                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.empathy}
                        topic="Empathy"
                      ></PieCharts>
                      <input
                        type="number"
                        name="empathy"
                        value={data.empathy}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Empathy</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.presentationskills}
                        topic="Presentation Skill"
                      ></PieCharts>
                      <input
                        type="number"
                        name="presentationskills"
                        value={data.presentationskills}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Presenation Skill</p>
                    </div>
                  </div>

                  <div className="flex flex-raw  justify-center">
                    <button
                      type="submit"
                      onClick={clear}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleClick(3)}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      next
                    </button>
                  </div>
                </div>
                <div></div>

                <br />  
                
              </div>
            </div>
          ) : null}
            
          </div>):applicationsbyJobId.length === 0 ?(
            <div className=" ">
            {!showDetails ? (    <div>
            <button
              className="absolute left-[360px] top-[120px] p-[10px] rounded-[10px] border-[#EA7122] border-[5px] border-[solid] w-[220px]"
              onClick={() => {
                setShowApprovedjobPosting(true);
                setClicked(false);
                setcheckedfalse();
                
              }}
            >
              Show Job Postings
            </button>
             {!checked ? (
                  <button
                    className="absolute right-[60px] top-[120px] py-[10px] rounded-[10px] border-[#EA7122] border-[5px] border-[solid]  w-[220px]"
                    onClick={() => {
                      setcheckedtrue();
                      setClicked(true);
                      applicationclearandget();
                      setshowEvaluatedtrue();
                    }}
                  >
                    Show Evaluated Candidates
                  </button>
                ) : (
                  <button
                    className="absolute right-[60px] top-[120px] py-[10px] rounded-[10px] border-[#EA7122] border-[5px] border-[solid]  w-[220px]"
                    onClick={() => {
                      setcheckedfalse();
                      setClicked(false);
                      applicationclearandget();
                      setshowEvaluatedfalse();

                    }}
                  >
                    Show Interview Candidates
                  </button>
                )} </div>):(<IoChevronBackCircle
          onClick={() => {
            setshowDetails(false);
          }}
          className="absolute right-[60px] top-[120px] w-[50px] h-[50px] text-[#EA7122]"
        />)} 
                {!clicked ? ( <p className="my-[45vh] text-[#a3a3a3] text-center text-[28px] ">
              No Candidate Found to Evaluate
            </p>):( 
              <div
            className={`content  text-white flex flex-row p-[0px]    m-[30px]  h-fit rounded-[30px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  ${
              showDetails === false ? " justify-center h-[85vh] " : null
            }`}
          >
            
            {checkedCandiatesByJobId.length === 0 ? (<p className="absolute top-[50%] left-[50%] text-[#a3a3a3] text-center text-[28px] ">
              No Evaluated Candidate Found 
            </p>):( <div className="candidates  flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px]  sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]">
              <p className="text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]">
                Evaluated Candidates
              </p>
              {/* <PostTag></PostTag> */}
              <div
                className={`max-h-[220vh] flex justify-center overflow-y-auto ${
                  showDetails === false ? "w-[600px] max-h-[75vh]" : null
                }`}
              >
                <div className="h-[75vh] overflow-auto overflow-x-hidden">
                  
                    <div>
                      {checkedCandiatesByJobId.map((candidate, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setshowDetails(true);
                            setselected(candidate);
                          }}
                          className={` hover:scale-105 accLabel m-[10px] my-[5px]  flex flex-row   bg-[#2b2b2b] sm:pl-[5px]  items-center   rounded-[30px]  esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]     lg:rounded-[25px]  lg:gap-[12px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] ${
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
                                {candidate.position}
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
                    </div>
                </div>
              </div>
            </div>)}
           

            {showDetails ? (
              <div className="description flex flex-col w-full box-border max-h-[800px] overflow-y-auto">
              <div className="flex flex-row py-[20px] justify-center gap-5 border-[grey]  border-b-[2px] ">
                <img
                  src={selected.image}
                  alt=""
                  className=" userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[100px] lg:h-[100px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
                />
                <div className="details flex flex-col justify-evenly w-[250px] ">
                  <p className="text-left">{selected.username}</p>
                  <p className="text-left text-[#ffffff] opacity-[30%] ">
                    {selected.position}
                  </p>
                  <p className="text-left text-[#ffffff] opacity-[30%] ">
                   {selected.email}
                  </p>
                </div>
              </div>
              <div className="">
                <p className="  bg-[#2b2b2b] pl-[20px] py-[15px]">
                  Interview Feedback
                </p>

                <div className="flex esm:flex-col md:flex-row esm:text-center  border-[grey]  border-t-[2px]  ">
                  <div
                    className={`technical esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]`}
                    style={{
                      backgroundColor:
                        feedbackTab === 0 ? "#1a1919" : "#1f1f1f",
                    }}
                    onClick={() => handleClick(0)}
                  >
                    <p>Technical</p>
                  </div>
                  <div
                    className="cultural esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]"
                    style={{
                      backgroundColor:
                        feedbackTab === 1 ? "#1a1919" : "#1f1f1f",
                    }}
                    onClick={() => handleClick(1)}
                  >
                    <p>Culturel Fit</p>
                  </div>
                  <div
                    className="communication esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]"
                    style={{
                      backgroundColor:
                        feedbackTab === 2 ? "#1a1919" : "#1f1f1f",
                    }}
                    onClick={() => handleClick(2)}
                  >
                    <p>Communication</p>
                  </div>
                  <div
                    className="overall 450px:p-[10px] esm:p-[5px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]"
                    style={{
                      backgroundColor:
                        feedbackTab === 3 ? "#1a1919" : "#1f1f1f",
                    }}
                    onClick={() => handleClick(3)}
                  >
                    <p>Overall</p>
                  </div>
                </div>

                <div
                  className={` flex flex-col py-[50px]  bg-[#1a1919]   ${
                    feedbackTab === 1 ? "block" : "hidden"
                  } `}
                >
                  <div className="flex flex-col justify-center gap-48  md:flex-row  pb-[10px]">
                    <div className="flex flex-col mb-[20px]">
                      <PieCharts percentage={data.addcomment}></PieCharts>
                      <input
                        type="number"
                        value={data.addcomment}
                        onChange={handleInputChange}
                        name="addcomment"
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Add Comment</p>
                    </div>
                    <div className="flex flex-col mb-[20px]">
                      <PieCharts percentage={data.collaboration}></PieCharts>
                      <input
                        type="number"
                        value={data.collaboration}
                        name="collaboration"
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">
                        Effective Collaboration
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-around">
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts percentage={data.adoptability}></PieCharts>
                      <input
                        type="number"
                        name="adoptability"
                        value={data.adoptability}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Adoptability</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts percentage={data.decisionmaking}></PieCharts>
                      <input
                        type="number"
                        name="decisionmaking"
                        value={data.decisionmaking}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Decision Making</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts percentage={data.leadership}></PieCharts>
                      <input
                        type="number"
                        name="leadership"
                        value={data.leadership}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Leadership Style</p>
                    </div>
                  </div>

                  <div className="flex flex-raw  justify-center">
                    <button
                      type="submit"
                      onClick={clear}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      Clear
                    </button>

                    <button
                      type="submit"
                      onClick={() => handleClick(2)}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      next
                    </button>
                  </div>
                </div>

                <div
                  className={`flex flex-col  justify-around  py-[50px] bg-[#1a1919]   ${
                    feedbackTab === 0 ? "block" : "hidden"
                  } `}
                >
                  {" "}
                  <div className="flex flex-row">
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.problemsolution}
                        topic="Problem Solution"
                      ></PieCharts>
                      <input
                        type="number"
                        name="problemsolution"
                        value={data.problemsolution}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Problem Solution</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.languageproficiency}
                        topic="Language Proficiency"
                      ></PieCharts>
                      <input
                        type="number"
                        name="languageproficiency"
                        value={data.languageproficiency}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">
                        Language Proficiency
                      </p>
                    </div>
                  </div>
                  <form>
                    <div>
                      <p className="p-[20px]">Add Comments</p>
                      <div className="p-[20px] m-[20px] rounded-[30px] bg-[#292929]">
                        <textarea
                          name="interviewercomments"
                          value={data.interviewercomments}
                          onChange={(e) => {
                            setData((prevData) => ({
                              ...prevData,
                              interviewercomments: e.target.value,
                            }));
                          }}
                          className="bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] "
                        />
                      </div>
                    </div>
                  </form>
                  <div className="flex flex-raw  justify-center">
                    <button
                      type="submit"
                      onClick={clear}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleClick(1)}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      next
                    </button>
                  </div>
                </div>

                <div
                  className={`flex flex-col   justify-around   py-[50px] bg-[#1a1919] ${
                    feedbackTab === 3 ? "block" : "hidden"
                  }`}
                >
                  <div className="flex flex-row">
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.technical}
                        topic="Technical details"
                      ></PieCharts>
                      <input
                        type="number"
                        name="technical"
                        value={data.technical}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Technical Details</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.cultural}
                        topic="Culteral Fit"
                      ></PieCharts>
                      <input
                        type="number"
                        name="cultural"
                        value={data.cultural}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Culteral Fit </p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.communication}
                        topic="Communication"
                      ></PieCharts>
                      <input
                        type="number"
                        name="communication"
                        value={data.communication}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Communication</p>
                    </div>
                  </div>
                  <form>
                    <div>
                      <p className="p-[20px]">Additional Notes</p>
                      <div className="p-[20px] m-[20px] rounded-[30px] bg-[#292929]">
                        <textarea
                          name="overallcomment"
                          value={data.overallcomment}
                          onChange={(e) => {
                            setData((prevData) => ({
                              ...prevData,
                              overallcomment: e.target.value,
                            }));
                          }}
                          id=""
                          className="bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] "
                        />
                      </div>
                    </div>
                  </form>
                  <div className="flex flex-raw  justify-center">
                    <button
                      type="submit"
                      onClick={clear}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      Clear
                    </button>
                    {/* <button type='submit' onClick={createEvaluation} className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">submit</button> */}

                    {isexistevaluation === true ? (
                      <button
                        type="submit"
                        onClick={(e)=>{updateEvaluation(e);  applicationclearandget();}}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px]"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        type="submit"
                        onClick={(e)=>{createEvaluation(e); applicationclearandget()}}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px]"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>

                <div
                  className={`flex flex-col  py-[50px] bg-[#1a1919]   ${
                    feedbackTab === 2 ? "block" : "hidden"
                  } `}
                >
                  <div className="flex flex-col  md:flex-row justify-around">
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.clarity}
                        topic="Clarity"
                      ></PieCharts>
                      <input
                        type="number"
                        name="clarity"
                        value={data.clarity}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Clarity</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.activelistening}
                        topic="Active listening"
                      ></PieCharts>
                      <input
                        type="number"
                        name="activelistening"
                        value={data.activelistening}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Active listening</p>
                    </div>

                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.empathy}
                        topic="Empathy"
                      ></PieCharts>
                      <input
                        type="number"
                        name="empathy"
                        value={data.empathy}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Empathy</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.presentationskills}
                        topic="Presentation Skill"
                      ></PieCharts>
                      <input
                        type="number"
                        name="presentationskills"
                        value={data.presentationskills}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Presenation Skill</p>
                    </div>
                  </div>

                  <div className="flex flex-raw  justify-center">
                    <button
                      type="submit"
                      onClick={clear}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleClick(3)}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      next
                    </button>
                  </div>
                </div>
                <div></div>

                <br />  
                
              </div>
            </div>
            ) : null}
          </div>)}
           
          </div>):(
             <div
            className={`content  text-white flex flex-row p-[0px]    m-[30px]  h-fit rounded-[30px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  ${
              showDetails === false ? " justify-center h-[85vh] " : null
            }`}
            // bg-[#212121]
          >

          {checked ? (
            <div> <button
              className="absolute left-[360px] top-[120px] p-[10px] rounded-[10px] border-[#EA7122] border-[5px] border-[solid] w-[220px]"
              onClick={() => {
                setShowApprovedjobPosting(true);
                setClicked(false);
                setcheckedfalse();
                applicationclearandget();
                
              }}
            >
              Show Job Postings
            </button>  {!checked ? (
                  <button
                    className="absolute right-[60px] top-[120px] py-[10px] rounded-[10px] border-[#EA7122] border-[5px] border-[solid]  w-[220px]"
                    onClick={() => {
                      setcheckedtrue();
                      setClicked(true);
                      applicationclearandget();
                      getcheckedEvaluatuonsbyId(jobID);setshowEvaluatedtrue();
                    }}
                  >
                    Show Evaluated Candidates
                  </button>
                ) : (
                  <button
                    className="absolute right-[60px] top-[120px] py-[10px] rounded-[10px] border-[#EA7122] border-[5px] border-[solid]  w-[220px]"
                    onClick={() => {
                      setcheckedfalse();
                      setClicked(false);
                      applicationclearandget();
                      getcheckedEvaluatuonsbyId(jobID);
                      setshowEvaluatedfalse();
     
                    }}
                  >
                    Show Interview Candidates
                  </button>
                )}<p className="absolute top-[50%] left-[50%] text-[#a3a3a3] text-center text-[28px] ">
              No Evaluated Candidate Found 
            </p></div>):(<>{!showApprovedjobPosting && !showDetails ? (
              <button
                className="absolute left-[360px] top-[120px] p-[10px] rounded-[10px] border-[#EA7122] border-[5px] border-[solid] w-[220px]"
                onClick={() => {
                  setShowApprovedjobPosting(true);
                  setcheckedfalse();

                }}
              >
                Show Job Postings
              </button>
              
            ) : null}
            {!showDetails ? (
              <div>
                {!checked ? (
                  <button
                    className="absolute right-[60px] top-[120px] p-[10px] rounded-[10px] border-[#EA7122] border-[5px] border-[solid]  w-[220px]"
                    onClick={() => {
                      setcheckedtrue();
                      setClicked(true);
                      applicationclearandget();
                      getcheckedEvaluatuonsbyId(jobID);
                      setshowEvaluatedtrue();
                    }}
                  >
                    Show Evaluated Candidates
                  </button>
                ) : (
                  <button
                    className="absolute right-[60px] top-[120px] p-[10px] rounded-[10px] border-[#EA7122] border-[5px] border-[solid]  w-[220px]"
                    onClick={() => {
                      setcheckedfalse();
                      setClicked(false);
                      applicationclearandget();
                      getcheckedEvaluatuonsbyId(jobID);
                      setshowEvaluatedfalse();
                    }}

                  >
                    Show Interviewing Cadidates
                  </button>
                )}{" "}
              </div>
            ) : (
              <IoChevronBackCircle
                onClick={() => {
                  setshowDetails(false);
                }}
                className="absolute right-[60px] top-[120px] w-[50px] h-[50px] text-[#EA7122]"
              />
            )}
            <div className="candidates  flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px]  sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]">
              <p className="text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]">
                Candidates
              </p>
              {/* <PostTag></PostTag> */}
              <div
                className={`max-h-[220vh] flex justify-center overflow-y-auto ${
                  showDetails === false ? "w-[600px] max-h-[75vh]" : null
                }`}
              >
                <div className="h-[75vh] overflow-auto overflow-x-hidden">
                  {checked ? (
                    <div>
                      {checkedCandiatesByJobId.map((candidate, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setshowDetails(true);
                            setselected(candidate);
                          }}
                          className={` hover:scale-105 accLabel m-[10px] my-[5px]  flex flex-row   bg-[#2b2b2b] sm:pl-[5px]  items-center   rounded-[30px]  esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]     lg:rounded-[25px]  lg:gap-[12px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] ${
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
                    </div>
                  ) : (
                    <div>
                      {candidatesbyjobId.map((candidate, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setshowDetails(true);
                            setselected(candidate);
                          }}
                          className={` hover:scale-105 accLabel m-[10px] my-[5px]  flex flex-row   bg-[#2b2b2b] sm:pl-[5px]  items-center   rounded-[30px]  esm:w-[110px] esm:h-[25px] 450px:w-[140px] 450px:h-[35px]    lg:rounded-[25px]  lg:gap-[12px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content] ${
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
                                {candidate.position}
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
                    </div>
                  )}
                </div>
              </div>
            </div>

            {showDetails ? (
              <div className="description flex flex-col w-full box-border max-h-[800px] overflow-y-auto">
              <div className="flex flex-row py-[20px] justify-center gap-5 border-[grey]  border-b-[2px] ">
                <img
                  src={selected.image}
                  alt=""
                  className=" userImg  rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] esm:w-[20px] esm:h-[20px]  450px:w-[30px] 450px:h-[30px]  sm:w-[35px] sm:h-[35px] border-[1.5px]  lg:w-[100px] lg:h-[100px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] sm:m-1 esm:m-[3px]"
                />
                <div className="details flex flex-col justify-evenly w-[250px] ">
                  <p className="text-left">{selected.username}</p>
                  <p className="text-left text-[#ffffff] opacity-[30%] ">
                    {selected.position}
                  </p>
                  <p className="text-left text-[#ffffff] opacity-[30%] ">
                   {selected.email}
                  </p>
                </div>
              </div>
              <div className="">
                <p className="  bg-[#2b2b2b] pl-[20px] py-[15px]">
                  Interview Feedback
                </p>

                <div className="flex esm:flex-col md:flex-row esm:text-center  border-[grey]  border-t-[2px]  ">
                  <div
                    className={`technical esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]`}
                    style={{
                      backgroundColor:
                        feedbackTab === 0 ? "#1a1919" : "#1f1f1f",
                    }}
                    onClick={() => handleClick(0)}
                  >
                    <p>Technical</p>
                  </div>
                  <div
                    className="cultural esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]"
                    style={{
                      backgroundColor:
                        feedbackTab === 1 ? "#1a1919" : "#1f1f1f",
                    }}
                    onClick={() => handleClick(1)}
                  >
                    <p>Culturel Fit</p>
                  </div>
                  <div
                    className="communication esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]"
                    style={{
                      backgroundColor:
                        feedbackTab === 2 ? "#1a1919" : "#1f1f1f",
                    }}
                    onClick={() => handleClick(2)}
                  >
                    <p>Communication</p>
                  </div>
                  <div
                    className="overall 450px:p-[10px] esm:p-[5px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]"
                    style={{
                      backgroundColor:
                        feedbackTab === 3 ? "#1a1919" : "#1f1f1f",
                    }}
                    onClick={() => handleClick(3)}
                  >
                    <p>Overall</p>
                  </div>
                </div>

                <div
                  className={` flex flex-col py-[50px]  bg-[#1a1919]   ${
                    feedbackTab === 1 ? "block" : "hidden"
                  } `}
                >
                  <div className="flex flex-col justify-center gap-48  md:flex-row  pb-[10px]">
                    <div className="flex flex-col mb-[20px]">
                      <PieCharts percentage={data.addcomment}></PieCharts>
                      <input
                        type="number"
                        value={data.addcomment}
                        onChange={handleInputChange}
                        name="addcomment"
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Add Comment</p>
                    </div>
                    <div className="flex flex-col mb-[20px]">
                      <PieCharts percentage={data.collaboration}></PieCharts>
                      <input
                        type="number"
                        value={data.collaboration}
                        name="collaboration"
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">
                        Effective Collaboration
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row justify-around">
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts percentage={data.adoptability}></PieCharts>
                      <input
                        type="number"
                        name="adoptability"
                        value={data.adoptability}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Adoptability</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts percentage={data.decisionmaking}></PieCharts>
                      <input
                        type="number"
                        name="decisionmaking"
                        value={data.decisionmaking}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Decision Making</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts percentage={data.leadership}></PieCharts>
                      <input
                        type="number"
                        name="leadership"
                        value={data.leadership}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Leadership Style</p>
                    </div>
                  </div>

                  <div className="flex flex-raw  justify-center">
                    <button
                      type="submit"
                      onClick={clear}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      Clear
                    </button>

                    <button
                      type="submit"
                      onClick={() => handleClick(2)}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      next
                    </button>
                  </div>
                </div>

                <div
                  className={`flex flex-col  justify-around  py-[50px] bg-[#1a1919]   ${
                    feedbackTab === 0 ? "block" : "hidden"
                  } `}
                >
                  {" "}
                  <div className="flex flex-row">
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.problemsolution}
                        topic="Problem Solution"
                      ></PieCharts>
                      <input
                        type="number"
                        name="problemsolution"
                        value={data.problemsolution}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Problem Solution</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.languageproficiency}
                        topic="Language Proficiency"
                      ></PieCharts>
                      <input
                        type="number"
                        name="languageproficiency"
                        value={data.languageproficiency}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">
                        Language Proficiency
                      </p>
                    </div>
                  </div>
                  <form>
                    <div>
                      <p className="p-[20px]">Add Comments</p>
                      <div className="p-[20px] m-[20px] rounded-[30px] bg-[#292929]">
                        <textarea
                          name="interviewercomments"
                          value={data.interviewercomments}
                          onChange={(e) => {
                            setData((prevData) => ({
                              ...prevData,
                              interviewercomments: e.target.value,
                            }));
                          }}
                          className="bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] "
                        />
                      </div>
                    </div>
                  </form>
                  <div className="flex flex-raw  justify-center">
                    <button
                      type="submit"
                      onClick={clear}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleClick(1)}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      next
                    </button>
                  </div>
                </div>

                <div
                  className={`flex flex-col   justify-around   py-[50px] bg-[#1a1919] ${
                    feedbackTab === 3 ? "block" : "hidden"
                  }`}
                >
                  <div className="flex flex-row">
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.technical}
                        topic="Technical details"
                      ></PieCharts>
                      <input
                        type="number"
                        name="technical"
                        value={data.technical}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Technical Details</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.cultural}
                        topic="Culteral Fit"
                      ></PieCharts>
                      <input
                        type="number"
                        name="cultural"
                        value={data.cultural}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Culteral Fit </p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.communication}
                        topic="Communication"
                      ></PieCharts>
                      <input
                        type="number"
                        name="communication"
                        value={data.communication}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Communication</p>
                    </div>
                  </div>
                  <form>
                    <div>
                      <p className="p-[20px]">Additional Notes</p>
                      <div className="p-[20px] m-[20px] rounded-[30px] bg-[#292929]">
                        <textarea
                          name="overallcomment"
                          value={data.overallcomment}
                          onChange={(e) => {
                            setData((prevData) => ({
                              ...prevData,
                              overallcomment: e.target.value,
                            }));
                          }}
                          id=""
                          className="bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] "
                        />
                      </div>
                    </div>
                  </form>
                  <div className="flex flex-raw  justify-center">
                    <button
                      type="submit"
                      onClick={clear}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      Clear
                    </button>
                    {/* <button type='submit' onClick={createEvaluation} className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">submit</button> */}

                    {isexistevaluation === true ? (
                      <button
                        type="submit"
                        onClick={(e)=>{updateEvaluation(e);  applicationclearandget();}}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px]"
                      >
                        Update
                      </button>
                    ) : (
                      <button
                        type="submit"
                        onClick={(e)=>{createEvaluation(e);  applicationclearandget();}}
                        className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px]"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>

                <div
                  className={`flex flex-col  py-[50px] bg-[#1a1919]   ${
                    feedbackTab === 2 ? "block" : "hidden"
                  } `}
                >
                  <div className="flex flex-col  md:flex-row justify-around">
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.clarity}
                        topic="Clarity"
                      ></PieCharts>
                      <input
                        type="number"
                        name="clarity"
                        value={data.clarity}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Clarity</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.activelistening}
                        topic="Active listening"
                      ></PieCharts>
                      <input
                        type="number"
                        name="activelistening"
                        value={data.activelistening}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Active listening</p>
                    </div>

                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.empathy}
                        topic="Empathy"
                      ></PieCharts>
                      <input
                        type="number"
                        name="empathy"
                        value={data.empathy}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Empathy</p>
                    </div>
                    <div className="flex flex-col m-auto mb-[20px]">
                      <PieCharts
                        percentage={data.presentationskills}
                        topic="Presentation Skill"
                      ></PieCharts>
                      <input
                        type="number"
                        name="presentationskills"
                        value={data.presentationskills}
                        onChange={handleInputChange}
                        id=""
                        className="border-none w-[40px] text-black text-center font-bold  m-auto bottom-0 flex justify-center rounded-[10px] "
                      />
                      <p className="text-white m-auto">Presenation Skill</p>
                    </div>
                  </div>

                  <div className="flex flex-raw  justify-center">
                    <button
                      type="submit"
                      onClick={clear}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#4a362a] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      onClick={() => handleClick(3)}
                      className="items-center mt-5 esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] "
                    >
                      next
                    </button>
                  </div>
                </div>
                <div></div>

                <br />  
                
              </div>
            </div>
            ) : null}
</>)}


          </div>

             )
          
          }
          
        
        </div>
      </div>
    </div>
  );
}
