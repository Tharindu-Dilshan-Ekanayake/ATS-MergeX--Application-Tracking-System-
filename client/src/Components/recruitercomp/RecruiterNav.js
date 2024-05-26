import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { MdDashboard, MdMessage } from "react-icons/md";
import { FiArchive } from "react-icons/fi";
import { GiSatelliteCommunication } from "react-icons/gi";
import { BiBook } from "react-icons/bi";
import { MdOutlineAssessment } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import useLogout from '../../hooks/useLogout';

export default function RecruiterNav() {
    const [activeItem, setActiveItem] = useState(null);
    const { user } = useContext(UserContext);
    const location = useLocation();
    const { loading, logout } = useLogout();

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
        <div className='h-screen bg-[#2B2B2B] lg:w-[320px] sm:w-fit md:w-72 w-fit'>
            <div className='pt-12'>
                <div className='flex items-center justify-center'>
                    <div className='h-48 w-48 rounded-full border-2 border-zinc-500 bg-center bg-cover mt-5 mb-4 overflow-hidden '>
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
                        <Link to='/recruiterdash/jobposting' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 2 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><FiArchive size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                                    <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Job Posting</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/recruiterdash/candidatecommunication' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 3 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><GiSatelliteCommunication size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                                    <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Candidate Communication</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/recruiterdash/applicationmanagement' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 4 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><BiBook size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                                    <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Application Management</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/recruiterdash/candidateassessment' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 5 ?'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><MdOutlineAssessment size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                                    <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Candidate Assessment</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/recruiterdash/message' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 6 ?'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><MdMessage size={20} className="opacity-25 sm:w-6 sm:h-6 hover:text-white" /></div>
                                    <div><label className='text-white opacity-25 hover:text-white' style={{ fontSize: '18px' }}>Message</label></div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                    <div className='flex items-center justify-center'>
                        <div className='pt-10 fix w-fit'>
                            <NavLink to="/">
                                <button className='bg-[#EA7122] w-44 h-12 rounded-xl flex items-center justify-center'onClick={logout}>
                                    <div className='flex items-center'>
                                        <CiLogout size={24} className='mr-2 text-lg text-white ' />
                                        <span className='text-white' >LOGOUT</span>
                                    </div>
                                </button>
                            </NavLink>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
