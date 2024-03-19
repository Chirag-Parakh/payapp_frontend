import React from 'react'
import { useState, useEffect } from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLoggedInAtom, userInfoAtom } from '../Store/atom';
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";
import axios from 'axios';
import { FaArrowLeft } from "react-icons/fa";


function Header() {
  const [isLoggedIn, setisLoggedIn] = useRecoilState(isLoggedInAtom);
  const [userInfo, setuserInfo] = useRecoilState(userInfoAtom);
  const [userName, setuserName] = useState(userInfo.username)
  const [password, setpassword] = useState('')
  const [conpassword, setconpassword] = useState('')
  const [mail, setMail] = useState(userInfo.email)
  const [firstName, setfirstName] = useState(userInfo.firstName)
  const [lastName, setlastName] = useState(userInfo.lastName)
  const [showpassword, setshowpassword] = useState(false);
  const [upperValid, setupperValid] = useState(false);
  const [lowerValid, setlowerValid] = useState(false);
  const [numValid, setnumValid] = useState(false);
  const [specValid, setspecValid] = useState(false);
  const [lenValid, setlenValid] = useState(false);
  const [passwordChanged, setpasswordChanged] = useState(false)
  const [showEditPage, setshowEditPage] = useState(false);
  const token = localStorage.getItem("token")
  const navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.removeItem('userinfo');
    localStorage.removeItem('token');
    setisLoggedIn(false)
    navigate('/')
  }
  useEffect(() => {
    { password ? setpasswordChanged(true) : setpasswordChanged(false) }
  }, [password]);

  console.log()
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

  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== conpassword) {
      return alert("Password and confirm password does not match")
    }
    try {
      let requestData = {
        username: userName,
        email: mail,
        firstName: firstName,
        lastName: lastName
      };

      if (passwordChanged) {
        requestData.password = password;
      }
      const { data } = await axios.put('http://localhost:3000/update', requestData, {
        headers: {
          'authorization': token,
        }
      })
      setuserInfo(data.UserInfo)
      console.log(data.userInfo)
      console.log(data);
      localStorage.setItem("userinfo", JSON.stringify(data.UserInfo));
      alert('info updated successfully')

    }
    catch (error) {
      console.log(error)
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
  return (
    <div className='w-full fixed bg-MidNight z-50 h-12 text-customSky flex items-center justify-between'>
      <div className='font-tiro-devanagari-hindi mx-4 mt-2 text-3xl flex items-center '>पैईसा</div>
      <div className='relative'>
        <div className='flex mr-2'>
          <div className='w-7 h-7 mx-2 bg-customSky cursor-pointer hover:opacity-80 text-MidNight rounded-full text-xl text-center' onClick={() => { setshowEditPage(true) }}>{userInfo.username[0]}</div>
          <div className='text-2xl mx-1 hover:opacity-80 cursor-pointer flex justify-center items-center' onClick={() => { handleSignOut() }}>
            {isLoggedIn ? <FaSignOutAlt /> : ""}
          </div>
        </div>
        {showEditPage &&
          <div>
            <div className='absolute flex items-start justify-center bg-customgray text-MidNight w-screen h-screen right-0 top-9 '>
              <div className=' mt-2 sm:mt-8 py-4 px-6 pb-6 min-w-72 flex flex-col justify-around  bg-customSky rounded-[24px]' >
                <div className=' text-xl mt-2 font-semibold flex '>
              <div className=' pr-2 pt-1.5 text-base cursor-pointer text-MidNight'
                onClick={() => { setshowEditPage(false) }}><FaArrowLeft /></div>
                  
                  Edit your Info</div>
                <div className='text-sm'> You can Change Any or All </div>
                <span className='border bg-black h-1 w-full mb-3 mt-5'></span>
                <form action="" onSubmit={handleUpdateFormSubmit} className='flex flex-col justify-between items-center '>
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
                      className='input-styles ml-1'
                    />
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
                    defaultValue={userName}
                  />
                  <input
                    type="password"
                    placeholder='New Password'
                    className='input-styles'
                    value={password}
                    onChange={(e) => { setpassword(e.target.value) }}
                  />
                  <div className='flex my-1 w-full justify-center items-start bg-white rounded-[24px]'>
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
                  <button type='submit' className='mt-4 px-3 text-lg bg-MidNight hover:scale-95 text-white rounded-[24px]'>Save Changes</button>
                </form>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Header
