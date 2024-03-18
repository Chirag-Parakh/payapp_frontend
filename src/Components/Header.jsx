import React from 'react'
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem('userinfo');
    localStorage.removeItem('token');
    navigate('/')
  }
  return (
    <div className='w-full fixed bg-MidNight z-50 h-12 text-customBlue flex items-center justify-between'>
      <div className='font-tiro-devanagari-hindi mx-4 mt-2 text-3xl flex items-center '>पैईसा</div>
      <div className='pr-4 text-xl hover:opacity-80' onClick={() => { handleSignOut() }}><FaSignOutAlt /></div>
    </div>
  )
}

export default Header
