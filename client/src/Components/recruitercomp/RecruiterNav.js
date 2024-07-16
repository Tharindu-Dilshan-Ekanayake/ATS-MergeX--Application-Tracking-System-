import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { MdDashboard, MdMessage } from "react-icons/md";
import { FiArchive } from "react-icons/fi";
import { GiSatelliteCommunication } from "react-icons/gi";
import { BiBook } from "react-icons/bi";
import { MdOutlineAssessment } from "react-icons/md";
import { CiLogout } from "react-icons/ci";

export default function RecruiterNav() {
    const [activeItem, setActiveItem] = useState(null);
    const { user, logout } = useContext(UserContext);
    const location = useLocation();

    useEffect(() => {
        // Update active item based on current route
        switch (location.pathname) {
            case '/recruiterdash':
                setActiveItem(1);
                break;
            case '/recruiterdash/jobposting':
                setActiveItem(2);
                break;
            case '/recruiterdash/candidatecommunication':
                setActiveItem(3);
                break;
            case '/recruiterdash/applicationmanagement':
                setActiveItem(4);
                break;
            case '/recruiterdash/candidateassessment':
                setActiveItem(5);
                break;
            case '/recruiterdash/message':
                setActiveItem(6);
                break;
            default:
                setActiveItem(null);
        }
    }, [location.pathname]);

    return (
        <div className='h-screen fixed bg-[#2B2B2B] lg:w-[320px] sm:w-fit md:w-72 w-fit'>
            <div className='pt-12'>
                <div className='flex items-center justify-center'>
                    <div className='items-center block '>
                        {!!user && <img src={user.image} alt='hi' className='rounded-full border-[2px] w-[250px] h-[250px]' />}
                    </div>
                </div>

                <div className='pt-4 pb-8'>
                    {!!user && <h1> {user?.fname} {user?.lname}</h1>}
                    {!!user && <h1> {user.role} </h1>}
                </div>
            </div>

            <div className='justify-center'>
                <nav>
                    <ul className='text-left'>
                        <Link to='/recruiterdash' >
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 dark:hover:text-neutral-300 text-white ${activeItem === 1 ? 'bg-[#BABABA] bg-opacity-20 opacity-100' : 'opacity-25 hover:bg-gray-300 hover:text-white hover:opacity-70'}`}>
                                    <div className='flex'>
                                        <MdDashboard size={20} className="mr-8 sm:w-6 sm:h-6" />
                                        <label className='text-[18px]'>Dashboard</label>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/recruiterdash/jobposting' className='no-underline'>
                            <li>
                            <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 dark:hover:text-neutral-300 text-white ${activeItem === 2 ? 'bg-[#BABABA] bg-opacity-20 opacity-100' : 'opacity-25 hover:bg-gray-300 hover:text-white hover:opacity-70'}`}>
                                <div className='flex'>
                                        <FiArchive size={20} className="mr-8 sm:w-6 sm:h-6" />
                                        <label className='text-[18px]'>Job Posting</label>
                                    </div> 
                                </div>
                            </li>
                        </Link>
                        <Link to='/recruiterdash/candidatecommunication' className='no-underline'>
                            <li>
                            <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 dark:hover:text-neutral-300 text-white ${activeItem === 3 ? 'bg-[#BABABA] bg-opacity-20 opacity-100' : 'opacity-25 hover:bg-gray-300 hover:text-white hover:opacity-70'}`}>
                                <div className='flex'>
                                        <GiSatelliteCommunication size={20} className="mr-8 sm:w-6 sm:h-6" />
                                        <label className='text-[18px]'>Candidate Communication</label>
                                </div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/recruiterdash/applicationmanagement' className='no-underline'>
                            <li>
                            <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 dark:hover:text-neutral-300 text-white ${activeItem === 4 ? 'bg-[#BABABA] bg-opacity-20 opacity-100' : 'opacity-25 hover:bg-gray-300 hover:text-white hover:opacity-70'}`}>
                                <div className='flex'>
                                        <BiBook size={20} className="mr-8 sm:w-6 sm:h-6" />
                                        <label className='text-[18px]'>Application Management</label>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/recruiterdash/candidateassessment' className='no-underline'>
                            <li>
                            <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 dark:hover:text-neutral-300 text-white ${activeItem === 5 ? 'bg-[#BABABA] bg-opacity-20 opacity-100' : 'opacity-25 hover:bg-gray-300 hover:text-white hover:opacity-70'}`}>
                                <div className='flex'>
                                        <MdOutlineAssessment size={20} className="mr-8 sm:w-6 sm:h-6" />
                                        <label className='text-[18px]'>Candidate Assessment</label>
                                    </div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/recruiterdash/message' className='no-underline'>
                            <li>
                            <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 dark:hover:text-neutral-300 text-white ${activeItem === 6 ? 'bg-[#BABABA] bg-opacity-20 opacity-100' : 'opacity-25 hover:bg-gray-300 hover:text-white hover:opacity-70'}`}>
                                <div className='flex'>
                                        <MdMessage size={20} className="mr-8 sm:w-6 sm:h-6 hover:text-white" />
                                        <label className='text-[18px]'>Message</label>
                                        </div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                    <div className='flex items-center justify-center'>
                        <div className='pt-10 fix w-fit'>
                            
                            <Link to='/login'>
                            <button className='bg-[#EA7122] w-44 h-12 rounded-xl flex items-center justify-center'
                             onClick={logout}
                             >
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
