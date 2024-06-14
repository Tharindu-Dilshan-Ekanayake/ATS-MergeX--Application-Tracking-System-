import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { BsGenderFemale } from "react-icons/bs";
import { BsGenderMale } from "react-icons/bs";
import { BsGenderAmbiguous } from "react-icons/bs";
import { BiSolidCamera } from "react-icons/bi";
import { BsPersonAdd } from "react-icons/bs";



const EditProfile = () => {

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone_number: '',
    dob: '',
    gender: '',
    education: '',
    bio: '',
    image: '',
  });

  const [loading, setLoading] = useState(true);

  const [profileImage, setProfileImage] = useState(null);

  const schema = yup.object().shape({
    fname: yup.string().required("First Name is required"),
    lname: yup.string().required("Second Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone_number: yup
      .string()
      .matches(/^\d+$/, "Invalid telephone number")
      .min(10, "Telephone number must be at least 10 digits")
      .required("Telephone number is required"),
    dob: yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth cannot be in the future"),
    gender: yup.string()
      .oneOf(['male', 'female', 'other'], "Invalid gender")
      .required("Gender is required"),
    education: yup.string().max(500, "Education cannot exceed 500 characters"),
    bio: yup.string().max(500, "Description cannot exceed 500 characters"),
  });


  // {errors}: This part of the destructuring assignment specifically extracts the errors property from the formState.
  // formState - This property contains various state-related information about the form, including errors, touched fields, dirty fields, etc.
  // errors - This property contains an object containing all the validation errors that have occurred in the form.

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  // Before invoking the provided callback function (onSubmit), 
  // handleSubmit performs form validation using the validation rules defined in the Yup schema.
  // If there are validation errors, the form submission is prevented,
  // If there are no validation errors, 
  // the provided callback function (onSubmit) is called with the form data as its argument.

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/profile/');
        const userData = response.data;

        console.log('useEffect', userData);
        setFormData(userData);

        setValue('fname', userData.fname);
        setValue('lname', userData.lname);
        setValue('email', userData.email);
        setValue('phone_number', userData.phone_number);
        setValue('dob', userData.dob);
        setValue('gender', userData.gender);
        setValue('education', userData.education);
        setValue('bio', userData.bio);
        setValue('image', userData.image);

        if (userData.image) {
          setProfileImage(userData.image);
        }

        setLoading(false);

      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }

    fetchUserData();

  }, [setValue]);


  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      console.log('submission Data - ', data);

      //check if any chnages have been made 
      if (JSON.stringify(data) === JSON.stringify(formData)) {
        console.log('No Chnages made.');

        return;
      }

      let UpdatedData = data;

      if (data.image && data.image[0]) {
        const file = data.image[0];
        const toBase64 = (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
              resolve(reader.result);
            };
            reader.onerror = reject;
          });
        };

        const base64Image = await toBase64(file);
        UpdatedData = { ...data, image: base64Image };

        setProfileImage(base64Image);

        console.log('Base64 UpdatedData -', UpdatedData);
        setFormData(UpdatedData);
      } else {
        const { image, ...formDataWithoutImage } = data;
        UpdatedData = formDataWithoutImage;
      }

      const response = await axios.put('/candidatedash/editProfile', UpdatedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });

      console.log('response data  - ', response.data);
      console.log('setFormData - ', formData);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRemoveImage = async () => {
    try {
      await axios.put('/candidatedash/editProfile', { image: null });
      setProfileImage(null);
    } catch (error) {
      console.error('Error removing profile image:', error);
    }
  };


  return (
    <div className='flex items-center justify-center h-full '>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-start justify-start w-3/5 gap-1 text-neutral-900 bg-neutral-800 h-4/5'>
        <div className='flex items-center justify-around w-full px-1 bg-neutral-800'>
          <div className='flex flex-col justify-center w-full gap-1 bg-neutral-800'>

            <div className='bg-neutral-800 w-full flex iems-center justify-around py-2'>
              <label className='text-neutral-500 font-semibold text-lg bg-neutral-800 w-1/3 text-left'>First Name </label>
              <input type="text" placeholder='FirstName' {...register("fname")}
                className='px-3 py-2 text-white transition duration-200 border border-neutral-700 rounded bg-neutral-600 bg-opacity-10 focus:outline-none focus:bg-neutral-600 focus:bg-opacity-30 focus:border-1 focus:border-neutral-400' />
              <p className='text-red-500'>{errors.firstName?.message}</p>
            </div>

            <div className='w-full flex iems-center justify-around py-2'>
              <label className='text-neutral-500 font-semibold text-lg bg-neutral-800 w-1/3 text-left'>Last Name</label>
              <input type="text" placeholder='SecondName' {...register("lname")}
                className='px-3 py-2 text-white transition duration-200 border border-neutral-700 rounded bg-neutral-600 bg-opacity-10 focus:outline-none focus:bg-neutral-600 focus:bg-opacity-30 focus:border-1 focus:border-neutral-400' />
              <p className='text-red-500'>{errors.secondName?.message}</p>
            </div>

            <div className='bg-neutral-800 w-full flex iems-center justify-around py-2'>
              <label className='text-neutral-500 font-semibold text-lg bg-neutral-800 w-1/3 text-left'>Email</label>
              <input type="email" placeholder='Email' {...register("email")}
                className='px-3 py-2 text-white transition duration-200 border border-neutral-700 rounded bg-neutral-600 bg-opacity-10 focus:outline-none focus:bg-neutral-600 focus:bg-opacity-30 focus:border-1 focus:border-neutral-400' />
              <p className='text-red-500'>{errors.email?.message}</p>
            </div>

            <div className='w-full flex iems-center justify-around py-2'>
              <label className='text-neutral-500 font-semibold text-lg bg-neutral-800 w-1/3 text-left'>Telephone</label>
              <input type="tel" placeholder='Telephone' {...register("phone_number")}
                className='px-3 py-2 text-white transition duration-200 border border-neutral-700 rounded bg-neutral-600 bg-opacity-10 focus:outline-none focus:bg-neutral-600 focus:bg-opacity-30 focus:border-1 focus:border-neutral-400' />
              <p className='text-red-500'>{errors.telephone?.message}</p>
            </div>

            <div className='bg-neutral-800 w-full flex iems-center  py-2 '>
              <label className='text-neutral-500 font-semibold text-lg bg-neutral-800 w-1/3 text-left ml-5 mr-10'>Date of Birth</label>
              <input type="date" placeholder='Date of Birth' {...register("dob")}
                className='px-3 py-2 text-white transition duration-200 border border-neutral-700 rounded bg-neutral-600 bg-opacity-10 focus:outline-none focus:bg-neutral-600 focus:bg-opacity-30 focus:border-1 focus:border-neutral-400' />
              <p className='text-red-500'>{errors.dob?.message}</p>
            </div>

            <div className='container flex flex-col items-between justify-start gap-2 ml-5 bg-neutral-800'>
              <label className='text-neutral-500 font-semibold text-lg bg-neutral-800 w-1/3 text-left'>Gender</label>
              <div class="radio-tile-group flex justify-between flex-wrap bg-neutral-800 ml-auto">

                <div className='input-container relative m-2 w-20 h-11 flex border rounded border-neutral-700 '>
                  <input type="radio" value="male" id="male" {...register("gender")} className='absolute h-full w-full m-0 cursor-pointer z-2 opacity-0' />
                  <div className='radio-tile flex justify-around items-center h-full w-full genderLabel transition-all duration-300	ease-linear'>
                    <label htmlFor='male' className='w-3/12 text-neutral-500 tracking-wide '> Male</label>
                    <BsGenderMale className='icon-style text-neutral-500 ' />
                  </div>
                </div>

                <div className='input-container relative m-2 w-20 h-11 flex border rounded focus:border-1 border-neutral-700 '>
                  <input type="radio" value="female" id="female" {...register("gender")} className='absolute h-full w-full m-0 cursor-pointer z-2 opacity-0' />
                  <div className='radio-tile flex items-center h-full w-full genderLabel transition-all duration-300	ease-linear justify-between'>
                    <label htmlFor='male' className='w-3/12 text-neutral-500 tracking-wide  ml-1'> Female</label>
                    <BsGenderFemale className='icon-style text-neutral-500 mr-1 ' />
                  </div>
                </div>

                <div className='input-container relative m-2 w-20 h-11 flex border rounded border-neutral-700'>
                  <input type="radio" value="other" id="other" {...register("gender")} className='absolute h-full w-full m-0 cursor-pointer z-2 opacity-0' />
                  <div className='radio-tile flex justify-around items-center h-full w-full genderLabel transition-all duration-300	ease-linear'>
                    <label htmlFor='male' className='w-3/12 text-neutral-500 tracking-wide'> Other</label>
                    <BsGenderAmbiguous className='icon-style text-neutral-500 ' />
                  </div>
                </div>

              </div>
            </div>

            <p className='text-red-500'>{errors.gender?.message}</p>
          </div>


          <div className='bg-neutral-800 w-full flex flex-col justify-between items-center gap-5 '>
            <div className='upload bg-neutral-800'>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className='h-48 w-48 rounded-full ' />
              ) : (
                <div className="flex justify-center items-center h-48 w-48 rounded-full border-3 border-neutral-300 bg-center bg-cover overflow-hidden bg-neutral-400 ">
                  <BsPersonAdd className='text-8xl' />
                </div>
              )}

              <div className='flex justify-center  items-center round '>
                <label htmlFor="fileInput" className='cursor-pointer '>
                  <input
                    id="fileInput"
                    type="file"
                    accept='image/*'
                    className='hidden'
                    {...register("image")}
                  />
                  <div className="rounded-full bg-orange-500 p-3 hover:bg-orange-200 hover:border-2 transition duration-300">
                    <BiSolidCamera className='hover:border-orange-500 transition duration-300' />
                  </div>
                </label>
              </div>

            </div>


            <button
              className='h-10 w-28 bg-amber-800 bg-opacity-15 border-orange-700 border-2 rounded-xl text-white px-2 font-semibold hover:bg-amber-700 hover:border-white transition duration-200 text-xs'
              onClick={handleRemoveImage}>
              Remove Profile
            </button>
          </div>

        </div>

        <div className=' flex flex-col justify-between w-full h-2/5 px-1 py-1 bg-red-00 gap-2 bg-neutral-800 ml-2'>
          <div className='flex justify-center items-start text-black  w-full py-2'>
            <label className='bg-neutral-800 font-semibold text-lg mx-auto w-1/5 text-neutral-500 text-left'>Education</label>
            <textarea className='w-3/4 p-3 mx-auto text-white border resize-none border-neutral-700 rounded bg-neutral-600 bg-opacity-10 focus:outline-none focus:bg-neutral-600 focus:bg-opacity-30 focus:border-1 focus:border-neutral-400'
              placeholder='Education Qualification' {...register("education")} />
            <p className='text-red-500'>{errors.education?.message}</p>
          </div>

          <div className='flex justify-center items-start w-full'>
            <label className='text-neutral-500 font-semibold text-lg mx-auto w-1/5 bg-neutral-800 text-left'>Bio</label>
            <textarea className='w-3/4 p-3 mx-auto text-white border resize-none border-neutral-700 rounded bg-neutral-600 bg-opacity-10 focus:outline-none focus:bg-neutral-600 focus:bg-opacity-30 focus:border-1 focus:border-neutral-400'
              placeholder='I am SystemChanger' {...register("bio")} />
            <p className='text-red-500'>{errors.description?.message}</p>
          </div>

          <button type="submit" className='h-10 w-20 bg-amber-800 bg-opacity-15 text-white px-1 py-1 border-orange-700 border-2 rounded-xl mx-auto mt-5 hover:bg-amber-700 hover:border-white transition duration-200 text-xs'>SUBMIT</button>
        </div>
      </form>

    </div>
  )
}

export default EditProfile;

