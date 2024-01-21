import React, { useContext } from 'react'


import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'

import { FaTwitter } from 'react-icons/fa'
import quescon from '../contextapi/QuesContext'

export default function Signup({ visible, onClose }) {
    const [log, setlog] = useState(true);
    const [login, setlogin] = useState({ "name": "", "email": "", "password": "" })
    const context = useContext(quescon);
    const { getUser, getQuestions } = context;
    const handleclick = async (e) => {
        e.preventDefault()
        // console.log("values dekhi",log.email,log.password)
        const response = await fetch("https://backend-ai-theta.vercel.app/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "email": login.email, "password": login.password })
        });
        const json = await response.json();
        // console.log(json)
        if (json.success) {
            //Redirect
            // localStorage.setItem('token', json.authtoken)
            alert("Logged-In Successfully ", "success")
            await localStorage.setItem('auth-token', json.authtoken)
            getUser();
            onClose();
            getQuestions();
        }
        else {
            alert("Invalid Cerendentials.....", "danger")
        }
    }
    const handleClick = async (e) => {
        e.preventDefault()
        // console.log("values dekhi",log.email,log.password)
        const response = await fetch("https://backend-ai-theta.vercel.app/api/auth/createuser", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "name": login.name, "email": login.email, "password": login.password })
        });
        const json = await response.json();
        // console.log(json)
        if (json.success) {
            alert("Account created successfully....", "success")
            localStorage.setItem('auth-token', json.authtoken)
            getUser();
            onClose();
            getQuestions();

        }
        else {
            alert("Email already Registered!Please input another email....", "danger")
        }
    }

    if (!visible) {
        return null;
    }

    return (
        <>
            <div className='bg-opacity-50 inset-0 fixed z-50  justify-center mt-[13vh]'>
                <div className='rounded-md border-2 border-slate-300  w-[50%] h-[90%] sm:w-[40vw] sm:h-[82vh] mx-auto
     bg-slate-100 bg-gradient-to-br
     from-[#101010]  to-[#383838]'>
                    <div className='text-end p-2'>
                        <button className='dark:text-white text-black hover:shadow-slate-800 justify-end mr-4 font-extrabold text-xl hover:shadow-lg
             dark:hover:shadow-slate-200 rounded-lg'
                            onClick={() => {
                                onClose();
                            }}
                        >X</button>

                    </div>

                    <div className='flex justify-around'>
                        <div><button className='md:h-[8vh] h-8 w-10 md:text-sm text-xs md:w-[12vw] dark:bg-slate-400 bg-slate-500
                         hover:bg-slate-600 text-white font-semibold dark:hover:bg-slate-300'
                            onClick={() => setlog(true)}>Login</button> </div>
                        <div><button className='md:h-[8vh] h-8 w-10 md:text-sm text-xs md:w-[12vw] dark:bg-slate-400 bg-slate-500
                         hover:bg-slate-600 text-white font-semibold dark:hover:bg-slate-300'
                            onClick={() => setlog(false)}>Signup</button> </div>
                    </div>
                    {log && <div className='forlog' >
                        <div className='dark:text-white my-2'>
                            <p className='text-center md:text-sm text-xs'> Sign in with:</p>
                        </div>
                        <div className='md:flex hidden justify-center py-6 space-x-3 lg:space-x-12'>
                            <div><FcGoogle className='md:h-7 md:w-7 h-3 w-3 hover:shadow-lg rounded-lg hover:shadow-orange-400 hover:cursor-pointer dark:hover:shadow-[#d8d5d5cb]' /></div>
                            <div><FaFacebookF className='md:h-7 md:w-7 h-3 w-3 hover:shadow-lg rounded-lg hover:shadow-blue-600 hover:cursor-pointer dark:hover:shadow-[#d8d5d5cb] text-blue-700' /></div>
                            <div><FaTwitter className='md:h-7 md:w-7 h-3 w-3 hover:shadow-lg rounded-lg hover:shadow-blue-300 hover:cursor-pointer dark:hover:shadow-[#d8d5d5cb] text-blue-400' /></div>
                        </div>
                        <div className='py-3'>
                            <div className='my-1'><p className='text-center text-white  md:text-sm text-xs'>or:</p></div>
                            <div className='text-center'>
                                <input type='text' className='h-[6vh] bg-slate-500 hover:bg-slate-400  md:text-sm text-xs
                                rounded-md w-[60%]
                     text-white px-4 p-1  placeholder:text-slate-200'
                                    placeholder='Email '
                                    onChange={((e) => {
                                        setlogin({
                                            ...login,
                                            email: e.target.value
                                        })
                                    })}
                                />
                            </div>
                            <div className='text-center mt-6'>
                                <input type='text' className='h-[6vh] w-[60%] hover:bg-slate-400   md:text-sm text-xs
                                 bg-slate-500 rounded-md
                    text-white px-4 p-1 placeholder:text-slate-200' placeholder='Password'
                                    onChange={((e) => {
                                        setlogin({
                                            ...login,
                                            password: e.target.value
                                        })
                                    })}
                                />
                            </div>
                            <div className='text-center mt-6'>
                                <button className='h-[6vh] w-[60%] bg-blue-700 hover:bg-blue-600  md:text-sm text-xs
                                 text-white rounded-md'
                                    onClick={handleclick}
                                >Sign in </button>
                            </div>
                            <div className=' mt-6 flex justify-center  md:text-sm text-xs'>
                                <p className='dark:text-white'>Not a member?</p>
                                <p className='text-blue-500 hover:cursor-pointer
                                 font-semibold hover:underline '
                                    onClick={() => setlog(false)}
                                >Register</p>
                            </div>
                        </div>
                    </div>}
                    {
                        !log &&
                        <div className="forsign">
                            <div className='dark:text-white my-2'>
                                <p className='text-center'> Sign up with:</p>
                            </div>
                            <div className='flex justify-center py-6 space-x-12'>
                                <div><FcGoogle className='h-7 w-7 hover:shadow-lg rounded-lg hover:shadow-orange-400 hover:cursor-pointer dark:hover:shadow-[#d8d5d5cb]' /></div>
                                <div><FaFacebookF className='h-7 w-7 hover:shadow-lg rounded-lg hover:shadow-blue-600 hover:cursor-pointer dark:hover:shadow-[#d8d5d5cb] text-blue-700' /></div>
                                <div><FaTwitter className='h-7 w-7 hover:shadow-lg rounded-lg hover:shadow-blue-300 hover:cursor-pointer dark:hover:shadow-[#d8d5d5cb] text-blue-400' /></div>
                            </div>
                            <div className='py-2'>
                                <div className='my-1'><p className='text-center text-white'>or:</p></div>
                                <div className='text-center mt-2'>
                                    <input type='text' className='h-[6vh] hover:bg-slate-400 bg-slate-500 rounded-md w-[60%] text-white px-4 p-1  placeholder:text-slate-200' placeholder='Name' />
                                </div>
                                <div className='text-center mt-2'>
                                    <input type='text' className='h-[6vh] hover:bg-slate-400 bg-slate-500
                                     rounded-md w-[60%] text-white px-4 p-1  placeholder:text-slate-200'
                                        placeholder='Username'
                                        onChange={((e) => {
                                            setlogin({
                                                ...login,
                                                name: e.target.value
                                            })
                                        })}
                                    />
                                </div>
                                <div className='text-center mt-2'>
                                    <input type='text' className='h-[6vh] hover:bg-slate-400 bg-slate-500
                                     rounded-md w-[60%] text-white px-4 p-1  placeholder:text-slate-200'
                                        placeholder='Email'
                                        onChange={((e) => {
                                            setlogin({
                                                ...login,
                                                email: e.target.value
                                            })
                                        })} />
                                </div>
                                <div className='text-center mt-2'>
                                    <input type='text' className='h-[6vh] hover:bg-slate-400
                                     bg-slate-500 rounded-md w-[60%] text-white px-4 p-1 
                                      placeholder:text-slate-200' placeholder='Password'
                                        onChange={((e) => {
                                            setlogin({
                                                ...login,
                                                password: e.target.value
                                            })
                                        })}

                                    />
                                </div>
                                <div className='text-center mt-4'>
                                    <button className='h-[6vh] w-[60%] bg-blue-700 text-white 
                                    rounded-md'
                                        onClick={handleClick}

                                    >Sign up </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
