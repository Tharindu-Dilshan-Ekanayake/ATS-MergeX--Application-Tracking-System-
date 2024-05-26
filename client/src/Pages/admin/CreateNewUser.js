import React from 'react'
import AdminNav from '../../Components/admincomp/AdminNav'

import CreateUserAccountForm from '../../Components/admincomp/CreateUserAccountForm'



export default function CreateUserAccounts() {


  
  return (
    <div className='flex w-screen '>
      
        <div>
          <AdminNav/>
        </div>
        
        <div className='w-screen '>
          
          
          <div className='flex pt-8 pb-8 pl-5'>
            <div className=''>
              <h1 className='text-4xl'>Create User Account</h1>
            </div>
            
            <div>
              <h1>hi</h1>
            </div>
          </div>
            
          
      <div>
        <CreateUserAccountForm/>
      </div>
         
          
                              
         
                  
                </div>
      
    </div>
  )
}
