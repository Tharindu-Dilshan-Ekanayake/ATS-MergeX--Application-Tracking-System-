import React from 'react';
import Avatar from '../../../Components/candidateComp/sidebar/Avatar';
import { LuLayoutDashboard } from "react-icons/lu";
import { TbUserEdit } from "react-icons/tb";
import { PiCircleDashedBold } from "react-icons/pi";
import { RiInboxArchiveLine } from "react-icons/ri";
import { RiFolderUploadLine } from "react-icons/ri";
import { BsPersonVideo3 } from "react-icons/bs";
import Logout from './Logout';
import { NavLink } from 'react-router-dom';



const Sidebar = () => {

  const navLinkStyles = ({isActive}) => {
    return {
      color: isActive ? 'rgb(156 163 175)' : 'rgb(82 82 82)',
      fontWeight: isActive ? 'bold' : 'normal',
      backgroundColor: isActive ? 'rgb(115 115 115)' : 'rgb(38 38 38)'
    }
  }

  return (
    
    <div className='flex flex-col justify-between items-center bg-neutral-800 w-2/12 h-screen'>
      <Avatar />
      <div className='flex flex-col divide-y divide-neutral-600 mb-9 w-full'>

        <NavLink style={navLinkStyles} to="/candidatedash/landingPage" >
          <div className='flex justify-start   pt-3 py-3 hover:bg-neutral-700 hover:text-gray-400 pl-8'>
            <LuLayoutDashboard className='text-2xl mr-5'/>
            Dashboard
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/editProfile'>
          <div className='flex justify-start   pt-3 py-3 hover:bg-neutral-700 hover:text-gray-400 pl-8'>
            <TbUserEdit className='text-2xl mr-5'/>
            Edit Profile
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/statusPage'>
          <div className='flex justify-start   pt-3 py-3 hover:bg-neutral-700 hover:text-gray-400 pl-8'>  
            <PiCircleDashedBold className='text-2xl mr-5 ' />
            Status Updates
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/invitationPage'>
          <div className='flex justify-start   pt-3 py-3 hover:bg-neutral-700 hover:text-gray-400 pl-8'>
            <RiInboxArchiveLine className='text-2xl mr-5 ' />
            Interview Invitations
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/submissionPage'>
          <div className='flex justify-start   pt-3 py-3 hover:bg-neutral-700 hover:text-gray-400 pl-8'>
            <RiFolderUploadLine className='text-2xl mr-5 ' />
            Submit Application
          </div>
        </NavLink>

        <NavLink style={navLinkStyles} to='/candidatedash/sessionPage'>
          <div className='flex justify-start   pt-3 py-3 hover:bg-neutral-700 hover:text-gray-400 pl-8'>
            <BsPersonVideo3 className='text-2xl mr-5 ' />
            Join Interview
          </div>
        </NavLink>
       
      </div>
      <Logout />
    </div>
    
  )
}


export default Sidebar
