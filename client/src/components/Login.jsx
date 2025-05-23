import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from 'motion/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

    const [state, setState] = useState('Login');
    const { setShowLogin, backendUrl, setToken, setUser, handleGoogleLogin} = useContext(AppContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (state === 'Login') {
                const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password })

                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }

            } else {
                const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password })

                if (data.success) {
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token', data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center h-screen'>
            <motion.form
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
                <p className='text-sm text-center'>{state === "Login" ? 'Welcome back, login to continue' : 'Sign up to enjoy the features of Neurocanvas'}</p>
                {state !== 'Login' &&
                    <div className='border border-gray-200 px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                        <img src={assets.profile_icon} className='h-5' alt="" />
                        <input type="text" onChange={e => setName(e.target.value)} value={name} className='outline-none text-sm' placeholder='Name' required />
                    </div>
                }
                <div className='border border-gray-200 px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.email_icon} alt="" />
                    <input type="email" onChange={e => setEmail(e.target.value)} value={email} className='outline-none text-sm' placeholder='Email ID' required />
                </div>
                <div className='border border-gray-200 px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="" />
                    <input type="password" onChange={e => setPassword(e.target.value)} value={password} className='outline-none text-sm' placeholder='Password' required />
                </div>

                <p className='text-sm text-purple-600 my-4 cursor-pointer'>Forgot password</p>
                <button className='bg-purple-600 w-full text-white py-2 rounded-full cursor-pointer'>{state === "Login" ? 'Login' : 'Create Account'}</button>

                <div className="flex flex-col items-center mt-4">
                    <p className="text-sm text-slate-500 mb-2">or </p>
                    <GoogleLogin
                    onSuccess={(credentialResponse)=>{
                        if(credentialResponse.credential){
                            handleGoogleLogin(credentialResponse.credential);
                        }else{
                            toast.error("Google login failed");
                        }
                    }}
                    onError={()=>{
                        toast.error("Google login error")
                    }}
                    width={100}
                    ></GoogleLogin>
                </div>

                {
                    state === "Login" ? <p className='mt-5 text-center'>Don't have an account? <span className='text-purple-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></p> :

                        <p className='mt-5 text-center'>Already have an account? <span className='text-purple-600 cursor-pointer' onClick={() => setState('Login')}>Login</span></p>
                }

                <img src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' onClick={() => setShowLogin(false)} />
            </motion.form>
        </div>
    )
}

export default Login