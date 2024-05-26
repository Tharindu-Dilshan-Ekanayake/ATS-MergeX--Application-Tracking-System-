import React, { useContext } from 'react';

import { UserContext } from '../../Context/UserContext';
import AdminNav from '../../Components/admincomp/AdminNav';
import Greatings from '../../Components/Greatings';

function Admindash() {
  const { user } = useContext(UserContext); // Destructure user from context
 

  return (
    <div>
      <div className='flex'>
        <div>
          <AdminNav/>
        </div>

        <div>
          
          {/* Check if user exists before accessing its properties */}
          {!!user && (
            <div>
              <div><Greatings/></div>
              <h1>Hi {user.fname} {user.lname} {user.gender} {user.email}</h1>
              
            </div>
          )}
          {/* If user doesn't exist, you may want to display a message */}
          {!user && <h1>No user found</h1>}
        </div>
      </div>
    </div>
  );
}

export default Admindash;
