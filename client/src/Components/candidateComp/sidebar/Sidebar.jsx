import React from 'react';
import Avatar from '../../../Components/candidateComp/sidebar/Avatar';
import { LuLayoutDashboard } from "react-icons/lu";
import { TbUserEdit } from "react-icons/tb";
import { PiCircleDashedBold } from "react-icons/pi";
import { RiInboxArchiveLine } from "react-icons/ri";
import { RiFolderUploadLine } from "react-icons/ri";
import { BsPersonVideo3 } from "react-icons/bs";
import Logout from './Logout';
import { Link, NavLink } from 'react-router-dom';



const Sidebar = () => {

  const navLinkStyles = ({ isActive }) => {
    return {
      color: isActive ? 'rgb(156 163 175)' : 'rgb(82 82 82)',
      fontWeight: isActive ? 'bold' : 'normal',
      backgroundColor: isActive ? 'rgb(115 115 115)' : 'rgb(38 38 38)'
    }
  }

  return (

    <div className='z-10 flex flex-col items-center justify-between w-2/12 h-screen bg-neutral-800'>

      <div className='w-full h-1/5 '> <Avatar/> </div>
      
      <div className='flex flex-col w-full h-1/5 '>

        <NavLink style={navLinkStyles} to="/candidatedash/landingPage" >
          <div className='flex justify-start text-[18px] py-3 pt-3 pl-8 hover:bg-gray-100 hover:text-gray-400 hover:bg-opacity-10 dark:hover:text-neutral-300'>
            <LuLayoutDashboard className='mr-5 text-3xl' />
            Dashboard
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/editProfile'>
          <div className='flex justify-start py-3 text-[18px] pt-3 pl-8 hover:bg-gray-100 hover:text-gray-400 hover:bg-opacity-10 dark:hover:text-neutral-300'>
            <TbUserEdit className='mr-5 text-3xl' />
            Edit Profile
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/statusPage'>
          <div className='flex justify-start text-[18px] py-3 pt-3 pl-8 hover:bg-gray-100 hover:text-gray-400 hover:bg-opacity-10 dark:hover:text-neutral-300'>
            <PiCircleDashedBold className='mr-5 text-3xl ' />
            Status Updates
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/invitationPage'>
          <div className='flex justify-start text-[18px] py-3 pt-3 pl-8 hover:bg-gray-100 hover:text-gray-400 hover:bg-opacity-10 dark:hover:text-neutral-300'>
            <RiInboxArchiveLine className='mr-5 text-3xl ' />
            Interview Invitations
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/submissionPage'>
          <div className='flex justify-start text-[18px] py-3 pt-3 pl-8 hover:bg-gray-100 hover:text-gray-400 hover:bg-opacity-10 dark:hover:text-neutral-300'>
            <RiFolderUploadLine className='mr-5 text-3xl ' />
            Submit Application
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/sessionPage'>
          <div className='flex justify-start text-[18px] py-3 pt-3 pl-8 hover:bg-gray-100 hover:text-gray-400 hover:bg-opacity-10 dark:hover:text-neutral-300'>
            <BsPersonVideo3 className='mr-5 text-3xl ' />
            Join Interview
          </div>
        </NavLink>
      </div>
      <Link to='/login'>
      <div className='flex items-end justify-center w-full h-1/12'>
        <Logout />
      </div>
      </Link>

    </div>

  )
}


export default Sidebar
