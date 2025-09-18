import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { FaCaretDown, FaArrowLeft, FaBars } from 'react-icons/fa'
import { motion, AnimatePresence } from 'motion/react'

const Navbar = () => {
    const { user, setShowLogin, logout, credit } = useContext(AppContext);
    const [mobileMenuOpen, setmobileMenuOpen] = useState(false);


    const navigate = useNavigate()


    return (
        <>
            <div className='flex items-center justify-between relative'>
                <Link to='/'> <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' /></Link>


                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-5">
                    <div className="relative group">
                        <button className="flex items-center gap-2 px-7 py-2 rounded-full bg-gradient-to-l from-white/20 to-[#2c3539]/25 text-sm text-white hover:bg-[#7c0fab] cursor-pointer transition">
                            Features
                            <FaCaretDown />
                        </button>

                        <div className="absolute hidden group-hover:flex flex-col mt-2 w-56 bg-white rounded-lg shadow-lg overflow-hidden z-30">
                            <Link
                                to="/bgr-home"
                                className="px-4 py-2 text-sm text-[#2c3539] hover:bg-[#f4f4f4]"
                            >
                                BG Remover
                            </Link>
                            <div className="flex justify-between items-center px-4 py-2 text-sm text-[#2c3539] hover:bg-[#f4f4f4] cursor-pointer">
                                <span>AI Image Editor</span>
                                <span className="text-xs text-white bg-[#7c0fab] px-2 py-0.5 rounded">
                                    Coming Soon
                                </span>
                            </div>
                            <div className="flex justify-between items-center px-4 py-2 text-sm text-[#2c3539] hover:bg-[#f4f4f4] cursor-pointer">
                                <span>Video Generator</span>
                                <span className="text-xs text-white bg-[#7c0fab] px-2 py-0.5 rounded">
                                    Coming Soon
                                </span>
                            </div>
                        </div>
                    </div>
                    {
                        user ? (<div className='flex items-center gap-2 sm:gap-3'>
                            <button className='flex items-center gap-2 bg-purple-500 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'><img src={assets.credit_star} alt="" className='w-7' />
                                <p className='text-xs sm:text-sm font-medium text-white cursor-pointer' onClick={() => navigate('/buy-credit')}>Credit left: {credit}</p>
                            </button>
                            <p className='text-white max-sm:hidden pl-4'>Hi, {user.name}</p>
                            <div className='relative group'>
                                <img src={user?.avatar || assets.profile_icon} className='w-10 drop-shadow rounded-full' alt="" />
                                <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-b-md border border-gray-100 text-sm'>
                                        <li onClick={logout} className='cursor-pointer py-1 px-2 pr-10'>Logout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>)
                            :
                            (<div className='flex items-center gap-5'>
                                <p className='cursor-pointer border border-[#ff4411] rounded-full px-7 py-2 bg-red-500 text-white text-sm hover:scale-105 transition-all duration-700' onClick={() => navigate('/buy-credit')}>Pricing</p>
                                <div className="rounded-full bg-gradient-to-r from-purple-500 to-red-500 p-0.5"> <button className='bg-[#7c0fab] text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer' onClick={() => setShowLogin(true)}>Login</button></div>
                            </div>)
                    }
                </div>
                {/* Mobile menu Icon */}
                <div className="md:hidden">
                    <FaBars size={30} className='cursor-pointer text-red-800' onClick={() => setmobileMenuOpen(true)}></FaBars>
                </div>
            </div>
            {/* Mobile Menu Slide-in */}

            {mobileMenuOpen && (
                <div className='fixed top-0 right-0 w-full bg-gradient-to-tr from-[#ff4411] to-[#7c0fab] z-40 transition-all duration-300 ease-in-out h-screen'>
                    <div className="p-4 flex items-center justify-between border-b border-b-white">
                        <button onClick={() => setmobileMenuOpen(false)} className='flex items-center gap-2 cursor-pointer text-white'>
                            <FaArrowLeft></FaArrowLeft>
                            <span>Back</span>
                        </button>
                        {user && (
                            <img src={user.avatar || assets.profile_icon} className='w-8 h-8 rounded-full' alt="" />
                        )}
                    </div>

                    <div className="flex flex-col gap-4 text-lg">
                        {
                            user ? (
                                <>
                                    <Link to='/buy-credit' className='text-white cursor-pointer p-4 hover:bg-gradient-to-r from-red-800 to-purple-800' ><p >Credits left: {credit}</p></Link>
                                    <Link to="/bgr-home" onClick={() => setmobileMenuOpen(false)} className='hover:bg-gradient-to-r from-red-800 to-purple-800 text-white p-4'>BG Remover</Link>
                                    <div className="hover:bg-gradient-to-r from-red-800 to-purple-800 text-white p-4 gap-5"><Link to="#" onClick={() => setmobileMenuOpen(false)}>AI Image Editor <span className='text-red-500 italic'>Coming Soon</span></Link></div>
                                    <div className="hover:bg-gradient-to-r from-red-800 to-purple-800 text-white p-4 gap-5"><Link to="#" onClick={() => setmobileMenuOpen(false)}>Video Generator <span className='text-red-500 italic'>Coming Soon</span></Link></div>
                                    <button onClick={() => { logout(); setmobileMenuOpen(false) }} className='hover:bg-gradient-to-r from-violet-600 to-blue-500 text-white p-4 text-start'>Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to='/buy-credit' onClick={() => setmobileMenuOpen(false)} className='text-white cursor-pointer p-4 hover:bg-gradient-to-r from-red-800 to-purple-800'>Pricing</Link>
                                    <Link to='/bgr-home' onClick={() => setmobileMenuOpen(false)} className='text-white cursor-pointer p-4 hover:bg-gradient-to-r from-red-800 to-purple-800'>BG Remover</Link>
                                    <div className="hover:bg-gradient-to-r from-red-800 to-purple-800 text-white p-4 gap-5"><Link to="#" onClick={() => setmobileMenuOpen(false)}>AI Image Editor <span className='text-red-500 italic'>Coming Soon</span></Link></div>
                                    <div className="hover:bg-gradient-to-r from-red-800 to-purple-800 text-white p-4 gap-5"><Link to="#" onClick={() => setmobileMenuOpen(false)}>Video Generator <span className='text-red-500 italic'>Coming Soon</span></Link></div>
                                    <button onClick={() => { setShowLogin(true); setmobileMenuOpen(false); }} className='text-white cursor-pointer p-4 hover:bg-gradient-to-r from-red-800 to-purple-800 text-start'>Login</button>
                                </>
                            )
                        }
                    </div>
                </div>
            )}
        </>
    )
}

export default Navbar