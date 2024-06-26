import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import InterviewNav from '../../Components/interviewercomp/InterviewNav';
import Description from '../../Components/interviewercomp/InterviewerDes';
import ViewJobButton from '../../Components/interviewercomp/ViewJobButton';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';
import ScheduledInterviews from '../../Components/interviewercomp/ScheduledInterviews';
import { MdOutlineClose } from "react-icons/md";

export default function Scheduling() {

  const name = 'Interview Scheduling'; 
  const { user } = useContext(UserContext);
  const [date, setDate] = useState(new Date());
  const [interviewSchedules, setInterviewSchedules] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  });

  const selectedDateSchedules = interviewSchedules.filter(schedule =>
    new Date(schedule.date).toLocaleDateString() === date.toLocaleDateString()
  );

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const [interviews, setInterviews] = useState([]);

  const [formData, setFormData] = useState({
    jobId: 'null',
    jobtitle: 'null',
    creatorId: user._id,
    date: formattedDate,
    startTime: '',
    endTime: '',
    meetingLink: '',
    password: '',
    subject: '',
    experience: '',
    skills: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      date: formattedDate,
      startTime: '',
      endTime: '',
      meetingLink: '',
      password: '',
      subject: '',
      experience: '',
      skills: '',
      description: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/schedule/interviewschedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jobId: formData.jobId,
          jobtitle: formData.jobtitle,
          creatorId: formData.creatorId,
          date: new Date(formData.date).toISOString(),
          start_time: formData.startTime,
          end_time: formData.endTime,
          subject: formData.subject,
          link: formData.meetingLink,
          password: formData.password,
          experience: formData.experience,
          skills: formData.skills.split(',').map(skill => skill.trim()), // Convert skills to an array
          description: formData.description
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Interview Schedule created successfully', data);
        handleClear();
      } else {
        console.error('Failed to create interview schedule');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const fetchInterviewSchedules = async () => {
      try {
        const response = await axios.get('http://localhost:8000/schedule/getinterviewschedule'); 
        setInterviewSchedules(response.data);
      } catch (error) {
        console.error('Error fetching interviews:', error);
      }
    };

    fetchInterviewSchedules();
  }, []);

  return (
    <>
      <div className='flex'>
          <div>
            <InterviewNav/>
          </div>
          <div>
            <Description name={name} />
          </div>

          <div id='background' className="z-0 grid grid-cols-3 mx-8 mt-24 w-80 h-80vh rounded-3xl">
            <div className='flex flex-col items-start col-span-1 px-5 py-10'>
              <div className='pl-5'>
                 <ViewJobButton/>
              </div>
              <div className='pl-5 mt-14'>
                <p className='mb-8 text-2xl text-left text-white text-opacity-50'>Calender</p>
                <Calendar
                  onChange={setDate}
                  value={date}
                />
              </div>
            </div>
            <div className='col-span-2 px-5 py-10'>
              <div>
                <p className='text-3xl'>{formattedDate}</p>
                <div className='mt-10 overflow-y-auto h-[450px]'>
                {selectedDateSchedules.length > 0 ? (
                  selectedDateSchedules.map((schedule, index) => (
                    <ScheduledInterviews
                      key={index}
                      interviewTitle={schedule.jobtitle}
                      interviewTime={schedule.start_time + " - " + schedule.end_time}
                    />
                  ))
                ) : (
                  <p className='text-xl text-center'>No Scheduled Interviews</p>
                )}
                </div>
                <button className='h-[50px] bg-orange-500 rounded-xl w-[200px] text-2xl hover:bg-orange-700 mt-14'
                onClick={togglePopup}>
                  Schedule +
                </button>
              </div>
            </div>
          </div>
      </div>

      {showPopup && (
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white bg-opacity-5 backdrop-blur'>
          <div className='bg-[#2B2B2BE5] opacity-90 relative w-[60rem] h-[45rem] border-2 border-[#EA712287] rounded-3xl px-5'>
            <MdOutlineClose size={25} className='absolute cursor-pointer top-5 right-5' onClick={togglePopup} />
            <p className='mt-5 text-3xl text-center bold'>{formattedDate}</p>
            <form className='p-8' onSubmit={handleSubmit}>
              <div className='flex items-center justify-between'>
               <label className='flex items-center gap-10 text-white'>
                  Start Time:
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    className='block w-2/4 mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                  />
                </label>
                <label className='flex items-center gap-10 text-white'>
                  End Time:
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    className='block w-2/4 mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                  />
                </label>

              </div>
              <div className='grid items-center gap-4 mt-5'>
                <div className='flex items-center'>
                  <label className='flex items-center w-48 gap-10 text-white'>Meeting Link</label>
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
                  <label className='flex items-center w-48 gap-10 text-white'>Password</label>
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
                  <label className='flex items-center w-48 gap-10 text-white'>Subject</label>
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
                  <label className='flex items-center w-48 gap-10 text-white'>Expirience</label>
                  <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='flex items-center w-48 gap-10 text-white'>Skills</label>
                  <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl'
                    />
                </div>
                <div className='flex items-center'>
                  <label className='flex items-start w-48 gap-10 text-white'>Description</label>
                  <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      className='block w-full mt-1 p-2 bg-[#2B2B2BE5] border-2 border-white border-opacity-10 rounded-xl h-20 resize-none'
                    />
                </div>
                <div className='flex items-center justify-center gap-5 px-10 mt-5'>
                  <button type="button" onClick={handleClear} className='w-44 h-12 rounded-full bg-[#EA712229]'>Clear</button>
                  <button type="submit" className='bg-[#EA7122] w-44 h-12 rounded-full'>Schedule</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        )
      }
    </>
  );
}