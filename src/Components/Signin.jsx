import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { userInfoAtom  , isLoggedInAtom } from '../Store/atom';
import { useSetRecoilState , useRecoilState } from "recoil";
import CustomBackground from './Background';
import { FaRegEyeSlash  } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
function Signin() {
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')
    const [showpassword , setshowpassword] = useState(false);
    const [IsLoggedIn , setIsLoggedIn] = useRecoilState(isLoggedInAtom);
    const navigate = useNavigate();
    const setuserInfo = useSetRecoilState(userInfoAtom)
    useEffect(() => {
        if(IsLoggedIn){
            navigate('/dashboard')
        }
    } , []) 
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/signin', {
                username: userName,
                password: password
            })
            console.log(data.UserInfo);
            setuserInfo(data.UserInfo);
            localStorage.setItem("token", data.token);
            localStorage.setItem("userinfo", JSON.stringify(data.UserInfo));
            setIsLoggedIn(true)
            if (data.token) {
                navigate('/dashboard');
            }
        }
        catch (error) {
            console.log(error);
            if (error.response && (error.response.status == 401 || error.response.status == 404)) {
                if (error.response.data && error.response.data.message) {
                    alert(error.response.data.message)
                }
                else {
                    alert('unkown erroe occured')
                }
            }
            else {
                alert('Network error or server is down');
            }
        }
    }
    return (
        <div className='overflow-hidden relative w-screen h-screen flex justify-center items-center '>
            <div className='pt-20'>
                <CustomBackground/>
            </div>
            <div  className=' absolute py-4 px-6 max-w-80 w-11/12  rounded-[24px] flex flex-col justify-around bg-customSky' >
                <form action="" onSubmit={handleFormSubmit} className='flex flex-col justify-between items-center'>
                    <input
                        type="text"
                        placeholder='Username'
                        className='input-styles py-2 '
                        value={userName}
                        onChange={(e) => { setuserName(e.target.value) }}
                        required
                    />
                    <div className='relative flex w-full bg-white'>
                    <input
                        type={showpassword ? 'text' : 'password'}
                        placeholder='Password'
                        className='absolute px-3 py-1.5 border-b w-full my-2 transition-transform duration-150 focus:outline-none rounded-[24px]'
                        value={password}
                        onChange={(e) => { setpassword(e.target.value) }}
                        required
                    />
                    <div className='absolute z-10 right-0 text-MidNight mx-4 pt-.5 my-4 text-lg' onClick={() => {setshowpassword(!showpassword)}}>
                        {showpassword ?<IoEyeOutline /> :<FaRegEyeSlash /> }
                    </div>

                    </div>
                    <button type='submit' className='relative mt-16 px-4 text-lg bg-MidNight hover:scale-95 text-white rounded-[24px]'>Sign In</button>
                    <span className='border bg-black h-1 w-full mt-5'></span>
                    <button className='mt-4 px-3 py-1 text-xg bg-MidNight hover:scale-95 text-white rounded-[24px]' onClick={() => { navigate('/signup'); }}>Create new account</button>

                </form>
            </div>
        </div>
    )
}

export default Signin
