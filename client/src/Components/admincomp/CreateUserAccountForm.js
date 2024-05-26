import React, { useState } from 'react'
import axios from 'axios';
import user from '../../Images/user.jpg'
import {toast} from 'react-hot-toast';


export default function CreateUserAccountForm() {

    const [image, setImage] = useState(null);
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
   
    const handleChange = (e) => {
      const { name, value, type, files } = e.target;
   
      if (type === 'file') {
        const file = files[0];
        const reader = new FileReader();
          
          reader.readAsDataURL(file);
          reader.onload = () => {
            console.log(reader.result);
            setImage(reader.result);
            setData({ ...data, [name]: reader.result });
         
          
        }
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
            role: '',
            education: '',
            bio: '',
            dob: '',
            gender: '',
            image: ''
          });
          toast.success('Registration successful!');
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    };
    const clearFields = () => {
        setData({
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
        setImage(null);
      };
   
  return (
    <div>
        <form  onSubmit={registerUser}>
          <div className='  mx-[70px] bg-gradient-to-b from-[#272727] to-[#17171A] rounded-[30px] pt-12'>
            <div className='flex justify-center '>
            
            <div>
              <div className='pt-8 pb-12 '>
                 
              
                  <div className='px-4  lg:w-[610px] md:px-12 lg:px-1 md:w-[500px] '>
                     <div className=''>
                      
                            
                              
                              
                              
                              {/* input filed */}
                              <div>
                              
                                <div className=' md:justify-between lg:flex md:flex sm:block md:w-96 lg:justify-between lg:w-full'>
                                  
                                  <div>
                                    <input  name="fname"  className='lg:w-[250px] h-10 text-center rounded-lg bg-[white] bg-opacity-10 md:48 ' placeholder='first name'
                                    value ={data.fname}
                                    onChange={handleChange}
                                    ></input>
                                  </div>
                                  
                                  <div  className='my-5 sm:my-5 md:my-0 lg:my-0'>
                                    <input className='lg:w-[250px] h-10 text-center rounded-lg bg-[white] bg-opacity-10 md:48 lg:ml-auto' placeholder='Middle name'
                                    value={data.lname}
                                    onChange={handleChange}
                                    name='lname'
                                    ></input>
                                  </div>
                                  
                                </div>
                                
                                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px]'>
                                    <input type='Email' placeholder='Email' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'
                                    value={data.email}
                                    onChange={handleChange}
                                    name='email'
                                    ></input>
                                </div>

                                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] '>
                                    <input type='text' placeholder='Contact Number' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'
                                    value={data.phone_number}
                                    onChange={handleChange}
                                    name='phone_number'
                                    ></input>
                                </div>

                                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] '>
                                    <input type='Password' placeholder='New Password' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'
                                    value={data.password}
                                    onChange={handleChange}
                                    name='password'
                                    ></input>
                                </div>

                                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] '>
                                    <input type='password' placeholder='Re-Enter Password' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'></input>
                                </div>

                                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] '>
                                    <input type='text' placeholder='Education details' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'
                                    value={data.education}
                                    onChange={handleChange}
                                    name='education'
                                    ></input>
                                </div>

                                <div className='my-5  lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[600px] '>
                                    <input type='text' placeholder='User details(Bio)' className='lg:w-screen h-10 px-5 rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'
                                    value={data.bio}
                                    onChange={handleChange}
                                    name='bio'
                                    ></input>
                                </div>

                                <div className='flex justify-between'>
                                  
                                  <div className='text-left'>
                                      <label>Select role</label>
                                      <div>
                                        <select  name='role' className='lg:w-[150px] h-10 text-left rounded-lg  bg-opacity-90 md:48 optional:bg-[#ffffff21] '
                                        value={data.role}
                                        onChange={handleChange}
                                        
                                        >
                                          <option value='' className='text-white bg-black bg-opacity-90'>-select-</option>
                                          <option value='admin' className='text-white bg-black bg-opacity-90'>Admin</option>
                                          <option value='recruiter' className='text-white bg-black bg-opacity-90'>Recruiter</option>
                                          <option value='hiring manager' className='text-white bg-black bg-opacity-90' >Hiring Manager</option>
                                          <option value='interviewer' className='text-white bg-black bg-opacity-90' >Interviewer</option>
                                          <option value='candidate' className='text-white bg-black bg-opacity-90' >Candidae</option>
                                          
                                          
                                        </select>
                                      </div>
                                    </div>

                                    <div>
                                  
                                  <div className='text-left'>
                                    <label>Date Of Birth</label>
                                  </div>
                                  
                                  <div className=' lg:flex md:flex lg:justify-center  justify-between  sm:block md:w-[200px] '>
                                    <input type='date'  className='lg:w-screen h-10  rounded-lg bg-[white] bg-opacity-10 sm:w-96 before:md:w-96'
                                    value={data.dob}
                                    onChange={handleChange}
                                    name='dob'
                                    ></input>
                                  </div>
                                
                              </div>

                              <div>
                                  <div className='text-left'>
                                    <label>Gender</label>
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
                                    
                                    
                                
                               

                                
                              
                              </div>
                              
                              
                              
                            
                    </div>
                </div>
            
          </div>
            </div>
            
            <div className='w-[40px]'>
              
            </div>

            
                  <div className=' w-[500px] justify-center items-center h-fit'>
                        <div className='flex justify-center '>
                            {image ? (
                                <div className="">
                                    <img src={image} alt="Uploaded" className="rounded-full  w-[400px] h-[400px]" />
                                </div>
                            ) : (
                              
                              <img src={user} alt='user' className="rounded-full  w-[400px] h-[400px]"></img>
                            )}
                        </div>

                              <div className='flex justify-center pt-3 '>
                                <div className='pt-2'>
                                    <input
                                      accept='image/*'
                                      type='file'
                                      name='image'
                                      className='rounded-lg h-10 w-[200px] pl-3 pr-3 text-white'
                                      onChange={handleChange}
                                    />
                                
            </div>
                        </div> 
                  </div>

                  </div>
                  
            <div>
            <div className='h-fit  pt-4 mx-[110px] pb-9'>
                                          
                                          <div>
                                            <button  type='button' className='w-full h-12 px-12 bg-[#272727] rounded-2xl md:w-auto' onClick={clearFields}>Clean</button>
                                          </div>
                                          <div className='pt-4'>
                                            <button type='submit' className='w-full h-12 px-12 bg-orange-600 rounded-2xl md:w-auto' >Create Account</button>
                                          </div>                 
                                        </div>
            </div>
          </div>

          
         
          </form>
    </div>
  )
}
