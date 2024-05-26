import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { MdDashboard } from 'react-icons/md';
import { FaPodcast } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa";
import { FaFileSignature } from 'react-icons/fa';
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiLogout } from 'react-icons/ci';
import { MdMessage } from 'react-icons/md';
import proImg from '../../Images/pro1.png'

export default function InterviewNav() {
    const [activeItem, setActiveItem] = useState(null);
    const { user } = useContext(UserContext);
    const location = useLocation();

    useEffect(() => {
        // Update active item based on current route
        switch (location.pathname) {
            case '/interviewerdash':
                setActiveItem(1);
                break;
            case '/scheduling':
                setActiveItem(2);
                break;
            case '/interview':
                setActiveItem(3);
                break;
            case '/evaluation':
                setActiveItem(4);
                break;
            case '/feedbacksubmission':
                setActiveItem(5);
                break;
            case '/message':
                setActiveItem(6);
                break;
            default:
                setActiveItem(null);
        }
    }, [location.pathname]);

    return (
        <div className='min-h-screen bg-[#2B2B2B] lg:w-[320px] sm:w-fit md:w-72 w-fit'>
            <div className='pt-12'>
                <div className='flex items-center justify-center'>
                    <div className='items-center block '>
                    {!!user && <img src={user.image} alt='hi' className='rounded-full border-[2px] w-[250px] h-[250px]' />}
                    </div>
                </div>

                <div className='pt-4 pb-8'>
                    {!!user && <h1> {user?.fname} {user?.lname}</h1>}
                    {!!user && <h1 className='opacity-40'> {user.role} </h1>}
                </div>
            </div>

            <div className='justify-center'>
                <nav>
                    <ul className='text-left'>
                        <Link to='/interviewerdash' >
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 dark:hover:text-neutral-300 ${activeItem === 1 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'>
                                        <MdDashboard size={20} className="opacity-25 sm:w-6 sm:h-6 hover:text-white hover:opacity-70" />
                                    </div>
                                    <div>
                                        <label className='text-white opacity-25 hover:text-white hover:opacity-70' style={{ fontSize: '18px' }}>Dashboard</label>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/scheduling' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 2 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><FaRegCalendarAlt size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                                    <div><label className='text-white opacity-25 hover:text-white hover:opacity-70' style={{ fontSize: '18px' }}>Interview Scheduling</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/interview' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 3 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><FaPodcast size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                                    <div><label className='text-white opacity-25 hover:text-white hover:opacity-70' style={{ fontSize: '18px' }}>Interview</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/evaluation' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 4 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><FaFileSignature size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                                    <div><label className='text-white opacity-25 hover:text-white hover:opacity-70' style={{ fontSize: '18px' }}>Evaluation</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/feedbacksubmission' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 5 ?'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><MdMessage size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                                    <div><label className='text-white opacity-25 hover:text-white hover:opacity-70' style={{ fontSize: '18px' }}>Feedback Submission</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/message' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 6 ?'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><FaEnvelope size={20} className="opacity-25 sm:w-6 sm:h-6 hover:text-white" /></div>
                                    <div><label className='text-white opacity-25 hover:text-white hover:opacity-70' style={{ fontSize: '18px' }}>Message</label></div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                    <div className='flex items-center justify-center'>
                        <div className='pt-10 fix w-fit'>
                            <Link to='/'>
                            <button className='bg-[#EA7122] w-44 h-12 rounded-xl flex items-center justify-center mb-4'>
                                <div className='flex items-center'>
                                    <CiLogout size={24} className='mr-2 text-lg text-white ' />
                                    <span className='text-white'>LOGOUT</span>
                                </div>
                            </button>
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}