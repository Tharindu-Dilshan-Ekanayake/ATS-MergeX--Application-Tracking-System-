import React from 'react'
import AdminNav from '../../Components/admincomp/AdminNav'
import AccessCompo from '../../Components/admincomp/AccessCompo'

export default function AccessControl() {
  return (
    <div>
       <div>
      <div className='flex'>
        <div>
          <AdminNav/>
        </div>
        <div>
          <div className='mt-2 ml-10 text-left'>
            <h1 className='text-5xl'>Access Control</h1>
          </div>
          <div className='mt-12'> 
            <AccessCompo/>
          </div>
         
        </div>
      </div>
    </div>
    </div>
  )
}
