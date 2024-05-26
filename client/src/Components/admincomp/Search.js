import React, { useContext, useState } from 'react';
import { UserContext } from '../../Context/UserContext';

export default function Search() {

    const { users } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');
  
    const filteredUsers = users.filter((user) => {
      const fullName = `${user.fname} ${user.lname}`.toLowerCase();
      const email = user.email.toLowerCase();
      const query = searchQuery.toLowerCase();
  
      return fullName.includes(query) || email.includes(query);
    });
    
  return (
    <div>
        <input
        className='text-black'
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
  )
}
