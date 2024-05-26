import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation,  } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import { MdDashboard } from 'react-icons/md';
import { IoPersonAddSharp } from 'react-icons/io5';

import { FaUserEdit } from 'react-icons/fa';

import { CiLogout } from 'react-icons/ci';
import { DiAptana } from 'react-icons/di';
import { SiPrivateinternetaccess } from 'react-icons/si';

export default function AdminNav() {
    const [activeItem, setActiveItem] = useState(null);
    const { user } = useContext(UserContext);
    
    const location = useLocation();

    useEffect(() => {
        // Update active item based on current route
        switch (location.pathname) {
            case '/admindash':
                setActiveItem(1);
                break;
            case '/admincreateuser':
                setActiveItem(2);
                break;
            case '/adminmodifyuser':
                setActiveItem(3);
                break;
           
            case '/adminaccesscontrol':
                setActiveItem(4);
                break;
            case '/adminsystemsettings':
                setActiveItem(5);
                break;
            default:
                setActiveItem(null);
        }
    }, [location.pathname]);

   
    return (
        <div className='h-screen bg-[#2B2B2B] lg:w-[320px] sm:w-fit md:w-72 w-fit'>
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
                        <Link to='/admindash' >
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
                        <Link to='/admincreateuser' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 2 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><IoPersonAddSharp size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                                    <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Create User Account</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/adminmodifyuser' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 3 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><FaUserEdit size={20} className="opacity-25 sm:w-6 sm:h-6" /></div>
                                    <div><label className='text-white opacity-25' style={{ fontSize: '18px' }}>Modify User Account</label></div>
                                </div>
                            </li>
                        </Link>
                        
                        <Link to='/adminaccesscontrol' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 4 ?'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><SiPrivateinternetaccess size={20} className="opacity-25 sm:w-6 sm:h-6 hover:text-white" /></div>
                                    <div><label className='text-white opacity-25 hover:text-white' style={{ fontSize: '18px' }}>Access Control</label></div>
                                </div>
                            </li>
                        </Link>
                        <Link to='/adminsystemsettings' className='no-underline'>
                            <li>
                                <div className={`flex items-center py-3 pl-8 hover:bg-gray-100 hover:bg-opacity-10 ${activeItem === 5 ? 'bg-[#BABABA] bg-opacity-20 text-white' : 'text-gray-100 hover:bg-gray-300 hover:text-white'}`}>
                                    <div className='mr-8'><DiAptana size={20} className="opacity-25 sm:w-6 sm:h-6 hover:text-white" /></div>
                                    <div><label className='text-white opacity-25 hover:text-white' style={{ fontSize: '18px' }}>System Settings</label></div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                    <div className='flex items-center justify-center'>
                        <div className='pt-10 fix w-fit'>
                            <Link to='/'>
                                <button className='bg-[#EA7122] w-44 h-12 rounded-xl flex items-center justify-center' >
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
