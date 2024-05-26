import React, { useState } from 'react';
import Navbar from '../../Components/hiringManagerComp/Navbar.jsx';
import Topbar from '../../Components/hiringManagerComp/Topbar.jsx'
import PostTag from '../../Components/hiringManagerComp/PostTag.jsx';
import PieCharts from '../../Components/hiringManagerComp/PieCharts.jsx';
import ProgressTimeline from '../../Components/hiringManagerComp/ProgressTimeline.jsx';


export default function InterviewFeedback() {
  const name='Kavindrika Piyushan';
  const post='Hiring Manager';    
  const{jsxNavbar, isOpened}= Navbar({name,post});
  const [feedbackTab,setFeedbackTab]=useState(0);

  const handleClick = (value) => {
    setFeedbackTab(value);
};

  

return (
  <div className='bg-[rgb(26,26,26)] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  '>
      <div className='dashboardCover flex flex-row'>
     {jsxNavbar}
      <div className={` w-[100%] lg:w-[81%] lg:ml-[20%] 2xl:ml-[20%]  xl:w-[100%]   ${
    isOpened ? 'opacity-[30%] 1300px:opacity-[100%]' : 'opacity-[100%]'
  } `}> 
      <Topbar msg='Interview Feedback' name='Piyushan'  post='Hiring Manager' ></Topbar>
      <div className='content text-white flex flex-row p-[0px]  bg-[#2b2b2b] m-[30px]  h-fit rounded-[30px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  '>
        <div className='candidates  flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px]  sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]'>
          <p className='text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]'>Interviewed Candidates</p>
          <PostTag  ></PostTag>
        

        </div>
        <div className='description flex flex-col w-full pt-[20px] box-border'>
             <div className='details  border-[grey]  border-b-[2px] '>
              <p className='p-[20px] pt-0 '>Rasindu Ranavaka</p>
              <p className='p-[20px] pt-0'>Software Engineer</p>
              <p className='p-[20px] pt-0'>Interviewers : W.K.Piyushan</p>
             </div>
             <div className='' >
              
                <p className='pl-[20px] pt-[10px]'>Interview Feedback</p>
              
              <div className='flex esm:flex-col md:flex-row esm:text-center '>
                <div className={`technical esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]`} style={{backgroundColor:feedbackTab === 0  ? '#1a1919':'#1f1f1f'}} onClick={() => handleClick(0)}><p>Technical</p></div>
                <div className="cultural esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]" style={{backgroundColor:feedbackTab === 1  ? '#1a1919':'#1f1f1f'}} onClick={() => handleClick(1)}><p>Culturel Fit</p></div>
                <div className='communication esm:p-[5px] 450px:p-[10px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]' style={{backgroundColor:feedbackTab === 2  ? '#1a1919':'#1f1f1f'}} onClick={() => handleClick(2)}><p>Communication</p></div>
                <div className="overall 450px:p-[10px] esm:p-[5px] sm:p-[15px] w-full m-auto hover:bg-[#1a1919]" style={{backgroundColor:feedbackTab === 3  ? '#1a1919':'#1f1f1f'}} onClick={() => handleClick(3)}><p>Overall</p></div>

              </div>
              
              <div className={` flex flex-col pt-[10px] bg-[#1a1919] xl:pt-[20px] xl:pb-[20px] 2xl:pt-[25px]  ${
      feedbackTab ===1 ? 'block' : 'hidden'
    } `}>
                 
              <div className='flex flex-col  md:flex-row justify-evenly pb-[10px]'>
              <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='65'  topic='Communication'></PieCharts>
              <p className='text-white m-auto'>Problem Solution</p>
              </div>
              <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='65'  topic='Communication'></PieCharts>
              <p className='text-white m-auto'>Effective Collaboration</p>
              </div>
              </div> 

              <div className='flex flex-col md:flex-row justify-around'>
              <div className='flex flex-col m-auto mb-[20px]'> 
              <PieCharts percentage='75' topic='Technical details' ></PieCharts>
              <p className='text-white m-auto'>Adoptability</p>
            </div>
            <div className='flex flex-col m-auto mb-[20px]'> 
              <PieCharts percentage='45' topic='Culteral Fit'></PieCharts>
              <p className='text-white m-auto'>Decision Making</p>
            </div>
            <div className='flex flex-col m-auto mb-[20px]'> 
              <PieCharts percentage='65'  topic='Communication'></PieCharts>
              <p className='text-white m-auto'>Leadership Style</p>
            </div>
              </div>
              
             
              
              </div>

              <div className={`flex flex-col md:flex-row justify-around  pt-[10px] bg-[#1a1919] xl:pt-[20px] xl:pb-[20px] 2xl:pt-[25px] 2xl:pb-[25px]  ${
      feedbackTab ===0 ? 'block' : 'hidden'
    } `}>
               <div className='flex flex-col m-auto mb-[20px]'> 
                <PieCharts percentage='45' topic='Problem Solution' ></PieCharts>
                <p className='text-white m-auto'>Problem Solution</p>
            </div>
            <div className='flex flex-col m-auto mb-[20px]'> 
              <PieCharts percentage='15' topic='Language Proficiency'></PieCharts>
              <p className='text-white m-auto'>Language Proficiency</p>
            </div> 
              
              </div>

             <div className={`flex flex-col  md:flex-row esm:flex-col md:flex-row justify-around  pt-[10px] bg-[#1a1919] xl:pt-[20px] xl:pb-[20px] 2xl:pt-[25px] 2xl:pb-[25px]  ${
      feedbackTab ===3 ? 'block' : 'hidden'
    }`}>
            <div className='flex flex-col m-auto mb-[20px]'> 
            <PieCharts percentage='75' topic='Technical details' ></PieCharts>
            <p className='text-white m-auto'>Technical Details</p>
            </div> 
            <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='45' topic='Culteral Fit'></PieCharts>
            <p className='text-white m-auto'>Culteral Fit </p>
            </div>
            <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='65'  topic='Communication'></PieCharts>
              <p className='text-white m-auto'>Communication</p>
              </div>
              </div>
              <div className={`flex flex-col  pt-[10px] bg-[#1a1919] xl:pt-[20px] xl:pb-[20px] 2xl:pt-[25px] 2xl:pb-[25px]  ${
      feedbackTab ===2 ? 'block' : 'hidden'
    } `}>
                 
              <div className='flex flex-col  md:flex-row justify-around'>
              <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='65'  topic='Clarity'></PieCharts>
              <p className='text-white m-auto'>Clarity</p>
              </div> 
              <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='65'  topic='Active listening'></PieCharts>
              <p className='text-white m-auto'>Active listening</p>
              </div>
             
              <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='75' topic='Empathy' ></PieCharts>
              <p className='text-white m-auto'>Empathy</p>
              </div>
              <div className='flex flex-col m-auto mb-[20px]'>
              <PieCharts percentage='45' topic='Presentation Skill'></PieCharts>
              <p className='text-white m-auto'>Presenation Skill</p>
              </div>
              </div>
              
             
              
              </div>
              <div>

              </div>
           
             <form >
             <div>
              <p className='p-[20px]'>Interview Feedbacks</p>
              <div className='p-[20px] m-[20px] rounded-[30px] bg-[#292929]'>
                <textarea  name="" id="" defaultValue='Feedback'  className='bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] '  />
              </div>
             </div>
             <div>
              <p className='p-[20px]'>Recruiter Feedbacks</p>
              <div className='p-[20px] m-[20px] rounded-[30px] bg-[#292929]'>
                <textarea  name="" id="" defaultValue='Feedback'  className='bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] '  />
              </div>
             </div>
             <div>
              <p className='p-[20px]'>Enter Your Comment</p>
              <div className='p-[20px] m-[20px] rounded-[30px] bg-[#292929]'>
                <textarea  name="" id="" defaultValue='Feedback'  className='bg-[#292929] h-[30vh] w-full border-none outline-none p-[10px] '  />
              </div>
             </div>
             <button type='submit' className="float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">Submit</button>
             </form>
           
           <br />
              
               
          
             </div>
              <ProgressTimeline  ></ProgressTimeline>
        </div>
       
      </div>   
      </div>
      </div>
      
  </div>
)
}
