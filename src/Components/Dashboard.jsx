import React from 'react'
import { userInfoAtom } from '../Store/atom'
import { useRecoilValue } from "recoil";

function Dashboard() {
    const info = useRecoilValue(userInfoAtom)
    console.log(info)


    return (
        <div>
            <div className='h-12 w-full'></div>
            <div className=' mt-3 flex justify-center '>
                <div className='bg-customBlue w-11/12 h-40 rounded-lg'>
                    {info.firstName}
                </div>
                <div>

                </div>
            </div>
        </div>
    )
}

export default Dashboard