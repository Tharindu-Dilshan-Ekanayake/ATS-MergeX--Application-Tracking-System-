import React, { useContext, useState } from 'react';
import axios from 'axios'; // Import axios
import { UserContext } from '../../Context/UserContext';
import { GrFormView } from "react-icons/gr";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import ViewUserCard from './ViewUserCard';
import Updateuser from './Updateuser';
import RoleAssignment from './RoleAssignment';
import { toast } from 'react-hot-toast';

export default function GetModify() {
 
  const { users, setUsers } = useContext(UserContext); // Destructure setUsers from UserContext
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleUserUpdate = (user) => {
    setSelectedUser(user);
    setShowModal1(true);
    
  }

  const handleRole = (user) => {
    setSelectedUser(user);
    setShowModal2(true);
  }

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
    
  };

  const handleModalClose = async () => { // Define handleModalClose as async function
    setShowModal(false);
    setSelectedUser(null);
    setShowModal1(false);
    setShowModal2(false)

    // Refresh user list after closing the modal
    try {
      const response = await axios.get('/getusers');
      setUsers(response.data);
    } catch (error) {
      console.error('Error refreshing user list:', error);
    }
  };

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.fname} ${user.lname}`.toLowerCase();
    const email = user.email.toLowerCase();
    const mobile_number = user.phone_number.toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query) || mobile_number.includes(query);
  });
  
  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/deleteuser/${userId}`);

      //after deletion, i want refresh my user list
      const response = await axios.get('/getusers');
      setUsers(response.data);

      toast.success( 'Deleted Successsfully')
    }catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  

  return (
    <div>
      <div className="pt-10 pb-10">
        <input
          className="text-[#ffffff] bg-[#2B2B2B] h-[40px] w-[800px] rounded-3xl pl-3"
          type="text"
          placeholder="Search by name or email or mobile number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="pt-10 justify-center flex overflow-y-scroll max-h-[600px] scrollbar-w-2 scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-thumb-hover-gray-700">
        <table>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-b border-gray-500 h-[70px] bg-gradient-to-b from-[#2B2B2B] to-[#333333]"
              >
                <td>
                  <div className="w-[100px] pl-[30px]">
                    <img
                      src={user.image}
                      alt={user.fname}
                      className="w-[50px] h-[50px] border-[1px] rounded-full"
                    />
                  </div>
                </td>
                <td>
                  <div className="ml-[40px] mr-[100px]">
                    <div className="text-start">{user.fname} {user.lname}</div>
                    <div className="text-white text-start opacity-30">{user.role}</div>
                  </div>
                </td>
                <td>
                  <div className="ml-[40px] mr-[100px] text-start">{user.email}</div>
                  <div className="ml-[40px] mr-[100px] text-start">{user.phone_number}</div>
                </td>
                <td>
                  <div className="ml-[50px]">
                    <button onClick={() => handleUserClick(user)}>
                      <GrFormView className="size-[50px] hover:size-[40px] hover:opacity-40" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="ml-[50px] ">
                    <button onClick={() => handleUserUpdate(user)}>
                      <FaUserEdit className="size-[40px]  hover:size-[40px] hover:opacity-40" />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="ml-[50px]">
                    <button onClick={() => handleRole(user)} >
                      <FaUsersGear className="size-[40px]  hover:size-[40px] hover:opacity-40 " />
                    </button>
                  </div>
                </td>
                <td>
                  <div className="ml-[50px] pr-[30px]">
                    <button onClick ={() => handleDeleteUser(user._id)} >
                      <h1 className='text-red-500'>
                        <MdDeleteForever className="size-[35px]  hover:size-[35px] hover:opacity-35  " />  
                      </h1>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <ViewUserCard 
            visible={showModal}
            onClose={handleModalClose}
            user={selectedUser}
          />
        </div>
        
        <div>
          <Updateuser
            visible={showModal1}
            onClose={handleModalClose}
            user={selectedUser}
          />
        </div>

        <div>
          <RoleAssignment
            visible={showModal2}
            onClose={handleModalClose}
            user={selectedUser}
          />
        </div>
        
      </div>
    </div>
  );
}
