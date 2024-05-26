import React, { useState } from 'react';
import axios from 'axios';

import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [data, setData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone_number: '',
    role: '',
    education: '',
    bio: '',
    dob: '',
    gender: '',
    password: '',
    image: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // For input type=file, convert the selected file to base64
    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        console.log(reader.result);
        setData({ ...data, [name]: reader.result });
      };
    } else {
      setData({ ...data, [name]: value });
    }
  };

  //new
  

  //end

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
          role: '',
          education: '',
          bio: '',
          dob: '',
          gender: '',
          image: ''
        });
        toast.success('Registration successful!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div>
    
      <div>
        <div>
          <form onSubmit={registerUser}>
            <div className='pt-12'>
              <input
                type='text'
                name='fname'
                placeholder='First Name'
                className='h-10 text-black rounded-lg w-[200px] pl-3 pr-3'
                value={data.fname}
                onChange={handleChange}
              />
            </div>
            <div className='pt-12'>
              <input
                type='text'
                name='lname'
                placeholder='Last Name'
                className='h-10 text-black rounded-lg w-[200px] pl-3 pr-3'
                value={data.lname}
                onChange={handleChange}
              />
            </div>
            <div className='pt-12'>
              <input
                type='email'
                name='email'
                placeholder='Email'
                className='h-10 text-black rounded-lg w-[200px] pl-3 pr-3'
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div className='pt-12'>
              <input
                type='text'
                name='phone_number'
                placeholder='Phone Number'
                className='h-10 text-black rounded-lg w-[200px] pl-3 pr-3'
                value={data.phone_number}
                onChange={handleChange}
              />
            </div>
            <div className='pt-12'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                className='rounded-lg h-10 w-[200px] pl-3 pr-3 text-black'
                value={data.password}
                onChange={handleChange}
              />
            </div>
            <div className='pt-12'>
              <input
                type='text'
                name='role'
                placeholder='Role'
                className='rounded-lg h-10 w-[200px] pl-3 pr-3 text-black'
                value={data.role}
                onChange={handleChange}
              />
            </div>
            <div className='pt-12'>
              <input
                type='text'
                name='education'
                placeholder='Education'
                className='rounded-lg h-10 w-[200px] pl-3 pr-3 text-black'
                value={data.education}
                onChange={handleChange}
              />
            </div>
            <div className='pt-12'>
              <input
                type='text'
                name='bio'
                placeholder='Bio'
                className='rounded-lg h-10 w-[200px] pl-3 pr-3 text-black'
                value={data.bio}
                onChange={handleChange}
              />
            </div>
            <div className='pt-12'>
              <input
                type='date'
                name='dob'
                placeholder='DOB'
                className='rounded-lg h-10 w-[200px] pl-3 pr-3 text-black'
                value={data.dob}
                onChange={handleChange}
              />
            </div>
            <div>
              <select
                name='gender'
                value={data.gender}
                onChange={handleChange}
                className='h-10 text-black rounded-lg w-[200px] pl-3 pr-3'
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
                <option value='other'>Other</option>
              </select>
            </div>
            <div className='pt-12'>
              <input
                accept='image/*'
                type='file'
                name='image'
                className='rounded-lg h-10 w-[200px] pl-3 pr-3 text-white'
                onChange={handleChange}
              />
            </div>
            <div className='pt-12'>
              <button type='submit' className='bg-green-500 h-10 w-[100px] rounded-xl'>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
