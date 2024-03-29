import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa";
import { userInfoAtom  ,isLoggedInAtom} from '../Store/atom';
import { useSetRecoilState } from "recoil";
import CustomBackground from './Background';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";


function Signup() {
  const [showpassword, setshowpassword] = useState(false);
  const [userName, setuserName] = useState('')
  const [password, setpassword] = useState('')
  const [conpassword, setconpassword] = useState('')
  const [mail, setMail] = useState('')
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [upperValid, setupperValid] = useState(false);
  const [lowerValid, setlowerValid] = useState(false);
  const [numValid, setnumValid] = useState(false);
  const [specValid, setspecValid] = useState(false);
  const [lenValid, setlenValid] = useState(false);
  const setIsLoggedInAtom = useSetRecoilState(isLoggedInAtom);
  const navigate = useNavigate();
  const setuserInfo = useSetRecoilState(userInfoAtom);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== conpassword) {
      return alert("Password and confirm password does not match")
    }
    try {
      const { data } = await axios.post('https://paisaaapi.onrender.com/signup', {
        username: userName,
        password: password,
        email: mail,
        firstName: firstName,
        lastName: lastName
      })
      localStorage.setItem("token", data.token);
      setuserInfo(data.UserInfo)
      console.log(data.userInfo)
      alert(data.message);
      console.log(data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userinfo", JSON.stringify(data.UserInfo));
      setIsLoggedInAtom(true);
      if (data.token) {
        navigate('/dashboard');
      }
    }
    catch (error) {
      if (error.response && error.response.status == 400) {
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

  useEffect(() => {
    const lowerReges = /[a-z]/
    const upperReges = /[A-Z]/
    const numReges = /[0-9]/
    const specialReges = /[!@#$%&*?]/
    setupperValid(upperReges.test(password));
    setlowerValid(lowerReges.test(password));
    setnumValid(numReges.test(password));
    setspecValid(specialReges.test(password));
    if (password.length >= 8) {
      setlenValid(true);
    }
    else {
      setlenValid(false)
    }

  }, [password])
  return (
    <div className=' overflow-hidden relative w-screen h-screen flex justify-center items-center '>
      <div className='absolute pt-24'>
        <CustomBackground />
      </div>
      <div className='absolute mt-[40px] py-4 px-6 pb-6 min-w-72 flex flex-col justify-around  bg-customSky rounded-[24px]' >
        <div className=' text-xl mt-2 font-semibold'>Sign up</div>
        <div className='text-sm'> It's quick and easy.</div>
        <span className='border bg-black h-1 w-full mb-3 mt-5'></span>
        <form action="" onSubmit={handleFormSubmit} className='flex flex-col justify-between items-center '>
          <div className='flex flex-col sm:flex-row w-full'>
            <input
              type="text"
              placeholder='First Name'
              className='input-styles mr-1'
              value={firstName}
              onChange={(e) => { setfirstName(e.target.value) }}
            />
            <input
              type="text"
              placeholder='Last Name'
              value={lastName}
              onChange={(e) => { setlastName(e.target.value) }}
              className='input-styles ml-1' />
          </div>
          <input
            type="email"
            placeholder='Email address'
            className='input-styles'
            value={mail}
            onChange={(e) => { setMail(e.target.value) }}
          />
          <input
            type="text"
            placeholder='Username'
            className='input-styles'
            value={userName}
            onChange={(e) => { setuserName(e.target.value) }}
          />

          <input
            type="password"
            placeholder='Password'
            className='input-styles'
            value={password}
            onChange={(e) => { setpassword(e.target.value) }}
          />
          <div className='flex my-2 w-full justify-center items-start bg-white rounded-[24px]'>
            <input
              type={showpassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              className='px-3 py-1.5 w-full  transition-transform duration-150 focus:outline-none rounded-[24px]'
              value={conpassword}
              onChange={(e) => { setconpassword(e.target.value) }}
            />
            <div className='py-2.5 pr-4' onClick={() => { setshowpassword(!showpassword) }}>
              {showpassword ? <IoEyeOutline /> : <FaRegEyeSlash />}
            </div>
          </div>
          <div className=' text-xs mt-2 pr-3'>
            <p className='flex my-0.5'> <FaCheck color={lenValid ? 'green' : 'red'} className='mr-1.5' />At least 8 characters</p>
            <p className='flex my-0.5'> <FaCheck color={upperValid ? 'green' : 'red'} className='mr-1.5' />contains uppercase letters</p>
            <p className='flex my-0.5'> <FaCheck color={lowerValid ? 'green' : 'red'} className='mr-1.5' />contains lowercase letters</p>
            <p className='flex my-0.5'> <FaCheck color={numValid ? 'green' : 'red'} className='mr-1.5' />contains numbers</p>
            <p className='flex my-0.5'> <FaCheck color={specValid ? 'green' : 'red'} className='mr-1.5' />contains special characters</p>
          </div>
          <button type='submit' className='mt-4 px-3 text-lg bg-MidNight hover:scale-95 text-white rounded-[24px]'>Sign up</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
