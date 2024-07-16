import React, { useState, useEffect } from 'react';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";

const ScheduledInterviews = ({ interviewTitle, interviewTime, onDelete, onUpdate, interview }) => {

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [showPopup, setShowPopup] = useState(false);

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/getusers');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {

    fetchUsers();

  }, []);

  const [formData, setFormData] = useState({
    date: formatDate(interview?.date) || '',
    startTime: interview?.start_time || '',
    endTime: interview?.end_time || '',
    meetingLink: interview?.link || '',
    password: interview?.password || '',
    subject: interview?.subject || '',
    assign: interview?.assign || ''
  });

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    setFormData({
      date: interview.date || '',
      startTime: interview.start_time || '',
      endTime: interview.end_time || '',
      meetingLink: interview.link || '',
      password: interview.password || '',
      subject: interview.subject || '',
      assign: interview.assign || ''
    });
  }, [interview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(interview._id, formData);
    togglePopup();
  };

  return (
    <>
      <div className='scheduled-interview-bar flex items-center justify-center gap-5 px-0'>
        <FaRegCalendarAlt size={30} className="text-white" />
        <p className='max-w-64 min-w-64 text-left'>{interviewTitle}</p>
        <p className='max-w-52 min-w-52 text-left'>{interviewTime}</p>
        <FaEdit size={26} className='cursor-pointer hover:text-orange-500' onClick={togglePopup}/>
        <MdDeleteOutline size={30} className='cursor-pointer hover:text-orange-500' onClick={onDelete}/>
      </div>

      {showPopup && (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-5 backdrop-blur z-50'>
          <div className='bg-[#2B2B2BE5] opacity-90 relative w-[60rem] h-[45rem] overflow-y-scroll border-2 border-[#EA712287] rounded-3xl px-5'>
            <MdOutlineClose size={25} className='absolute top-5 right-5 cursor-pointer' onClick={togglePopup} />
            <form className='p-8' onSubmit={handleSubmit}>
              <div className='grid items-center gap-4 mt-5 px-32'>
              <p className='text-2xl text-center mt-5 mb-5'>{interviewTitle}</p>
                <div className='flex items-center'>
                  <label className='text-white flex items-center gap-10 w-48'>Scheduled Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='text-white flex items-center gap-10 w-48'>Start Time</label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='text-white flex items-center gap-10 w-48'>End Time</label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='text-white flex items-center gap-10 w-48'>Meeting Link</label>
                  <input
                      type="url"
                      name="meetingLink"
                      value={formData.meetingLink}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='text-white flex items-center gap-10 w-48'>Password</label>
                  <input
                      type="text"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='text-white flex items-center gap-10 w-48'>Subject</label>
                  <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='text-white flex items-center gap-10 w-48'>Interviewer</label>
                  <select 
                    type="text"
                    name="assign"
                    value={formData.assign}
                    onChange={handleChange}
                    required
                    className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'>
                      <option value="" disabled>Select Interviewer</option>
                    {users
                      .filter(user => user.role === 'interviewer')
                      .map(interviewer => (
                        <option key={interviewer._id} value={interviewer._id}>
                          {interviewer.fname}  {interviewer.lname}
                        </option>
                      ))}
                  </select>
                </div>
                <div className='flex items-center justify-center mt-8'>
                  <button type="submit" className='bg-[#EA7122] w-44 h-12 rounded-full'>Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        )
      }
    </>

    

  )
}

export default ScheduledInterviews;

