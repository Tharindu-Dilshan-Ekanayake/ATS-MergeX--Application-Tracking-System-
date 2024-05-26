import React from 'react';
import PostTag from '../../Components/recruitercomp/PostTag';

export default function ApplicationManagement() {
  return (
    <div>
      <div className='w-full bg-[#191919] pl-5 pr-5 pb-5' >
        <div className='w-full bg-[#525252] h-200 rounded-[30px]'>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '25%', borderImage: 'linear-gradient(to bottom, #383838,rgb(56, 56, 56,0)) 1', borderStyle: 'solid', borderWidth: '0px 3px 0px 0px' }}>
              <div className='candidates flex flex-col gap-[10px] bg-[#1E1E1E] esm:p-[10px] 450px:p-[15px] sm:p-[25px] h-[110vh] sm:w-auto 450px:w-[165px] 500px:w-[175px] esm:w-[140px]' style={{ borderTopLeftRadius: '30px', borderBottomRightRadius: '30px', borderBottomLeftRadius:'30px' }}>
              <p className='text-center text-[#FFFFFF]' style={{ width: '100%', backgroundColor: '#1E1E1E', padding: '5px' }}>Short List</p>
               <div style={{paddingTop:'20px'}}>
                <SinglePosition position='Software Engineer' time='5' applications='10' />
               </div>
              </div>
            </div>

            <div style={{ width: '25%', borderImage: 'linear-gradient(to bottom, #383838,rgb(56, 56, 56,0)) 1', borderStyle: 'solid', borderWidth: '0px 3px 0px 0px' }}>
              <p className='text-center text-[#FFFFFF]' style={{ width: '100%', backgroundColor: '#1E1E1E', padding: '25px' }}>New</p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '1.5em' }}>
                <div style={{ marginBottom: '0.5em' }}><PostTag name='Rasindu' post='Software Engineer' ></PostTag></div>
              </div>
            </div>
            <div style={{ width: '25%', borderImage: 'linear-gradient(to bottom, #383838,rgb(56, 56, 56,0)) 1', borderStyle: 'solid', borderWidth: '0px 3px 0px 0px' }}>
              <p className='text-center text-[#FFFFFF]' style={{ width: '100%', backgroundColor: '#1E1E1E', padding: '25px' }}>Rejected</p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '1.5em' }}>
                <div style={{ marginBottom: '0.5em' }}><PostTag name='Rasindu' post='Software Engineer' ></PostTag></div>
              </div>
            </div>
            <div style={{ width: '25%' }}>
              <p className='text-center text-[#FFFFFF]' style={{ width: '100%', backgroundColor: '#1E1E1E', padding: '25px' , borderTopRightRadius:'30px'}}>Accepted</p>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '1.5em' }}>
                <div style={{ marginBottom: '0.5em' }}><PostTag name='Rasindu' post='Software Engineer' ></PostTag></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SinglePosition({position, time, applications }) {
  return (
    <div style={{ padding: '0.5em',background: 'linear-gradient(to bottom, rgb(0, 0, 0,0.2), rgb(0, 0, 0,0.2) 5%, rgb(217, 217, 217,0) 75%, rgb(217, 217, 217,0) 75%)' }}>
        <div style={{ fontSize: '15px' , color:'white'}}>{position}</div>
  
      <div style={{ width: '100%', display: 'flex', flexDirection:'column' ,alignItems: 'center', justifyContent: 'center', marginTop:'0.8em' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px'}}>{time} days ago</div>
        <div style={{  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color:'white' }}>{applications} applications</div>
      </div>
    </div>
  )
}

