import React from 'react'

function Header() {
  return (
    <div className='w-full fixed bg-blue-950 h-12 text-white flex items-center justify-between'>
      <div className='font-tiro-devanagari-hindi mx-2 mt-1 text-2xl flex items-center '>पैईसा</div>
      <div className='border-2 rounded-md px-1 mx-2 cursor-pointer'>Sign in</div>
    </div>
  )
}

export default Header
