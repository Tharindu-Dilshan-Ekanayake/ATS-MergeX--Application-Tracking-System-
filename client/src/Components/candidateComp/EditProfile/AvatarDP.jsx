import React from 'react'
import { useState } from 'react';
import { BiSolidCamera } from "react-icons/bi";
import { BsPersonAdd } from "react-icons/bs";





const AvatarDP = () => {

  const [profileImage, setProfileImage] = useState(null);
  const [newProfileImage, setNewProfileImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewProfileImage(file);
      // Optionally display the selected image preview
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setProfileImage(null);
    setNewProfileImage(null);
  };

  const handleUpdateProfile = () => {
    // Send the newProfileImage to the server for updating the profile
    // Reset the state after updating the profile
    setProfileImage(null);
    setNewProfileImage(null);
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
            <input id="fileInput" type="file" onChange={handleImageChange} className='hidden' />
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
