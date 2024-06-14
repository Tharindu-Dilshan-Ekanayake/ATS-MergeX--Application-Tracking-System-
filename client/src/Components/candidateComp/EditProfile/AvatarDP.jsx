import React, { useEffect, useState, useContext } from 'react';
import { BiSolidCamera } from "react-icons/bi";
import { BsPersonAdd } from "react-icons/bs";
import axios from 'axios';





const AvatarDP = ({user}) => {

  const [profileImage, setProfileImage] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);

  useEffect(() => {
    if(user) {
      setProfileImage(user.image);
    }
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      console.log(file);
      setNewProfileImage(file); 
      // Store the new image file for the PUT request
      // Optionally display the selected image preview
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = async () => {
    try {
      // Assuming you have an endpoint to remove the profile image
      await axios.put('/candidatedash/editProfile', { image: null });
      setProfileImage(null);
      setNewProfileImage(null);
    } catch (error) {
      console.error('Error removing profile image:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!newProfileImage) {
      return;
    }
    console.log('newly selected image: ',newProfileImage);
    const formData = new FormData();
    // FormData is a built-in JavaScript object that provides a way to construct a set of key/value pairs 
    formData.append('image', newProfileImage);
  
    try {
      const response = await axios.put('/candidatedash/editProfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      // Optionally reset the state after updating the profile
      setProfileImage(null);
      setNewProfileImage(null);
    } catch (error) {
      console.error('Error updating profile image:', error);
    }
  };
  


  return (
    <div className='bg-neutral-800 flex flex-col justify-between items-center gap-5 '>
      <div className='upload bg-neutral-800'>
        {profileImage ? (
          <img src={profileImage} alt="Profile" className='h-48 w-48 rounded-full ' />
        ) : (
          <div className="flex justify-center items-center h-48 w-48 rounded-full border-3 border-neutral-300 bg-center bg-cover overflow-hidden bg-neutral-400 ">
            <BsPersonAdd className='text-8xl'/>
          </div>
        )}

        <div className='flex justify-center  items-center round '>
          <label htmlFor="fileInput" className='cursor-pointer '>
            <input 
              id="fileInput" 
              type="file" 
              onChange={handleImageChange} 
              accept='image/*'
              className='hidden' />
            <div className="rounded-full bg-orange-500 p-3 hover:bg-orange-200 hover:border-2 transition duration-300">
              <BiSolidCamera className='hover:border-orange-500 transition duration-300'/>
            </div>
          </label>
        </div>

      </div>


      <button
        onClick={handleUpdateProfile}
        className='h-10 w-28 bg-amber-800 bg-opacity-15 border-orange-700 border-2 rounded-xl text-white px-2 font-semibold hover:bg-amber-700 hover:border-white transition duration-200 text-xs'>
        Update Profile
      </button>

      <button
        onClick={handleRemoveImage}
        className='h-10 w-28 bg-amber-800 bg-opacity-15 border-orange-700 border-2 rounded-xl text-white px-2 font-semibold hover:bg-amber-700 hover:border-white transition duration-200 text-xs'>
        Remove Profile
      </button>

    </div>
  )
}

export default AvatarDP
