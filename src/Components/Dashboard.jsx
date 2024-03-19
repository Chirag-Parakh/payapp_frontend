import React from 'react'
import Home from './Home'
import { isLoggedInAtom } from '../Store/atom'
import { useRecoilValue } from 'recoil'

function Dashboard() {
    const isLoggedIn = useRecoilValue(isLoggedInAtom)
  return (
    <div>
        {isLoggedIn && <Home/>}
        {!isLoggedIn && <div className='h-screen w-screen flex justify-center items-center bg-red'> Login to Access Dashboard</div>}
    </div>
  )
}

export default Dashboard
