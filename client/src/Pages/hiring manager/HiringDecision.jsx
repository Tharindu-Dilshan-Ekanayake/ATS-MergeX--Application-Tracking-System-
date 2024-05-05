import React from 'react';
import Navbar from '../../Components/hiringManagerComp/Navbar.jsx';
import Topbar from '../../Components/hiringManagerComp/Topbar.jsx';
import PostTag from '../../Components/hiringManagerComp/PostTag.jsx';
import ProgressLine from '../../Components/hiringManagerComp/ProgressLine.jsx';

export default function HiringDecision() {
  const name='Kavindrika Piyushan';
  const post='Hiring Manager';    
  const{jsxNavbar, isOpened}= Navbar({name,post});

  

return (
  <div className='bg-[rgb(26,26,26)]'>
      <div className='dashboardCover flex flex-row'>
     {jsxNavbar}
      <div className={` w-[100%] lg:w-[81%] lg:ml-[20%] 2xl:ml-[20%]  xl:w-[100%]   ${
    isOpened ? 'opacity-[30%] 1300px:opacity-[100%]' : 'opacity-[100%]'
  } `}> 
      <Topbar msg='Hiring Decision' name='Piyushan'  post='Hiring Manager' ></Topbar>
      <div className='content text-white flex flex-row p-[0px]  bg-[#2b2b2b] m-[30px]  h-fit rounded-[30px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  '>
        <div className='candidates 
        
         flex flex-col gap-[10px] bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px]  sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]'>
          <p className='text-center text-[#FFFFFF] esm:p-[4px] 450px:p-[6px] sm:p-[10px] font-general-sans pt-[0px]'>Interviewed Candidates</p>
          <PostTag  ></PostTag>
          

        </div>
        <div className='description flex flex-col w-full pt-[20px] box-border'>
             <div className='details  border-[grey]  border-b-[2px] '>
              <p className='p-[20px] pt-0 '>Rasindu Ranavaka</p>
              <p className='p-[20px] pt-0'>Software Engineer</p>
              <p className='p-[20px] pt-0'>Interviewers : W.K.Piyushan</p>
             </div>
         
                <p className='pl-[20px] pt-[10px]'>Top Strength</p>
              

              <div className='flex flex-row justify-around mt-[15px] mb-[15px]'>
                <div className='pt-[15px] pb-[15px] pl-[25px] pr-[25px]  text-[#575757] rounded-[20px] bg-[#1E1E1E]'>Adoptability</div>
                <div className='pt-[15px] pb-[15px] pl-[25px] pr-[25px]  text-[#575757] rounded-[20px] bg-[#1E1E1E]'>Leadership</div>
                <div className='pt-[15px] pb-[15px] pl-[25px] pr-[25px]  text-[#575757] rounded-[20px] bg-[#1E1E1E]'>Self Confidence</div>

              </div>
              <p className='pl-[20px] pt-[10px]'>Requirements to be considered</p>
           <div className='mb-[35px]'>
           <div className='mb-[35px]'>
                <div className='pl-[40px] pr-[40px]'>
              <div className=''>
              <p className='text-[0.9rem] mt-[20px] mb-[25px]'>Technical details</p>
               <div className='pl-[80px] pr-[80px]'>
               <ProgressLine progress='80' buffer='60'></ProgressLine>
               </div>
               </div>
              </div>
              <div className='pl-[40px] pr-[40px]'>
              <div className=''>
              <p className='text-[0.9rem] mt-[20px] mb-[25px]'>Cultural Fit</p>
               <div className='pl-[80px] pr-[80px]'>
               <ProgressLine progress='20' buffer='50'></ProgressLine>
               </div>
               </div>
              </div>
              <div className='pl-[40px] pr-[40px]'>
              <div className=''>
              <p className='text-[0.9rem] mt-[20px] mb-[25px]'>Communiaction</p>
               <div className='pl-[80px] pr-[80px]'>
               <ProgressLine progress='50' buffer='85'></ProgressLine>
               </div>
               </div>
              </div>
              </div>
              <div className='flex flex-col gap-[15px] items-center'>
              <button type='submit' className="float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">Reject</button>
              <button type='submit' className="float-right esm:mr-[15%] sm:mr-[7%] md:mr-[6%] 900px:mr-[5%] 1010px:mr-[4%] bg-[#EA7122] esm:w-[50px] esm:h-[15px] 350px:w-[60px] 350px:h-[18px] 500px:w-[80px] 500px:h-[20px] sm:w-[100px] sm:h-[25px] md:w-[110px] md:h-[30px] 1010px:w-[120px] 1010px:h-[32px] 1300px:w-[125px] 1300px:h-[34px] xl:w-[130px] xl:h-[35px] rounded-[30px] ">Hire</button>
              </div>
           </div>
           
          
            
               
          
             </div>
             
        </div>

      </div> 
      </div>
      </div>
      
 
)
}