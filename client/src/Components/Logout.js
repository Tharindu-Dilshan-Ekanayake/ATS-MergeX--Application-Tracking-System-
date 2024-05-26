import React from 'react';
import { Link } from 'react-router-dom';


export default function Logout() {
  return (
    <div>
      <div>
        <Link to='/'>
        <button className='h-12 px-12 bg-orange-600 rounded-xl md:w-auto'>Logout</button>
        </Link>
        
      </div>
    </div>
  )
}
