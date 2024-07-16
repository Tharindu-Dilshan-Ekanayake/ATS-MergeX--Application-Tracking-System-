import React,{ useState, useContext } from 'react';
import {  NavLink } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { IoBagHandle } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";
import { FaHandsHoldingChild } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { MdMessage } from "react-icons/md";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineMenu } from "react-icons/md"; 
import { UserContext } from '../../Context/UserContext';

function ResponsiveIcon({ IconComponent, className }) {


   // Destructure user from context


  return (
    <div className={`${className} text-[20px] sm:text-[25px] md:text-[30px] lg:text-[30px]`}>
      <IconComponent />
    </div>
  );
}


export default function Navbar(props) {
  const { user } = useContext(UserContext);
  // const[pp1,setpp]=useState('https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1709337600&semt=sph')
  const [isOpened, setIsOpened] = useState(true);

  const toggleDrawer = () => {
    setIsOpened(!isOpened);
  };
  console.log("isOpened from Topbar:",isOpened);
  const menuItem=[
      {
          path:"/hiringmanagerdash",
          name:"Dashboard",
          icon: <ResponsiveIcon IconComponent={MdDashboard} className="text-base" />,
      },
      {
          path:"/jobapproval",
          name:"Job Approval",
          icon:<ResponsiveIcon IconComponent={IoBagHandle} className="text-base" />,
      },
      {
          path:"/hiringmanagerinterviewfeedback",
          name:"Interview Feedback",
          icon: <ResponsiveIcon IconComponent={VscFeedback} className="text-base" />,
      },
      {
          path:"/hiringdecision",
          name:"Hiring Decision",
          icon: <ResponsiveIcon IconComponent={FaHandsHoldingChild} className="text-base" />,
      },
      {
          path:"/reporting",
          name:"Reporting",
          icon: <ResponsiveIcon IconComponent={BiSolidReport} className="text-base" />,
      },
      {
          path:"/hiringmanagermessage",
          name:"Message",
          icon: <ResponsiveIcon IconComponent={MdMessage} className="text-base" />,
      }
  ] 

  return{
    jsxNavbar:  (
  
   
      <div className={`navContainer  bg-[#2b2b2b]  items-center h-screen  esm:text-[0.7rem]  sm:text-[1rem]  fixed lg:fixed
    ${
      isOpened ? ' z-10 w-[100px] esm:w-[210px] sm:w-[300px] lg:static lg:w-[20%]' : ' bg-transparent w-[0px] lg:w-[20%]  lg:bg-[#2b2b2b] start1450:h-screen '
    }`}
     >
      <div className={`text-center pr-[8px]  z-50  absolute top-4 left-2 `}>
      
          <button
            className={`text-white  float-left border-[#EA7122] border-[2px] border-[solid] rounded-[5px]  block lg:hidden  ${
      isOpened ? 'text-white' : ' text-[#EA7122]'
    } `}
            type="button"
            aria-controls="drawer-navigation"
            data-drawer-target="drawer-navigation"
            data-drawer-show="drawer-navigation"
            onClick={toggleDrawer}
          >
          
            <MdOutlineMenu className={`w-[25px] h-[25px] hover:text-[#EA7122] hover:[transition:color_0.5s] hover:ease-in `} />
          </button>
        </div>

     <div className={` ${
  isOpened ? 'opacity-100 visible transition-opacity duration-200 ease-in' : 'opacity-0 invisible lg:opacity-100% lg:visible transition-opacity duration-200 ease-in'
}
`}>

     
<div className='pt-8'>
                <div className='flex items-center justify-center'>
                    <div className='items-center block '>
                        {!!user && <img src={user.image} alt='hi' className='rounded-full border-[2px] w-[250px] h-[250px]' />}
                    </div>
                </div>

                <div className='pt-4 '>
                    {!!user && <h1> {user?.fname} {user?.lname}</h1>}
                    {!!user && <h1 className='opacity-40'> {user.role} </h1>}
                </div>
            </div>
      <div className='mt-5 mb-5 menuList '>
         {
          menuItem.map((item,index)=>(
            <NavLink to={item.path} key={index} className='link flex flex-row gap-6 align-items-center pl-10 pr-10 p-[10px]  text-[#ffffff] opacity-[60%] hover:bg-[#bababa17] hover:opacity-[100%] hover:text-[#ffffff] hover:[transition:all_0.5s]'  activeclassName='active '>
              {item.icon}
              <div  className="link_text text-[1rem] 2xl:text-[1.4rem] sm:text-[1rem] esm:text-[0.7rem] mt-[2px] ">{item.name}</div>
            </NavLink>
          ))
         }
      </div>
      
      
      <div className='logOutCover items-center text-center flex 2xl:pt-[20px] '>
      <div className='m-auto flex flex-row p-[10px] bg-[#eb7323] rounded-[15px] w-[140px] 2xl:w-[180px] items-center justify-center gap-1.5 '>
      <ResponsiveIcon IconComponent={LuLogOut} className="logoutIc " />
      <button className='logOut text-white 2xl:text-[1.3rem] '>Log Out</button>
      </div>
      </div>
      </div>
    </div>
    
  ),isOpened:isOpened
  };
}