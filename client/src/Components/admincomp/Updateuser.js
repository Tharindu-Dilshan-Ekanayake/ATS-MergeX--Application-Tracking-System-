import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';

export default function UpdateUser({ visible, onClose, user }) {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState(() => {
    // Check if formData exists in local storage and parse it
    const storedFormData = localStorage.getItem('formData');
    return storedFormData ? JSON.parse(storedFormData) : {
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
      image: '',
    };
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
        education: user.education,
        bio: user.bio,
        dob: user.dob,
        gender: user.gender,
        image: user.image,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
  
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(reader.result);
        setImage(reader.result);
        setFormData({ ...formData, [name]: reader.result });
      };
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const clearImageData = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/users/${user._id}`, formData);
      onClose();
      clearImageData();
      localStorage.removeItem('formData'); // Clear local storage after successful submission
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  useEffect(() => {
    // Store formData in local storage whenever it changes
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  if (!visible || !user) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm">
      <div className="bg-[#19191A] p-6 rounded-lg shadow-lg h-[800px] w-[500px] border-orange-700 border-[1px]">
        <button
          className="absolute px-4 py-2 text-white bg-gray-700 rounded-md top-4 right-4 hover:bg-gray-600 size-12"
          onClick={onClose}
        >
          <IoMdClose className="text-white hover:text-red-700" />
        </button>

        <div>
          <h1 className='text-3xl text-orange-500'>Edit User Details</h1>
        </div>
        <form onSubmit={handleSubmit}>

          <div className='flex justify-center'>
            {image ? (
              <div>
                <img src={image} alt='' className='rounded-full h-[200px] w-[200px] border-[2px] '></img>
              </div>
            ):(
              <img src={formData.image} alt='' className='rounded-full h-[200px] w-[200px] border-[2px] '></img>
            )}
          </div>


          <div>
            <input
              accept='image/*'
              type='file'
              name='image'
              className=''
              onChange={handleInputChange}
            />
          </div>

         

          <div className='flex justify-center pl-10 pr-10 mt-8 text-start'>

            <div className=''>
            <div className='flex justify-between w-full '>
                      <div className='pb-2'>
                        <label  className='opacity-40'>First Name : </label>
                        <div className='pt-1 pl-0'>
                        <input
                          className="bg-[#2a2a2a] w-[170px] h-10 rounded-lg pl-4"
                          type="text"
                          name="fname"
                          placeholder="First Name"
                          value={formData.fname}
                          onChange={handleInputChange}
                        />
                        </div>
                        
                      </div>
                      
                      <div className='pb-2' >
                      <label  className='opacity-40'>Last Name : </label>
                      <div className='pt-1 pl-0'>
                      <input
                        className="bg-[#2a2a2a] w-[170px] h-10 rounded-lg pl-4"
                          type='text'
                          name='lname'
                          placeholder='Last Name'
                          value={formData.lname}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      </div>  
              </div>
            
             
              <div className='pb-2'>
              <label  className='opacity-40'>Email : </label>
              <div className='pt-1 pl-10'>
              <input
                  className="bg-[#2a2a2a] w-[400px] h-10 rounded-lg pl-4"
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
                
              </div>

              <div className='pb-2'>
              <label  className='opacity-40'>Mobile Number : </label>
                <div className='pt-1 pl-10'>
                  <input
                    className="bg-[#2a2a2a] w-[400px] h-10 rounded-lg pl-4"
                    type='text'
                    name='phone_number'
                    placeholder='Phone number'
                    value={formData.phone_number}
                    onChange={handleInputChange}
                  />
                </div>
                
              </div>

              <div className='flex justify-between'>
                <div className='pb-2'>
                  <label  className='opacity-40'>Date of Birth : </label>
                  <div className='pt-1 '>
                    <input 
                        className="bg-[#2a2a2a] w-[200px] h-10 rounded-lg pl-4"
                        type='date'
                        name='dob'
                        placeholder='Birth Day'
                        value={formData.dob}
                        onChange={handleInputChange}
                      />
                  </div>
                </div>
                <div className='text-left '>
                  <label className='opacity-40'>Gender : </label>
                <div className='pt-1 '>
                  <select
                    name='gender'
                    className=' h-10 text-left rounded-lg bg-opacity-10 md:48 optional:bg-[#ffffff21]  w-[200px] pl-4'
                    value={formData.gender || user.gender} 
                    onChange={handleInputChange}
                  >
                    
                    <option value='male' className='text-white bg-black bg-opacity-90'>Male</option>
                    <option value='female' className='text-white bg-black bg-opacity-90'>Female</option>
                    <option value='other' className='text-white bg-black bg-opacity-90'>Other</option>
                  </select>
                </div>
              </div>
                
              </div>

              

              
            </div>

              
          </div>
          
          <div className='pt-8'>
            <button type="submit" className="px-4 py-2 font-bold text-white bg-orange-600 rounded hover:bg-orange-400">
              Save
            </button>
          </div>

          
         
        </form>
      </div>
    </div>
  );
}
