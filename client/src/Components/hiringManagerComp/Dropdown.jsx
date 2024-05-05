import React,{ useContext } from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CgProfile } from "react-icons/cg";
import Divider from '@mui/material/Divider';
import { LuLogOut } from "react-icons/lu";
import { RiSettings5Fill } from "react-icons/ri";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { UserContext } from '../../Context/UserContext';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
    sx={{
      '& .MuiPaper-root': {
        backgroundColor: '#2b2b2b', // Set background color here
        color: '#ffffff', // Set text color if needed
        borderRadius: 6,
        marginTop: useTheme().spacing(1), // useTheme hook to access theme
        minWidth: 200, // Set width to 150px
        boxShadow:
          'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        border: '2px solid #eb7323', // Set border color and width
        '& .MuiMenu-list': {
          padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
          '& .MuiSvgIcon-root': {
            fontSize: 18,
            color: useTheme().palette.text.secondary, // useTheme hook to access theme
            marginRight: useTheme().spacing(1.5), // useTheme hook to access theme
          },
          '&:active': {
            backgroundColor: alpha(
              useTheme().palette.primary.main, // useTheme hook to access theme
              useTheme().palette.action.selectedOpacity, // useTheme hook to access theme
            ),
          },
          '&:hover': {
            backgroundColor: '#bababa17', // Set hover background color here
          },
        },
      },
    }}
  />
))();

export default function Dropdown() {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div  
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}  
        className='accLabel flex flex-row flex bg-[#2b2b2b] sm:pl-[5px] items-center justify-start rounded-[30px] gap-[4px] w-[150px] h-[45px] lg:rounded-[25px] lg:gap-[8px] lg:w-[200px] lg:h-[60px] sm:gap-[6px] sm:w-[180px] sm:h-[50px] sm:rounded-[30px] esm:w-[fit-content]'>
       { !!user &&  <img src={user.image} alt="" className='userImg rounded-[50%] border-[solid] border-[#ffffff] ml-[0.7rem] w-[35px] h-[35px] border-[1.5px] lg:w-[40px] lg:h-[40px] lg:border-[2px] md:w-[37px] md:h-[37px] md:border-[2px] esm:m-1 ' />}
        <div className='block esm:hidden sm:block'>
         { !!user && <p className='name text-[#ffffff] text-left mb-[-2px] md:mb-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem]'> {user?.lname}</p>}
         {!!user &&  <p className='post text-[#ffffff] opacity-[30%] mt-[-2px] md:mt-[-4px] text-[0.7rem] lg:text-[1rem] md:text-[0.9rem] '>{user.role}</p>}
        </div>
      </div>

      <StyledMenu 
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} className='flex flex-row gap-[10px]' disableRipple>
          <CgProfile />
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={handleClose} className='flex flex-row gap-[10px]' disableRipple>
          <RiSettings5Fill />
          Settings
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} className='flex flex-row gap-[10px]' disableRipple>
          <LuLogOut />
          Logout
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          <MoreHorizIcon />
          More
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
