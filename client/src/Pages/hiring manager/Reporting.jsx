import React, { useState } from 'react';
import Navbar from '../../Components/hiringManagerComp/Navbar.jsx';
import Topbar from '../../Components/hiringManagerComp/Topbar.jsx';
import CardEsm from '../../Components/hiringManagerComp/CardEsm.jsx';
import BarChart from '../../Components/hiringManagerComp/BarCharts.jsx'
import TimelineToHire from '../../Components/hiringManagerComp/TimelineToHire.jsx';
import PiechartWithIcon from '../../Components/hiringManagerComp/PiechartWithIcon.jsx';
import { FaCheckCircle } from "react-icons/fa";
import { AiTwotoneLike } from "react-icons/ai";
import { FaPeopleGroup } from "react-icons/fa6";
import { PiCertificateFill } from "react-icons/pi";
 

export default function Dashboard() {
  
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
        <Topbar msg='Reporting' nameforGreeting='' name='Piyushan'  post='Hiring Manager' ></Topbar>
        <div className='content text-white flex flex-row p-[0px]  bg-[#2b2b2b] m-[30px]  h-fit rounded-[30px] 320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem]  '>
        <div className='  flex flex-col bg-[#1E1E1E] rounded-[30px] esm:p-[10px] 450px:p-[15px] sm:p-[25px]  sm:w-auto 450px:w-[165px] 500px:w-[175px] lg:w-[250px] esm:w-[140px] sm:pl-[0px] sm:pr-[0px]'>
        
          <p className='text-center text-[#FFFFFF]  esm:p-[4px] 450px:p-[6px] sm:p-[10px] sm:pb-[25px] font-general-sans pt-[0px] border-b-[1px] border-[solid] border-[#6f6d6d]'> Position </p>
       
          <div className='p-[10px] text-center text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem] hover:border-[1px] border-[solid] border-[grey] hover:bg-[#2b2b2b] '>Software Engineer</div>
          <div className='p-[10px] text-center text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem] hover:border-[1px] border-[solid] border-[grey] hover:bg-[#2b2b2b]'>Quality Assurance </div>
          <div className='p-[10px] text-center text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]  hover:border-[1px] border-[solid] border-[grey] hover:bg-[#2b2b2b]'> Backend dev</div>
          <div className='p-[10px] text-center text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]  hover:border-[1px] border-[solid] border-[grey] hover:bg-[#2b2b2b]'> UI Designer</div>
          <div className='p-[10px] text-center text-[0.7rem] lg:text-[1rem]  md:text-[0.9rem] 320px:text-[0.5rem]  hover:border-[1px] border-[solid] border-[grey] hover:bg-[#2b2b2b]'> Project Manager</div>
         </div>

        <div className='description flex flex-col w-full pt-[20px] box-border mb-[20px]'>
             <div className='details flex flex-row justify-around pb-[20px] '>
             <CardEsm name="Hire" val="4 " numSize={'0.8rem'}/>
             <CardEsm name="Applications per hire" val="2 " numSize='20px'/>
             <CardEsm name="Days to hire" val="4 " numSize='20px'/>
             </div>

             <p className='bg-[#242424] pl-[20px] pt-[10px] pb-[10px] rounded-[20px]'>Recruitment Funnel</p>
             
             <div>
           <BarChart></BarChart>
           </div>  
           <p className='bg-[#242424] pl-[20px] pt-[10px] pb-[10px] rounded-[20px]'>Recruitment Timeline(Days to Hire)</p>
           <p className='pl-[20px] pt-[20px] pb-[20px]'>Total days to Hire</p>
       
           <div className='m-auto mt-[40px] mb-[40px]'>
             <TimelineToHire day1='7' day2='5' day3='10' day4='3' day5='8'></TimelineToHire>
           </div>

           <p className='bg-[#242424] pl-[20px] pt-[10px] pb-[10px] rounded-[20px]'>Application Rate Metrics </p>

           <div className='flex flex-row items-center justify-around mt-[20px]'>
           <div className='flex flex-col'>
           <PiechartWithIcon value='70' name='Application Completion Rate ' icon={ AiTwotoneLike }></PiechartWithIcon> 
           <p className='text-white m-auto'>Application Completion Rate </p>
           </div> 
           <div className='flex flex-col'> 
           <PiechartWithIcon value='40' name='Application Completion Rate' icon= { FaCheckCircle } ></PiechartWithIcon>
           <p className='text-white m-auto'>Qulaified Candidate Rate</p>
           </div>
           <div className='flex flex-col'>
           <PiechartWithIcon value='90' name='Application Completion Rate' icon= { FaPeopleGroup } ></PiechartWithIcon>
           <p className='text-white m-auto'>Interview to Offer Rate</p>
           </div>
           <div className='flex flex-col'>
           <PiechartWithIcon value='20' name='Application Completion Rate' icon={ PiCertificateFill } ></PiechartWithIcon>
           <p className='text-white m-auto'>Other Acceptance Rate</p>
           </div>
         
           </div>

            </div>   

          
           
           
          
            
               
          
          
             
             
        </div>
        </div>
        </div>
        
    </div>
  )
}
