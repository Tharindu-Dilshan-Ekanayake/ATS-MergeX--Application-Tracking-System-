import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Images/Logo';
import Bgg from '../Images/Bgg';
import Userimg from '../Images/user.jpg'

import { IoArrowBackSharp } from "react-icons/io5";

import {toast} from 'react-hot-toast';
import axios from 'axios';

function Forget() {

  const [ setImage] = useState(null);
  const [data, setData] = useState({
      fname: '',
      lname: '',
      email: '',
      phone_number: '',
      role: 'candidate',
      education: 'null',
      bio: 'null',
      dob: '',
      gender: '',
      password: '',
      image: Userimg
  });
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
      
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(reader.result);
        setData({ ...data, [name]: reader.result });
      };
    } else {
      setData({ ...data, [name]: value });
    }
  };
  
  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/register', data);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          fname: '',
          lname: '',
          email: '',
          phone_number: '',
          password: '',
          role: 'candidate',
          education: 'null',
          bio: 'null',
          dob: '',
          gender: '',
          image: Userimg
        });
        toast.success('Registration successful!');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
 
  return (
    <div className='flex h-screen'>

       {/* left Section */}
       <div className='flex justify-center text-center bg-white md:w-3/12 sm:w-auto lg:w-5/12'>
        <div className='absolute items-center my-48 text-center '>
          <Logo className='' />
        </div>
        <div className='opacity-20 blur'>
          <Bgg />
        </div>
      </div>
      
      <div  className='flex h-12 mx-6 my-6 text-left '>
        <Link to='/' className='text-4xl text-white opacity-40'><IoArrowBackSharp /></Link>
        </div>

      {/* right Section */}
      <section className='flex items-center justify-center md:w-screen lg:w-screen '>
      
        <div className='px-4  lg:w-[610px] md:px-12 lg:px-1 md:w-[500px] '>
          <div className=''>
            <form onSubmit={registerUser} className=''>
              <div className='py-2'>
                <h1 className='text-5xl'>Sign up as a candidate </h1>
              </div>
              <div className='pb-4 text-left opacity-30'>
                <h1 className='text-2xl '>It's quick and easy</h1>
              </div>
              <div className='mb-5 opacity-30'>
                <hr className=''></hr>
              </div>
              
              {/* input filed */}
              <div>
              
                <div className=' md:justify-between lg:flex md:flex lg:justify-center sm:block md:w-96 lg:justify-between lg:w-full'>
                  <div>
                    <input className='lg:w-[250px] h-10 text-center rounded-lg bg-[white] bg-opacity-10 md:48 ' placeholder='first name'
                    value = {data.fname}
                    onChange={handleChange}
                    name='fname'
                    ></input>
                  </div>
                  <div className='my-5 sm:my-5 md:my-0 lg:my-0'>
                    <input className='lg:w-[250px] h-10 text-center rounded-lg bg-[white] bg-opacity-10 md:48 lg:ml-auto' placeholder='Middle name'
                    value = {data.lname}
                    onChange={handleChange}
                    name='lname'
                    
                    ></input>
                  </div>
                </div>
                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] lg:justify-between'>
                    <input type='Email' placeholder='Email' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'
                    value={data.email}
                    onChange={handleChange}
                    name='email'
                    ></input>
                </div>

                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] lg:justify-between'>
                    <input type='text' placeholder='Contact Number' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'
                    value={data.phone_number}
                    onChange={handleChange}
                    name='phone_number'
                    ></input>
                </div>

                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] lg:justify-between'>
                    <input type='password' placeholder='New Password' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'
                    value={data.password}
                    onChange={handleChange}
                    name='password'
                    ></input>
                </div>

                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] lg:justify-between'>
                    <input type='password' placeholder='Re-Enter Password' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'></input>
                </div>
                
                <div>
                  <div className='text-left'>
                    <label>Date Of Birth</label>
                  </div>
                  <div className='my-2  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] lg:justify-between'>
                    <input type='date'  className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'
                    value={data.dob}
                    onChange={handleChange}
                    name='dob'
                    ></input>
                  </div>
                </div>

                <div>
                  
                  <div className='text-left'>
                    <label>Gender</label>
                  </div>
                  
                  <div className='my-2  lg:flex  lg:justify-center  justify-between md:items-center md:w-[400px] lg:justify-between px-12 pt-2 md:px-1 text-center  lg:w-[610px] md:block sm:block '>
                  <div>
                                        <select  name='gender' className='lg:w-[150px] h-10 text-left rounded-lg  bg-opacity-10 md:48 optional:bg-[#ffffff21]'
                                        value={data.gender}
                                        onChange={handleChange}
                                        
                                        >
                                          <option value=''className='text-white bg-black bg-opacity-90'>-select-</option>
                                          <option value='male' className='text-white bg-black bg-opacity-90'>Male</option>
                                          <option value='female' className='text-white bg-black bg-opacity-90'>Female</option>
                                          <option value='other' className='text-white bg-black bg-opacity-90'>Other</option>
                                          
                                       
                                        </select>
                                      </div>
                  </div>
                </div>
              
              </div>
              
              
              <div className='pt-10'>
                  
                    <button type='submit' className='w-full h-12 px-12 bg-orange-600 rounded-2xl md:w-auto'>SIGN UP</button>
                  
              </div>
              
            </form>
          </div>
        </div>
      </section>

     
    </div>
  );
}

export default Forget;
