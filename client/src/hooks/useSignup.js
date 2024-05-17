import React, { useState } from 'react'
import toast from 'react-hot-toast'; 
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {

  const [loading, setLoading] = useState(false);
  const {authUser, setAuthUser} = useAuthContext();

  const signup = async ({fullName, username, password, confirmPassword, gender}) => {
    const success = handleInputError({fullName, username, password, confirmPassword, gender});
    if(!success) return false;

    setLoading(true);

    try {

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({fullName, username, password, confirmPassword, gender})
      });

      const data = await res.json();
      if(data.error){
        throw new Error(data.error);
      }

      console.log(data);
      // localStorage
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data); // Authenticated user stores here ----------------------------

      return data;

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return {signup, loading};
};

export default useSignup

function handleInputError({fullName, username, password, confirmPassword, gender}) {
  if(!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }

  if(password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if(password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}
