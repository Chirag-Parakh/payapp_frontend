import React, { useEffect, useRef, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom';
import { showPayScreenAtom, reciverInfoAtom, balanceAtom, TransitionAtom, userInfoAtom } from '../Store/atom'
import { FaArrowLeft } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import NumberToText from './NumberToText'
import axios from 'axios';
import greentick from '../assets/Paidicon.png'

function Payscreen() {

    const setshowPayscreen = useSetRecoilState(showPayScreenAtom)
    const reciverInfo = useRecoilValue(reciverInfoAtom)
    const [amount, setAmount] = useState('');
    const [width, setWidth] = useState(0);
    const [Transition, setTransition] = useRecoilState(TransitionAtom)
    const [TransitioSucess, setTransitionSuccess] = useState(false);
    const balance = useRecoilValue(balanceAtom)
    const token = localStorage.getItem("token")
    const setshowPayScreenAtom = useSetRecoilState(showPayScreenAtom)
    const navigate = useNavigate();
    var ne = 0;
    useEffect(() => {
        if (amount) {
            ne = amount.length * 20;
            setWidth(ne);
            // console.log(2);
        }
        else {
            // console.log(1);
            setWidth(20)
        }
    }, [amount]);
    const BackToDashboard = () => {
        setTimeout(() => {
            setshowPayScreenAtom(false)
        }, 7000);
    }
    const handleTransfer = async () => {
        var amountInt = parseInt(amount)
        if (amountInt == 0) {
            alert('enter some amount')
        }
        else if (amountInt > balance) {
            alert('Insufficient Balance')
        }
        else {
            try {
                console.log(reciverInfo.username);
                console.log(token);
                const { data } = await axios.post('http://localhost:3000/accounts/transfer', {
                    toUsername: reciverInfo.username,
                    amount: amountInt
                },
                    {
                        headers: {
                            'authorization': token
                        }
                    }
                )
                console.log(data.message)
                setTransition(Transition + 1);
                setTransitionSuccess(true);
                BackToDashboard();
            }
            catch (error) {
                console.log(error)
                if (error.response && error.response.status == 400 && error.response.status == 500) {
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

    }

    return (
        <div className='relative'>
            <div className=' absolute  h-screen w-screen z-20 flex flex-col justify-center items-center '>
                <div className='h-12 w-full'></div>
                {!TransitioSucess ?
                    <div className='relative w-full h-full sm:w-96 sm:h-96 bg-customBlue sm:rounded-2xl'>
                        {/* Header */}
                        <div className=' p-2.5 sm:p-0 flex sm:h-1/6  border-MidNight border-b-2'>
                            {/* Arrow */}
                            <div className=' flex justify-center items-center ml-2 w-4 text-base cursor-pointer text-[#026EDD]'
                                onClick={() => { setshowPayscreen(false) }}><FaArrowLeft /></div>
                            {/* Name box */}
                            <div className='flex justify-center items-center h-full'>
                                {/* Name circle */}
                                <div className='w-10 h-10   ml-2.5 flex justify-center items-center rounded-full bg-[#026EDD] text-xl text-white'> {reciverInfo.firstName[0]}</div>
                                <div className='ml-2.5 h-full flex flex-col justify-center'>
                                    {/* Name */}
                                    <div className='flex text-lg h-6'>
                                        {reciverInfo.firstName}
                                        {' '}
                                        {reciverInfo.lastName}
                                    </div>
                                    {/* username */}
                                    <div className='text-[12.5px] mt-.5'>
                                        @{reciverInfo.username}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*money input*/}
                        <div className=' text-3xl flex flex-col justify-center w-full h-4/5 sm:h-4/6 items-center'>
                            <div className='h-9 flex justify-center'>
                                <span className='text-xl mb-2 ' >&#8377;</span>
                                <input
                                    type="number"
                                    inputMode='numeric'
                                    autoFocus
                                    placeholder='0'
                                    value={amount}
                                    className='no-spinner bg-customBlue'
                                    style={{ outline: 'none', caretColor: '#026EDD', width: `${width}px`, minWidth: '20px' }}
                                    onChange={(e) => { setAmount(e.target.value) }}
                                />
                            </div>
                            <div className='h-4'>
                                <NumberToText toConvert={amount} />
                            </div>
                        </div>

                        <div className=' p-3 sm:p-0 h-20 sm:h-1/6 w-full border-t-2 border-MidNight flex flex-col justify-center items-center'>
                            <button className='flex bg-[#026EDD] text-white px-3 py-2 rounded-xl mt-1' onClick={handleTransfer} >
                                <div className='p-1' >
                                    <GoShieldCheck />
                                </div>
                                Pay Securely
                            </button>
                            <div className='text-[10px] mt-1 sm:mt-0'>Powered by पैईसा</div>
                        </div>
                    </div>
                    :
                    <div className='relative w-full h-full sm:w-96 sm:h-fit  sm:rounded-2xl flex flex-col justify-center  items-center'>
                        <div className='w-9/12 h-fit sm:w-96 sm:h-fit m-1 bg-customBlue rounded-t-lg flex flex-col items-center sm:justify-around'>
                            <div className=' flex justify-start items-start w-full h-1 text-lg cursor-pointer text-MidNight px-2 pt-2'
                                onClick={() => { setshowPayscreen(false) }}><FaArrowLeft /></div>
                            <div className='text-xl sm:text-lg sm:mt-3 pt-1 m-4' >Payment Successful</div>
                            <div className='text-3xl sm:text-2xl flex items-center'>
                                <span className='' >&#8377;</span>
                                {amount}
                                <img src={greentick} alt="" className=' ml-2 sm:h-7 h-7 animate-[wiggle_2s_ease-in-out_infinite]' />
                            </div>
                            <div className='mt-2 h-7'><NumberToText toConvert={amount} /></div>
                            <div className='mb-2 text-sm'>To: @{reciverInfo.username}</div>
                            <div className='w-full'>
                                <div className='w-full h-2 sm:mt-0 bg-MidNight animate-reduWidth'></div>
                            </div>

                            {/* </div> */}
                        </div>

                    </div>
                }
            </div>
        </div>
    )
}

export default Payscreen
