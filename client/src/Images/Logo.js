import React from 'react'
import logo from '../Images/logo.png'

function Logo() {
    return (
        <div>
           <img src={logo} alt="hi" className='lg:h-[382px] lg:w-[auto]  md:h-[auto] md:w-[auto] sm:h-[156] sm:w-auto'/> 
        </div>
    )
}

export default Logo
