import React, { useState, useEffect } from 'react';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import FeedbackItem from '../../Components/interviewercomp/FeedbackItem';
import AdminChatBotBottom from '../../Components/admincomp/AdminChatBotBottom';
import axios from 'axios'

export default function FeedbackSubmission() {
  const name = 'Feedback Submission';
  const [users, setUsers] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getFeedback`);
        if (response.data.length > 0) {
          setFeedbackList(response.data);
        }
      } catch (error) {
        console.error('Error fetching existing feedback:', error);
      }
    };
    console.log(feedbackList)
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch data from the endpoints
        const [usersResponse, approvedCVResponse] = await Promise.all([
            axios.get('/getusers'),
            axios.get('/cv/getapprovedisjoinedtrue')
        ]);

        // Extract data from responses
        const usersData = usersResponse.data;
        const approvedCVData = approvedCVResponse.data;

        const combinedData = approvedCVData.map(cv => {
          const user = usersData.find(user => user._id === cv.user_id);
          return user ? { ...cv, user } : cv;
        });
        setUsers(combinedData);
        console.log('Combined Data:', combinedData[0]); // Log the combined data

        // You can now use the combinedData array here
      } catch (error) {
        console.error('Error fetching data:', error); // Handle any errors
      }
    }

    fetchData();
  }, []);

  return (
    <div>
        <div className='flex'>
        <div>
          <InterviewNav/>
        </div>
        <div>
           <Description name={name} />
        </div>

        <div id='background' className="z-0 mx-8 mt-24 w-80 h-80vh rounded-3xl">
          <div id='container' className='px-6 mt-8'>
            <div className='flex items-center mb-3'>
              <p className='translate-x-24'>Name</p>
              <p className='translate-x-[31rem]'>Interviewed On</p>
              <p className='translate-x-[46.5rem]'>Position</p>
            </div>
            {users.map((user, index) => (
              feedbackList.some(feedback => feedback.invitation._id === user.invitation._id) ? null : (
                <FeedbackItem
                  key={index}
                  profile={user.user.image}
                  name={user.user.fname + " " + user.user.lname}
                  userID={user.user._id}
                  combinedData={user}
                />
              )
            ))}
          </div>
        </div>
        </div>
         {/* Move AdminChatBotBottom here and wrap it in a positioned div */}
      <div className="absolute bottom-0 right-0 z-50">
        <AdminChatBotBottom/>
      </div>
    </div>
  )
}