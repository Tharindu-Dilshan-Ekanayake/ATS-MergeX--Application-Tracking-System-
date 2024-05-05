import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function ProgressTimeline() {
    let a=4;
  return ( 
    <div className='m-[100px] '>
     
      <Timeline position="right">
        <TimelineItem>
          <TimelineSeparator >
          <TimelineDot className='' style={{ boxShadow: a === 0 || a === 1 || a === 2 || a === 3 ||a ===4 ? '0 0 0 2px #EA7122' : '0 0 0 0 #616161',borderRadius: '50%', backgroundColor: a === 0 || a === 1 || a === 2 || a === 3 ||a ===4 ? '#1a1a1a' : "#616161" }}/>
            <TimelineConnector className='' style={{ backgroundColor: a===1 ||a===2 || a===3 || a===4? '#EA7122':'#616161'}}/>
          </TimelineSeparator> 
          <TimelineContent className='320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]  900px:text-[1.1rem]  1010px:text-[1.2rem] justify-around '  style={{  display:'flex '}}> Invitation Sent  <p className='text-[#ffffff] opacity-[30%]  1010px:mr-[30%] mt-[1px] items-start 320px:text-[0.4rem]  450px:text-[0.6rem] sm:text-[0.7rem]  900px:text-[0.9rem]  1010px:text-[1rem]'>2024-03-21</p></TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className=''  style={{ boxShadow:  a === 1 || a === 2 || a === 3 || a===4? '0 0 0 2px #EA7122' : '0 0 0 0 #616161',borderRadius: '50%', backgroundColor: a === 1 || a === 2 || a === 3 ||a ===4 ? '#1a1a1a' : "#616161"}} />
            <TimelineConnector className='' style={{ backgroundColor: a===2 || a===3 || a===4? '#EA7122':'#616161'}} />
          </TimelineSeparator>
          <TimelineContent className='320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]  900px:text-[1.1rem]  1010px:text-[1.2rem] justify-around' style={{  display:'flex' }}>Follow Up Sent <p className='text-[#616161] 1010px:mr-[30%] mt-[1px] items-start 320px:text-[0.4rem]  450px:text-[0.6rem] sm:text-[0.7rem]  900px:text-[0.9rem]  1010px:text-[1rem]'>2024-03-21</p></TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot className=''  style={{ boxShadow: a === 2 || a === 3 || a===4  ? '0 0 0 2px #EA7122' : '0 0 0 0 #616161',borderRadius: '50%',backgroundColor:  a === 2 || a === 3 ||a ===4 ? '#1a1a1a' : "#616161"}} />
            <TimelineConnector className='' style={{ backgroundColor: a===3 || a===4? '#EA7122':'#616161'}} />
          </TimelineSeparator>
          <TimelineContent className='320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]  900px:text-[1.1rem]  1010px:text-[1.2rem] justify-around' style={{  display:'flex' }}>Interview Sheduled <p className='text-[#616161]  1010px:mr-[30%] mt-[1px] items-start 320px:text-[0.4rem]  450px:text-[0.6rem] sm:text-[0.7rem]  900px:text-[0.9rem]  1010px:text-[1rem]'>2024-03-21</p></TimelineContent>
        </TimelineItem>
         <TimelineItem>
          <TimelineSeparator >
          <TimelineDot className='' style={{ boxShadow: a === 3 ||a ===4 ? '0 0 0 2px #EA7122' : '0 0 0 0 #616161',borderRadius: '50%',backgroundColor: a === 3 ||a ===4 ? '#1a1a1a' : "#616161"}}/>
            <TimelineConnector className=''  style={{ backgroundColor: a===4? '#EA7122':'#616161'}} />
          </TimelineSeparator> 
          <TimelineContent className='320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]  900px:text-[1.1rem]  1010px:text-[1.2rem] justify-around '  style={{  display:'flex '}}> Faced Interview  <p className='text-[#616161] 1010px:mr-[30%] mt-[1px] items-start 320px:text-[0.4rem]  450px:text-[0.6rem] sm:text-[0.7rem]  900px:text-[0.9rem]  1010px:text-[1rem]'>2024-03-21</p></TimelineContent>
        </TimelineItem>
        
        <TimelineItem>
          <TimelineSeparator >
            <TimelineDot className='' style={{ boxShadow:  a===4 ? '0 0 0 2px #EA7122' : '0 0 0 0 #616161',borderRadius: '50%',backgroundColor: a ===4 ? '#1a1a1a' : "#616161"}} />
          </TimelineSeparator>
          <TimelineContent className='320px:text-[0.5rem]  450px:text-[0.8rem] sm:text-[0.9rem]  900px:text-[1.1rem]  1010px:text-[1.2rem] justify-around'  style={{  display:'flex' }}>Waiting For Comments<p className='text-[#616161] 1010px:mr-[30%] mt-[1px] items-start 320px:text-[0.4rem]  450px:text-[0.6rem] sm:text-[0.7rem]  900px:text-[0.9rem]  1010px:text-[1rem]'>2024-03-21</p></TimelineContent>
        </TimelineItem>
       
      </Timeline>

      <style>
                {`
                .css-1ms7hib-MuiTimelineItem-root::before{
                   flex:0;
                }
                

                `}   
                </style>

    </div>
  );
}
