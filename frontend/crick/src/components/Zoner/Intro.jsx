
import React from 'react'
import CrickLogo from "../../assets/CrickLogo.png";

function Intro() {
  return (
    <div className='h-screen intro flex flex-col gap-5 items-center justify-center'>
      <img src={CrickLogo} width={200} className='rounded-full introLogo'/>
    </div>
  )
}

export default Intro