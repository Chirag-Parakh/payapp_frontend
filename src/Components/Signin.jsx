import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import {userInfo} from '../Store/atom';
import { useSetRecoilState } from "recoil";

function Signin() {
    const [userName, setuserName] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate();
    const setuserInfo = useSetRecoilState(userInfo)
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/signin', {
                username: userName,
                password: password
            })
            localStorage.setItem("token", data.token);
            alert(data.message);
            console.log(data);
            if (data.token) {
                navigate('/dashboard');
            }
            setuserInfo(data.UserInfo)
        }
        catch (error) {
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
        <div className=' w-screen h-screen flex justify-center items-center bg-slate-300'>
            <div className=' py-4 px-6 w-80 border-2 border-blue-950 rounded flex flex-col justify-around bg-white' >
                <form action="" onSubmit={handleFormSubmit} className='flex flex-col justify-between items-center'>
                    <input
                        type="text"
                        placeholder='Username'
                        className='input-styles py-2'
                        value={userName}
                        onChange={(e) => { setuserName(e.target.value) }}
                        required
                    />

                    <input
                        type="textS"
                        placeholder='Password'
                        className='input-styles py-2'
                        value={password}
                        onChange={(e) => { setpassword(e.target.value) }}
                        required
                    />
                    <button type='submit' className='mt-4 px-3 text-lg bg-blue-950 hover:scale-95 text-white rounded'>Sign In</button>
                    <span className='border border-blue-950 w-full mt-5'></span>
                    <button className='mt-4 px-3 py-1 text-xg bg-blue-950 hover:scale-95 text-white rounded' onClick={() => {navigate('/signup');}}>Create new account</button>

                </form>
            </div>
        </div>
    )
}

export default Signin
