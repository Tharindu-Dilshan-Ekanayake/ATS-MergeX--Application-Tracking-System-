// LoginForm.js
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Images/Logo';
import Bgg from '../Images/Bgg';
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';

function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [data, setData] = useState({
    email: '',
    password: ''
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const response = await axios.post('/login', {
        email,
        password
      });
      const userData = response.data;
      localStorage.setItem("chat-user", JSON.stringify(userData.user));

      if (userData.error) {
        toast.error(userData.error);
      } else {
        setData({ email: '', password: '' }); // Clear input fields
        setUser(userData); // Set user data in context
        const role = userData.user.role; // Extract role from response data
        
        // Redirect based on role
        switch (role) {
          case 'admin':
            navigate('/admindash');
            break;
          case 'recruiter':
            navigate('/recruiterdash');
            break;
          case 'hiring manager':
            navigate('/hiringmanagerdash');
            break;
          case 'interviewer':
             navigate('/interviewerdash');
             break;
          case 'candidate':
            navigate('/candidatedash');
            break;
          default:
            // Handle unrecognized roles or default redirection
            navigate('/defaultdash');
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='flex h-screen'>
      {/* Left Section */}
      <section className='flex md:w-full lg:w-full'>
        <div className='w-full px-4 md:px-12 lg:px-24 my-14 '>
          <form className='mx-auto md:w-96 my-36' onSubmit={loginUser}>
            <div className='py-2'>
              <h1 className='text-6xl'>WELCOME</h1>
            </div>
            <div className='text-center pb-9 opacity-30 '>
              <h1 className='text-3xl '>Applicant Tracking System</h1>
            </div>
            <div className='grid gap-8 text-black'>
                <div className='px-3 mt-5 text-white'><FaRegUser className='opacity-30'/></div>
              <input type='text' placeholder='Enter Email here' className='absolute lg:w-[390px] rounded-lg bg-[white] bg-opacity-10 text-white h-14 border px-10  md:w-96 sm:w-[250px] w-200px' value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })} />
            </div>
            
            <div className='grid gap-8 mt-3 text-black pt-7 md:w-48'>
                <div className='px-3 mt-5 text-white opacity-30'><MdOutlinePassword /></div>
              <input type='password' placeholder='Enter password here' className='lg:w-[390px] rounded-lg bg-[white] bg-opacity-10 text-white h-14 border absolute px-10 md:w-96 lg:border sm:border md:border sm:w-[250px] w-200px' value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })} />
            </div>
            
            <div className='flex pt-5 mt-3 mb-6 text-right'>
              <div className='flex '>
                <input type='checkbox' className='' /><label className='mx-2'> Remember me</label>
              </div>
              <div className='flex ml-auto text-blue-400 '>
                <Link to='/forget' className=''>Forget  password</Link>
              </div>
            </div>
            
            <div className='pt-4 '>
              <button className='h-12 px-12 bg-orange-600 rounded-xl md:w-auto'>LOGIN</button>
            </div>
            <div className='pt-5 my-3 opacity-30'>
              <hr className=''></hr>
            </div>
            <div className='pt-3 opacity-30'>
              <label>Create an account as a candidate</label>
            </div>
            <div className='pt-4'>
            <Link to='/createNewAccount'>
              <button type='submit' className='w-full h-12 px-12 bg-orange-600 rounded-2xl md:w-auto'>Create New Account</button>
            </Link>
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

export default LoginForm;
