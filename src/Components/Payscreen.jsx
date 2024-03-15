import React, { useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { showPayScreenAtom, reciverInfoAtom } from '../Store/atom'
import { FaArrowLeft } from "react-icons/fa";
import { GoShieldCheck } from "react-icons/go";
import NumberToText from './NumberToText'

function Payscreen() {

    const setshowPayscreen = useSetRecoilState(showPayScreenAtom)
    const reciverInfo = useRecoilValue(reciverInfoAtom)
    const [amount, setAmount] = useState('');
    const [width, setWidth] = useState(0);
    var ne = 0;
    useEffect(() => {
        if(amount){
            ne = amount.length * 20;
            setWidth(ne);
            console.log(2);
        }
        else{
            console.log(1);
            setWidth(20)
        }
    }, [amount]);

    // console.log(parseInt(amount) + 20)11
    return (
        <div className='h-full w-full absolute bg-[#000000c2] z-10 flex justify-center items-center'>
            <div className=' relative w-80 h-80 bg-white rounded-2xl'>
                {/* Header */}
                <div className='flex h-1/6 border-b-2'>
                    {/* Arrow */}
                    <div className=' mt-5 ml-2 w-4 text-base cursor-pointer text-[#026EDD]'
                        onClick={() => { setshowPayscreen(false) }}><FaArrowLeft /></div>
                    {/* Name box */}
                    <div className='flex h-full'>
                        {/* Name circle */}
                        <div className='w-10 h-10 mt-2 ml-2.5 flex justify-center items-center rounded-full bg-[#026EDD] text-xl text-white'> {reciverInfo.firstName[0]}</div>
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
                <div className=' text-3xl flex justify-center w-full h-4/6 items-center'>
                    <span className='text-xl pb-2' >&#8377;</span>
                    <input
                        type="number"
                        inputMode='numeric'
                        autoFocus
                        placeholder='0'
                        value={amount}
                        className='no-spinner'
                        style={{ outline: 'none', caretColor: '#026EDD', width: `${width}px`, minWidth: '20px' }}
                        onChange={(e) => { setAmount(e.target.value) }}
                    />
                    <NumberToText toConvert={amount}/>
                </div>
                <div className='h-1/6 w-full border-t-2 flex justify-center items-center'>
                    <button className='flex bg-[#026EDD] text-white px-3 py-2 rounded-xl' >
                        <div className='p-1'>
                            <GoShieldCheck />
                        </div>
                        Pay Securely
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Payscreen
