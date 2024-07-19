import React, { useState, useEffect } from 'react';
import { MdOutlineClose } from "react-icons/md";
import '../../Pages/interviewer/custom.css'
import PopUp from './Popup';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import Swal from 'sweetalert2';
import {toast} from 'react-hot-toast';

const FeedbackItem = ({ profile, name, userID, combinedData }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/feedback?userId=${userID}`);
        if (response.data.length > 0) {
          setFeedbackList(response.data);
        }
      } catch (error) {
        console.error('Error fetching existing feedback:', error);
      }
    };

    //fetchFeedbacks();
  }, [userID]);

  console.log('xxxxx',combinedData);

  const togglePopup = (feedback = null) => {
    if (!feedbacks) {
      toast.error('Admin blocked temporarily');
      return;
    }
    if (!showPopup && feedback && feedback.userId === userID) {
      setRating(feedback.rating);
      setComment(feedback.feedback);
    } else {
      setRating(0);
      setComment('');
    }
    setShowPopup(!showPopup);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (!feedbacks) {
      toast.error('Admin blocked temporarily');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/feedback/postFeedback', {
        rating: rating,
        feedback: comment,
        userId: userID,
        combinedData: combinedData
      });

      if (response.status === 200) {
        console.log('Feedback updated:', response.data);
        await Swal.fire({
          title: 'Updated Successfully!',
          text: 'Your feedback has been updated.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else if (response.status === 201) {
        console.log('Feedback submitted:', response.data);
        await Swal.fire({
          title: 'Feedback Submitted!',
          text: 'Your feedback has been submitted.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      }
  
      setRating(0);
      setComment('');
      togglePopup();

      window.location.reload();
    } catch (error) {
      console.error('Error submitting feedback:', error);

      Swal.fire({
        title: 'Error!',
        text: 'There was an issue submitting your feedback.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleClear = () => {
    setRating(0);
    setComment('');
  };

  //access
  const [feedbacks, setfeedback] = useState(false);

  useEffect(() => {
    // Fetch the current state of create_user_account from the backend
    const fetchCreateUserAccount = async () => {
      try {
        const response = await axios.get('/access/feedbacksubmissionget');
        setfeedback(response.data.feedback_submission);
      } catch (error) {
        console.error('Error fetching create user account state:', error);
      }
    };

    fetchCreateUserAccount();
  }, []);

  return (
    <div>
      <div id='interview-item' className='flex items-center justify-between px-8 py-4'>
        <div>
          <img src={profile} className='border-2 border-white rounded-full w-14 h-14' alt='Profile'></img>
        </div>
        <div className='text-left -translate-x-24 max-w-44 min-w-44'> 
          <h1>{name}</h1>
          <p className='text-sm opacity-50'>Candidate</p>
        </div>
        <div className='-translate-x-24 max-w-36 min-w-36'>
          <p className='text-base opacity-50'>Date - {new Date(combinedData.interviewSchedule.date).toLocaleDateString()}</p>
        </div>
        <div className='-translate-x-20 max-w-32 min-w-32'>
          <p className='text-base opacity-50'>{combinedData.interviewSchedule.jobtitle}</p>
        </div>
        <div>
        {feedbackList.some(feedback => feedback.userId === userID) ? (
              feedbackList.map(feedback => feedback.userId === userID && (
                <button
                  key={feedback._id} // Assuming each feedback has a unique _id
                  className='w-52 h-14 bg-[#EA7122] text-lg rounded-3xl opacity-70'
                >
                  Update Feedback
                </button>
              ))
            ) : (
              <button
                className='w-52 h-14 bg-[#EA7122] text-lg rounded-3xl'
                onClick={() => togglePopup()}
              >
                Submit Feedback
              </button>
            )}
        </div>
      </div>

      {showPopup && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-5 backdrop-blur'>
          <div id='pop-bg' className='bg-[#2B2B2BE5] opacity-90 relative'>
            <MdOutlineClose size={25} className='absolute cursor-pointer top-5 right-5' onClick={togglePopup} />
            <div className='flex items-center justify-around'>
              <p className='text-2xl bold'>Submit Your Feedback</p>
              <PopUp
               img = {profile}
               name = {name}
               role = 'CANDIDATE'
              />
            </div>
            <p className='mt-10 text-xl semi-bold'>Rate Your Expeirience</p>
            <p className='w-3/4 mx-auto mt-5 text-lg text-center'>We request you to share your feedback. This helps us to get the valuable point to the candidate</p>
            <div className='mx-auto mt-10'>
            <StarRatings
                rating={rating}
                starRatedColor="#EA7122"
                changeRating={handleRatingChange}
                numberOfStars={5}
                starDimension="30px"
                starSpacing="5px"
              />
            </div>
            <div className='flex flex-col items-center justify-start mt-8'>
              <textarea
                className="block px-4 py-2 mt-5 bg-white border border-white border-opacity-25 rounded resize-none bg-opacity-5"
                placeholder="Enter your text here..."
                style={{ width: '45rem', height: '10rem'}}
                value={comment}
                onChange={handleCommentChange}
                rows="4"
              ></textarea>
            </div>
            <div className='flex items-center justify-center gap-3 mx-auto mt-6'>
              <button className='w-40 h-12 bg-[#EA7122] text-lg rounded-xl' onClick={handleSubmit}>Submit</button>
              <button className='w-40 h-12 bg-[#EA7122] text-lg rounded-xl bg-opacity-20' onClick={handleClear}>Clear</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackItem;