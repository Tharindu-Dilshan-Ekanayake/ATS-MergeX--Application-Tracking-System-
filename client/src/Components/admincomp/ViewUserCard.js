import React from 'react';
import { IoMdClose } from "react-icons/io";

export default function ViewUserCard({ visible, onClose, user }) {
  if (!visible || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
      <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[800px] w-[500px] border-orange-700 border-[1px]  ">
       
        <button
          className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
          onClick={onClose}
        >
         <label className='text-white hover:text-red-700'><IoMdClose className='' /></label> 
        </button>

        

        <div className='flex justify-center mx-auto'>
          <img src={user.image} className="size-[250px] rounded-full border-white border-[3px]" alt={`${user.fname} ${user.lname}`} />
        </div>

        <div className='bg-[#2a2a2a]   mt-[-100px] rounded-3xl pt-[100px]'>
          <div className='pt-4'>
            <h1 className="text-2xl">{user.fname} {user.lname}</h1>
            <h1 className='opacity-30'>{user.role}</h1>

            <div className='pt-3'>
              {user.role === 'candidate' && (
                <div>
                  <div>
                    <h1 className='opacity-30'>Bio</h1>
                  </div>
                  <div>
                    <p>{user.bio}</p>
                  </div>
                </div>
              )}
            </div>

           
            <div className='pt-2'>
            {user.role === 'candidate' && (
              
              <div>
                <div>
                  <h1 className='opacity-30'>Education</h1>
                </div>
                <div>
                  <p>
                    {user.education}
                  </p>
                </div>
              </div>
            )}
            </div>

            <div className='pt-4 pl-6 text-start'>
              
              <div>
                <div className='flex'>
                  <h1 className='opacity-50'>ID : </h1>
                  <h1 className='ml-2 text-orange-500'>{user._id}</h1>
                </div>
                
                <div className='flex'>
                  <h1 className='opacity-50'>Birthday : </h1>
                  <h1 className='ml-2'>{user.dob}</h1>
                </div>

                <div className='flex'>
                  <h1 className='opacity-50'>Gender : </h1>
                  <h1 className='ml-2'>{user.gender}</h1>
                </div>
          
              </div>
              
              <div className='pt-4 pb-12 '>
                <div>
                  <h1 className='opacity-30'>Contact details</h1>
                </div>

                <div className='flex justify-center'>
                  <div >
                    <div className='flex'>
                      <p>Email : </p> <p className='ml-2 text-orange-500'>{user.email}</p>
                    </div>
                    <div className='flex'>
                      <p>Phone Number : </p> <p className='ml-2 text-orange-500'> {user.phone_number}</p>
                    </div>
                  </div>
                </div>

                
              </div>

               
            </div>

            
          </div>
          
        </div>
        
        
      </div>
    </div>
  );
}