import React, { useState } from 'react';
import Navbar from '../../Components/hiringManagerComp/Navbar.jsx';
import Topbar from '../../Components/hiringManagerComp/Topbar.jsx';
import CardL from '../../Components/hiringManagerComp/CardL.jsx';
import CardS from '../../Components/hiringManagerComp/CardS.jsx';
import Meeting from '../../Components/hiringManagerComp/Meeting.jsx';
import Jobs from '../../Components/hiringManagerComp/Jobs.jsx';



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
    
        <Topbar msg='Good Morning,' nameforGreeting='Piyushan' name='Piyushan'  post='Hiring Manager' ></Topbar>
        <div className='content text-white p-[30px] bg-[linear-gradient(180deg,_rgba(43,_43,_43,_0.5)_0%,_rgba(43,_43,_43,_0)_100%)] m-[30px] h-screen rounded-[30px] '>
        <div className="card_container mt-[10px] "> 
            <div className="card_container_1 flex gap-[2.2rem] mb-6 justify-between">
                <CardL name="Applications" val="13" />
                <CardL name="Candidates" val="19"/>
                <CardL name="Posted Jobes" val="16"/>
                <CardL name="Unread Message" val="15"/>
            </div>

            <div className="card_container_2 flex gap-10 mb-6 justify-between  sm:ml-[50px] sm:mr-[50px] lg:ml-[100px] lg:mr-[100px] ">
                    
                    <CardS name="New Candidates" val="4 "/>
                    <CardS name="Today's Meetings" val="5"/>
                    <CardS name="Pending jobs" val="3"/>
                    <CardS name="New Applications" val="10"/>
                    
                </div> 

            </div>
            <div className="middle flex 320px:flex-col 900px:max-[]: 900px:flex-row 900px:flex-row pl-[20px] pr-[20px] justify-between bg-transparent">
               
               <div className="meetings scrollable-content mt-8 900px:w-[350px] 900px:h-[275px] 1010px:w-[400px] 1010px:h-[325px] lg:w-[425px] lg:h-[350px] xl:w-[475px] xl:h-[400px] 2xl:w-[550px] 2xl:h-[500px]  overflow-auto bg-[linear-gradient(to_bottom,_#2b2b2b1a_10%,_#1a1a1a_100%)] p-4 rounded-[20px] "> 
                   <h1 className='text-[#ffffff] 320px:text-[0.7rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem] mb-2'>Today's Meeting</h1>
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
           
          
           <div className="Jobs scrollable-content mt-8  1010px:w-[400px] 900px:w-[350px] 900px:h-[275px] 1010px:h-[325px] lg:w-[425px] lg:h-[350px] xl:w-[475px] xl:h-[400px]  2xl:w-[550px] 2xl:h-[500px]  overflow-auto bg-[linear-gradient(to_bottom,_#2b2b2b1a_10%,_#1a1a1a_100%)] p-4 rounded-[20px]">
                   <h1 className='text-[#ffffff]  320px:text-[0.7rem]  450px:text-[0.8rem] sm:text-[0.9rem]   900px:text-[1.1rem]  1010px:text-[1.2rem] mb-2'>Jobs</h1>
                   <Jobs />
                   <Jobs />
                   <Jobs />
                   <Jobs />
                   <Jobs />
                   <Jobs />
                   <Jobs />
                   <Jobs />
                   <Jobs />
                   <Jobs />
                   <Jobs />
                   <Jobs />
                   <Jobs />
                   <Jobs />
               </div>

              
           </div>

        </div>
        </div>
        </div>
        
    </div>
  )
}
