import React from 'react'

export default function Greatings() {

    const date = new Date();
    const currentTime = date.getHours();

    let greeting;

    if(currentTime >= 0 && currentTime <= 12)
    {
        greeting = "Good Morning ! ";
    }
    else if(currentTime >12 && currentTime< 14)
    {
        greeting = "Good Afternoon ! "
    }
    else
    {
        greeting = "Good Evening ! "
    }


  return (
    <div>
      <p className="text-3xl text-white text-opacity-40 font-medium">{greeting}</p>
    </div>
  )
}
