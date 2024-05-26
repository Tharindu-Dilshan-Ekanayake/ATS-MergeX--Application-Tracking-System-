import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Images/Logo';
import Bgg from '../Images/Bgg';
import { MdOutlinePassword } from "react-icons/md";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdOutlineConfirmationNumber } from "react-icons/md";

function ChangePassword() {

    

    const handleButtonClick = () => {
        // Navigate to the '/changepassword' route
       ('/changepassword');
    };
  return (
    <div className='flex h-screen'>
        <div div className='absolute block h-12 mx-6 my-6 '>
        <Link to='/forget' className='text-4xl text-white opacity-40'><IoArrowBackSharp /></Link>
        </div>

      {/* Left Section */}
      <section className='flex md:w-full lg:w-full'>
        <div className='w-full px-4 md:px-12 lg:px-24 my-14'>
          <form className='mx-auto md:w-96 my-36 '>
            <div className='py-2 '>
              <h1 className='text-4xl '>Create new Password</h1>
            </div>
            <div className='pb-4 text-center opacity-30 '>
              <h1 className='text-2xl '>Applicant Tracking System</h1>
            </div>
            <div className='mb-5 opacity-30'>
              <hr className=''></hr>
            </div>
            <div className='grid gap-8 text-black'>
                <div className='px-3 mt-5 text-white '><MdOutlineConfirmationNumber  className='opacity-30'/></div>
              <input type='text' placeholder='Enter verification code' className='absolute w-full rounded-lg bg-[white] bg-opacity-10 text-white h-14 border px-10  md:w-96' />
            </div>

            <div className='flex text-orange-600 pt-7 '>
                <Link to='/forget' className=''>Resend verifiation code</Link>
              </div>
            
            <div className='grid gap-8 pt-6 mt-3 text-black md:w-48'>
                <div className='px-3 mt-5 text-white opacity-30'><MdOutlinePassword /></div>
              <input type='password' placeholder='Enter password' className='w-full rounded-lg bg-[white] bg-opacity-10 text-white h-14 border absolute px-10 md:w-96 lg:border sm:border md:border' />
            </div>
            
            <div className='grid gap-8 pt-2 text-black my-9 md:w-48'>
                <div className='px-3 mt-5 text-white opacity-30'>< MdOutlinePassword/></div>
              <input type='password' placeholder='Re-Enter password' className='w-full rounded-lg bg-[white] bg-opacity-10 text-white h-14 border absolute px-10 md:w-96 lg:border sm:border md:border' />
            </div>
           
            
            
            <div className='pt-10'>
              <button className='w-full h-12 px-12 bg-orange-600 rounded-2xl md:w-auto ' onClick={handleButtonClick}>LOGIN</button>
            </div>
          </form>
        </div>
      </section>

      {/* Right Section */}
      <div className='flex justify-center text-center bg-white md:w-3/12 sm:w-auto lg:w-5/12'>
        <div className='absolute items-center my-48 text-center '>
          <Logo className='' />
        </div>
        <div className='opacity-20 blur'>
          <Bgg />
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
