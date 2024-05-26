import React from 'react'
import Sidebar from '../../../src/Components/candidateComp/sidebar/Sidebar'
import RightContainer from '../../../src/Components/candidateComp/rightContainer/RightContainer'
import '../../Pages/candidate/customStyle.css';





export default function Candidatedash() {
  return (
      <div className='flex'>
        <Sidebar />
        <RightContainer />
      </div>
  )
}
