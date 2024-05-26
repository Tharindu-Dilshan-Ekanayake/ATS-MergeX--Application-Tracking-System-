import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function Roleupdate() {
  const { users } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter((user) => {
    const fullName = `${user.fname} ${user.lname}`.toLowerCase();
    const email = user.email.toLowerCase();
    const mobile_number = user.phone_number.toLowerCase();
    const query = searchQuery.toLowerCase();

    return fullName.includes(query) || email.includes(query) || mobile_number.includes(query);
  });

  return (
    <div>
      <div className='pt-10 pb-10 '>
        <input
          className='text-[#ffffff] bg-[#2B2B2B] h-[40px] w-[800px] rounded-lg pl-3'
          type="text"
          placeholder="Search by name or email or mobile number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="pt-10 justify-center flex overflow-y-scroll max-h-[600px] scrollbar-w-2 scrollbar-track-gray-200 scrollbar-thumb-gray-500 scrollbar-thumb-hover-gray-700 ">
        <table>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b  border-gray-500 h-[70px]  bg-gradient-to-b from-[#2B2B2B] to-[#333333] ">
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
                    <div className="text-start">
                      {user.fname} {user.lname}
                    </div>
                    <div className="text-white text-start opacity-30">
                      {user.role}
                    </div>
                  </div>
                </td>
                <td>
                  <div className="ml-[40px] mr-[100px] text-start">
                    {user.email}
                  </div>
                </td>
                <td>
                  <div className="ml-[40px] mr-[100px] text-start">
                    {user.phone_number}
                  </div>
                </td>
                <td>
                  <div className="ml-[50px]">
                    <h1>view</h1>
                  </div>
                </td>
                <td>
                  <div className="ml-[50px] pr-[30px]">
                    <h1>Edit</h1>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}