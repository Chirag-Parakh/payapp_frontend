import React, { useEffect, useState } from 'react'
import { userInfoAtom, showPayScreenAtom, reciverInfoAtom, balanceAtom, TransitionAtom } from '../Store/atom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from 'axios';
import Loader from './Loader';
import { IoIosSearch } from "react-icons/io";
import Payscreen from './Payscreen';
import CustomBackground from './Background';

function Home() {
    const info = useRecoilValue(userInfoAtom);
    const [showPayscreen, setshowPayscreen] = useRecoilState(showPayScreenAtom)
    const Firstname = info.firstName;
    const name = Firstname[0].toUpperCase() + Firstname.slice(1)
    const token = localStorage.getItem("token")
    const [showBalance, setshowBalance] = useState(false)
    const Transition = useRecoilValue(TransitionAtom)
    const [showUsers, setShowusers] = useState(true);
    const [UsersList, SetUsersList] = useState([]);
    const [transitionsList, SettransitionsList] = useState([]);
    const [UsersFilter, setUsersFilter] = useState('');
    const [filteredUsersList, setfilteredUsersList] = useState(null);
    const setReciverInfo = useSetRecoilState(reciverInfoAtom)
    const [balance, setBalance] = useRecoilState(balanceAtom)
    const today = new Date();
    const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    console.log(transitionsList)
    useEffect(() => {
        const getusers = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/users',
                    {
                        headers: {
                            'authorization': token,
                        }
                    })
                SetUsersList(data.message);
            }
            catch (error) {
                console.log(error)
            }
        }
        getusers();
    }, [])


    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/accounts/getbalance',
                    {
                        headers: {
                            'authorization': token,
                        }
                    })
                setBalance(data.message.balance);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchBalance();
        const getTransitions = async () => {
            try {
                const { data } = await axios.get('http://localhost:3000/accounts/transitions',
                    {
                        headers: {
                            'authorization': token,
                        }
                    })
                SettransitionsList(data.message)
            }
            catch { }
        }
        getTransitions();
        console.log(UsersList)
    }, [Transition])
    useEffect(() => {
        const regex = new RegExp(UsersFilter, "i")
        const filterarray = async () => {
            const FilteredArray = UsersList.filter(user =>
                regex.test(user.firstName) ||
                regex.test(user.lastName) ||
                regex.test(user.username)
            )
            setfilteredUsersList(FilteredArray)
        }
        filterarray();
    }, [UsersFilter, UsersList])




    return (
        <div className="relative">
            <div className="absolute inset-0 z-0 pt-6">
                <CustomBackground />
                {/* Background content */}
            </div>
            <div className="absolute inset-0 z-10">
                <div >
                    {showPayscreen ? <Payscreen /> : <>

                        <div className='h-12 w-full'></div>
                        <div className=' mt-3 flex flex-col items-center'>
                            {/* Hello box */}
                            <div className=' w-11/12 max-w-3xl flex mt-4 flex-col'>
                                <div className=' bg-cyan h-6 pt-1 z-10 pl-1 pr-1 rounded-t-md '>
                                    <div className='w-full h-10 flex justify-between bg-white rounded-t text-lg'>
                                        <div className='flex text-2xl justify-start items-center w-1/2 pl-5'>
                                            Hello&nbsp;<span className='text-cyan' > {name} </span>
                                        </div>
                                        {showBalance ?
                                            <div className=' text-[18px] flex text-MidNight cursor-pointer justify-center items-center pr-5' onClick={() => { setshowBalance(false) }}><span className='font-xs pr-[2px]' >&#8377;</span>{balance}</div>
                                            :
                                            <div className='text-cyan text-sm flex cursor-pointer justify-center items-center pr-3' onClick={() => { setshowBalance(true) }}>Check Balance</div>
                                        }
                                    </div>
                                </div>
                                <div className=' border-4 border-MidNight h-6 pb-1 pl-1 pr-1 rounded-b-md'>
                                </div>
                            </div>
                            {/* Transfer or history button */}
                            <div className='mt-10 w-full flex justify-center'>
                                <div className={`flex  ${!showUsers ? 'bg-MidNight' : 'bg-customSky '} rounded-t-lg w-11/12 max-w-3xl justify-around`}>
                                    <div className={` w-1/2 py-2 text-lg text-center rounded-t-lg text-white bg-MidNight`} onClick={() => { setShowusers(true) }}>
                                        Transfer
                                    </div>
                                    <div className={` w-1/2 py-2 text-lg text-center rounded-t-lg bg-customSky  text-white}`} onClick={() => { setShowusers(false) }}>
                                        History
                                    </div>
                                </div>
                            </div>
                            {/* Transfer or history box starts from here */}
                            <div className={`w-11/12 max-w-3xl rounded-b-2xl  p-2 ${showUsers ? 'bg-MidNight' : 'bg-customSky '}`}>
                                {showUsers ?
                                    // user Table
                                    <div className=' min-h-[39rem] sm:min-h-[31rem] w-full bg-MidNight flex flex-col'>
                                        <div className='sticky top-0 w-full p-1 py-2 bg-MidNights '>
                                            <div className='flex w-44 bg-white rounded-xl p-1 ml-2'>
                                                <IoIosSearch className=' text-xl m-1' />
                                                <input
                                                    className=' w-full focus:outline-none rounded-r-lg  '
                                                    type="text"
                                                    placeholder='search'
                                                    onChange={(e) => { setUsersFilter(e.target.value) }}
                                                />
                                            </div>
                                        </div>
                                        <div className='overflow-auto  sm:h-[29rem]  h-[35rem] scrollbar-thin scrollbar-thumb-black scrollbar-track-black' >
                                            {filteredUsersList ? (
                                                filteredUsersList.map((user, index) => (
                                                    user.username !== info.username && (
                                                        <div key={index} className=' mx-3 my-1 bg-white rounded-xl p-1  flex flex-row  justify-between items-center'>
                                                            <div>
                                                                <div className='flex text-lg h-6 '>
                                                                    <div className='px-1'>{user.firstName}</div>
                                                                    <div>{user.lastName}</div>
                                                                </div>
                                                                <div className='text-xs px-1 pb-0.5'>@{user.username}</div>
                                                            </div>
                                                            <button
                                                                className=' px-3 py-1 text-md bg-MidNighthover:scale-95 text-white bg-MidNight rounded-xl'
                                                                onClick={(e) => {
                                                                    setReciverInfo(user)
                                                                    setshowPayscreen(true)
                                                                }}><span className='font-xs' >&#8377;</span> Pay</button>
                                                        </div>
                                                    )
                                                ))
                                            ) : (
                                                <Loader />
                                            )}
                                        </div>
                                    </div>
                                    : <div className=' min-h-[39rem] sm:min-h-[31rem]  w-full bg-customSky flex flex-col'>
                                        <div className='overflow-auto pt-2 sm:pt-0 h-[38rem] sm:h-[29rem] scrollbar-thin scrollbar-thumb-black scrollbar-track-black' >
                                            {transitionsList ? (
                                                transitionsList.slice().reverse().map((transition, index) => (
                                                    <div key={index} className=' mx-3 my-1 bg-white rounded-xl p-3  flex flex-row  justify-between items-center'>
                                                        <div className='flex flex-col'>
                                                            <div className='text-lg text-MidNight' >
                                                                {transition.tousername == info.username ? transition.fromusername : transition.tousername}
                                                            </div>
                                                            <div className='text-xs'>
                                                                {((new Date(new Date(transition.date).getFullYear(), new Date(transition.date).getMonth(), new Date(transition.date).getDate())) - todayWithoutTime) == 0 && <div>Today</div>}
                                                                {(todayWithoutTime -
                                                                    (new Date(new Date(transition.date).getFullYear(), new Date(transition.date).getMonth(),
                                                                        new Date(transition.date).getDate())
                                                                    )) == 86400000 && <div>Yesterday</div>}
                                                                {(todayWithoutTime -
                                                                    (new Date(new Date(transition.date).getFullYear(), new Date(transition.date).getMonth(),
                                                                        new Date(transition.date).getDate())
                                                                    )) > 86400000 && <div>{new Date(transition.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>}
                                                            </div>
                                                        </div>
                                                        <button
                                                            className={`text-md  flex hover:scale-95 rounded-xl  ${transition.tousername == info.username ? 'text-green-600' : 'text-red-600'}`}
                                                        ><div>{transition.tousername == info.username ? '+' : '-'}</div><span className='font-xs' >&nbsp;&#8377;</span>{transition.amount}</button>
                                                    </div>
                                                ))
                                            ) : (
                                                <Loader />
                                            )}
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </>}
                </div>
                {/* Foreground content */}
            </div>
        </div>
    )
}



export default Home;