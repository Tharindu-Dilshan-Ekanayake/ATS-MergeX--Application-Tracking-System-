import React, { useState } from 'react';

export default function AdminAccess() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className='flex justify-center'>
      <h1>Admin Access</h1>
    <div className='flex border'>
        <label>
            Create User Account
        </label>
        <label>
            <input
            type="radio"
            value="option1"
            checked={selectedOption === "option1"}
            onChange={handleOptionChange}
            />
            Turn On
        </label>
        <label>
            <input
            type="radio"
            value="option2"
            checked={selectedOption === "option2"}
            onChange={handleOptionChange}
            />
            Turn Off
        </label>
    </div>
      

    </div>
  );
}
