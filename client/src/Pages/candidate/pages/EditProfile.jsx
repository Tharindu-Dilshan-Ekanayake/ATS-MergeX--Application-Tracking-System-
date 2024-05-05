import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AvatarDP from '../../../Components/candidateComp/EditProfile/AvatarDP';
import { useState, useEffect } from 'react';

        


const EditProfile = () => {

  const [formData, setFormData] = useState({
    firstName: '',
    secondName: '',
    email: '',
    telephone: '',
    age: '',
    dob: '',
    gender: '',
    education:'',
    description: '',
  });

  useEffect(() => {
    console.log(formData);

  }, [formData]);

  
  const schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    secondName: yup.string().required("Second Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    telephone: yup
      .string()
      .matches(/^\d+$/, "Invalid telephone number")
      .min(10, "Telephone number must be at least 10 digits")
      .required("Telephone number is required"),

    age: yup
      .number()
      .positive("Age must be a positive number")
      .integer("Age must be an integer")
      .max(99, "Age must be less than 100")
      .required("Age is required"),

    dob: yup.date()
      .required("Date of Birth is required")
      .max(new Date(), "Date of Birth cannot be in the future"),

    gender: yup.string()
      .oneOf(['male', 'female', 'other'], "Invalid gender")
      .required("Gender is required"),

    education: yup.string().max(500, "education cannot exceed 500 characters"),
    description: yup.string().max(500, "description cannot exceed 500 characters"),
  });
  
  // {errors}: This part of the destructuring assignment specifically extracts the errors property from the formState.
  // formState - This property contains various state-related information about the form, including errors, touched fields, dirty fields, etc.
  // errors - This property contains an object containing all the validation errors that have occurred in the form.

  const { register, handleSubmit, formState: {errors} } = useForm({
    resolver: yupResolver(schema),
  });
  // Before invoking the provided callback function (onSubmit), 
  // handleSubmit performs form validation using the validation rules defined in the Yup schema.
  // If there are validation errors, the form submission is prevented,
  // If there are no validation errors, 
  // the provided callback function (onSubmit) is called with the form data as its argument.

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setFormData(data); // state updates are asynchronous in React, meaning that the state update may not be reflected immediately after calling setFormData. 
  }

  return (
    <div className='flex items-center justify-center h-full '>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-start w-3/5 gap-1 py-1 mt-8 text-neutral-900 bg-neutral-800 h-5/6'>
        <div className='flex items-start justify-around w-full px-1 bg-neutral-800'>
          <div className='flex flex-col justify-center w-2/5 gap-1 bg-neutral-800'>

            <input type="text" placeholder='FirstName' {...register("firstName")} 
            className='px-3 py-2 text-white transition duration-200 border-2 border-orange-700 bg-amber-800 bg-opacity-15 rounded-2xl focus:outline-none focus:bg-neutral-100 focus:bg-opacity-25'/>
                <p className='text-red-500'>{errors.firstName?.message}</p>

            <input type="text" placeholder='SecondName' {...register("secondName")} 
            className='px-3 py-2 text-white transition duration-200 border-2 border-orange-700 bg-amber-800 bg-opacity-15 rounded-2xl focus:outline-none focus:bg-neutral-100 focus:bg-opacity-25'/>
                <p className='text-red-500'>{errors.secondName?.message}</p>

            <input type="email" placeholder='Email' {...register("email")} 
             className='px-3 py-2 text-white transition duration-200 border-2 border-orange-700 bg-amber-800 bg-opacity-15 rounded-2xl focus:outline-none focus:bg-neutral-100 focus:bg-opacity-25'/>
                <p className='text-red-500'>{errors.email?.message}</p>

            <input type="tel" placeholder='Telephone' {...register("telephone")} 
             className='px-3 py-2 text-white transition duration-200 border-2 border-orange-700 bg-amber-800 bg-opacity-15 rounded-2xl focus:outline-none focus:bg-neutral-100 focus:bg-opacity-25'/>
                <p className='text-red-500'>{errors.telephone?.message}</p>

            <input type="text" placeholder='Age' {...register("age")} 
             className='px-3 py-2 text-white transition duration-200 border-2 border-orange-700 bg-amber-800 bg-opacity-15 rounded-2xl focus:outline-none focus:bg-neutral-100 focus:bg-opacity-25'/>
                <p className='text-red-500'>{errors.age?.message}</p>

            <input type="date" placeholder='Date of Birth' {...register("dob")} 
             className='px-3 py-2 text-white transition duration-200 border-2 border-orange-700 bg-amber-800 bg-opacity-15 rounded-2xl focus:outline-none focus:bg-neutral-100 focus:bg-opacity-25'/>
                <p className='text-red-500'>{errors.dob?.message}</p>

            <div className='container flex gap-2'>
              <label className='w-3/12 text-white border-2 border-orange-700 genderLabel rounded-2xl' for='male'> Male
                <input type="radio" value="male" {...register("gender")} className='gender' id='male'/>
              </label>
              
              <label className='text-white genderLabel' for='female'> Female </label>
                <input type="radio" value="female" {...register("gender")} className='gender' id='female'/>
                
              
              <label className='text-white genderLabel' for='other'> Other </label>
                <input type="radio" value="other" {...register("gender")} className='other' id='other'/>
               
            </div>
                <p className='text-red-500'>{errors.gender?.message}</p>
          </div>

          <AvatarDP/>
        </div>
        
        <div className='w-5/6 px-1 py-1 '>
          <label className='flex flex-col items-start text-white '>
            Education
            <textarea className='w-full pt-2 border-2 border-orange-700 resize-none text-neutral-900 bg-amber-800 bg-opacity-15 rounded-2xl indent-5' 
            placeholder='Education Qualification' {...register("education")} /> 
          </label>
              <p className='text-red-500'>{errors.education?.message}</p>

            <label className='flex flex-col items-start text-white'>
              Description
              <textarea className='w-full pt-2 border-2 border-orange-700 resize-none text-neutral-900 bg-amber-800 bg-opacity-15 rounded-2xl indent-5' 
              placeholder='I am SystemChanger' {...register("description")} /> 
            </label>
              <p className='text-red-500'>{errors.description?.message}</p>
        </div>
        

        <button type="submit" className='bg-white text-neutral-900'>SUBMIT</button>
      </form>
      
    </div>
  )
}

export default EditProfile;

