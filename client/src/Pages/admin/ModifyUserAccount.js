import React  from 'react';
import AdminNav from '../../Components/admincomp/AdminNav';
import GetModify from '../../Components/admincomp/GetModify';




export default function ModifyUserAccount() {


  

  

  return (
    <div>
      <div className='flex '>
        <div>
          <AdminNav />
        </div>
        <div className='w-screen'>
          
          <div className='flex pt-8 pb-8 pl-5'>
                <div className=''>
                  <h1 className='text-4xl'>Modify User Account</h1>
                </div>
                
                <div>
                  <h1>hi</h1>
                </div>
          </div>
          <div className='mx-[70px] bg-gradient-to-b from-[#272727] to-[#17171A] rounded-[30px] h-[780px] '>

            
           
            <div>
              <GetModify/>
            </div>
            
          </div>
          
        </div>
        
      </div>
    </div>
  );
}