import React, { useEffect, useState } from 'react'
import { userInfoAtom } from '../Store/atom'
import { useRecoilValue } from "recoil";
import axios from 'axios';
import Loader from './Loader';

function Dashboard() {
    const info = useRecoilValue(userInfoAtom)
    // console.log(info)
    const Firstname = info.firstName;
    const name = Firstname[0].toUpperCase() + Firstname.slice(1)
    const token = localStorage.getItem("token")
    const [balance, setBalance] = useState('')
    const [showUsers, setShowusers] = useState(true)
    // console.log(token);
    const [UsersList, SetUsersList] = useState(null);
    console.log(token);
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
        fetchBalance();
        console.log(UsersList)
    }, [])



    return (
        <div>
            <div className='h-12 w-full'></div>
            <div className=' mt-3 flex flex-col items-center'>
                <div className='bg-customBlue w-11/12 rounded-lg flex flex-col'>
                    <div>Hello {name} !</div>
                    <div>Avalable Balance rs{balance}</div>
                </div>
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
                <div className='h-80 w-11/12 overflow-auto'>
                    {showUsers ?
                        <div className='w-full bg-customBlue'>
                            {UsersList ? (
                                UsersList.map((user, index) => (
                                    <div key={index} className='w-10/12 flex'>
                                        <div>
                                            <div>{user.firstName}</div>
                                            <div>{user.lastName}</div>
                                        </div>
                                        <div>{user.username}</div>
                                    </div>
                                ))
                            ) : (
                                <Loader />
                            )}
                        </div>
                        : <History />}
                </div>
            </div>
        </div>
    )
}

function UsersInfo() {



    return (
        <>

        </>
    )
}

function History() {
    return (
        <></>
    )
}

export default Dashboard