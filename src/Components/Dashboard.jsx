import React, { useEffect, useState } from 'react'
import { userInfoAtom, showPayScreenAtom, reciverInfoAtom , balanceAtom , TransitionAtom } from '../Store/atom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from 'axios';
import Loader from './Loader';
import { IoIosSearch } from "react-icons/io";
import Payscreen from './Payscreen';

function Dashboard() {
    const info = useRecoilValue(userInfoAtom);
    const [showPayscreen, setshowPayscreen] = useRecoilState(showPayScreenAtom)
    const Firstname = info.firstName;
    const name = Firstname[0].toUpperCase() + Firstname.slice(1)
    const token = localStorage.getItem("token")
    const Transition = useRecoilValue(TransitionAtom)
    const [showUsers, setShowusers] = useState(true);
    const [UsersList, SetUsersList] = useState([]);
    const [UsersFilter, setUsersFilter] = useState('');
    const [filteredUsersList, setfilteredUsersList] = useState(null);
    const  setReciverInfo = useSetRecoilState(reciverInfoAtom)
    const [balance , setBalance] = useRecoilState(balanceAtom)
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
       
        console.log(UsersList)
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
    } , [Transition])
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
        <div  >
            {showPayscreen ? <Payscreen /> : <>

                <div className='h-12 w-full'></div>
                <div className=' mt-3 flex flex-col items-center'>
                    {/* Hello box */}
                    <div className='bg-customBlue p-2 w-11/12 max-w-3xl rounded-lg flex flex-col'>
                        <div>Hello {name} !</div>
                        <div>Avalable Balance rs{balance}</div>
                    </div>
                    {/* Transfer or history button */}
                    <div className='my-10 w-full flex justify-center'>
                        <div className='flex p-1 bg-[#026EDD] rounded-lg max-w-96 w-11/12 justify-around'>
                            <div className={`sliding-buttons ${showUsers ? '' : 'bg-[#026EDD] text-white'}`} onClick={() => { setShowusers(true) }}>
                                Transfer
                            </div>
                            <div className={`sliding-buttons ${showUsers ? 'bg-[#026EDD] text-white' : ''}`} onClick={() => { setShowusers(false) }}>
                                History
                            </div>
                        </div>
                    </div>
                    {/* Transfer or history box starts from here */}
                    <div className=' w-11/12 max-w-3xl rounded-2xl bg-customBlue p-2  '>
                        {showUsers ?
                            <div className=' min-h-[31rem] w-full bg-customBlue flex flex-col'>
                                <div className='sticky top-0 w-full p-1 py-2.5 bg-customBlue '>
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
                                <div className='overflow-auto h-[29rem] scrollbar-thin scrollbar-thumb-black scrollbar-track-black' >
                                    {filteredUsersList ? (
                                        filteredUsersList.map((user, index) => (
                                            <div key={index} className=' mx-3 my-1 bg-white rounded-xl p-1  flex flex-row  justify-between items-center'>
                                                <div>
                                                    <div className='flex text-lg'>
                                                        <div className='px-1'>{user.firstName}</div>
                                                        <div>{user.lastName}</div>
                                                    </div>
                                                    <div className='text-xs px-1'>@{user.username}</div>
                                                </div>
                                                <button
                                                    className=' px-3.5 text-lg bg-[#026EDD] hover:scale-95 text-white rounded-xl'
                                                    onClick={(e) => {
                                                        setReciverInfo(user)
                                                        setshowPayscreen(true)
                                                    }}><span className='font-xs' >&#8377;</span> Pay</button>
                                            </div>
                                        ))
                                    ) : (
                                        <Loader />
                                    )}
                                </div>
                            </div>
                            : <History />}
                    </div>
                </div>
            </>}
        </div>
    )
}

function History() {
    return (
        <></>
    )
}

export default Dashboard