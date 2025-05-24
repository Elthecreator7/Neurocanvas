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
                <div className='hidden md:flex items-center justify-center ml-[450px]'>
                    <div className="relative group">
                        <div className="flex gap-2 items-center"><p className="cursor-pointer font-medium text-purple-500 text-lg">Features</p> <span><FaCaretDown className='text-purple-500'></FaCaretDown></span></div>
                        <div className="absolute hidden group-hover:flex flex-col bg-white shadow-md border border-gray-100 rounded-md top-8 left-0 z-30 w-60">
                            <Link to='/bgr-home' className='hover:bg-gray-100 rounded px-2 py-1'>BG Remover</Link>
                           <div className='flex items-start hover:bg-gray-100 rounded px-2 py-1 gap-2'> <Link to='#'>AI Image Editor</Link> <span className='text-red-500 italic'>Coming Soon</span></div>
                            <div className='flex items-start hover:bg-gray-100 rounded px-2 py-1 gap-2'> <Link to='#'>Video Generator</Link> <span className='text-red-500 italic'>Coming Soon</span></div>
                        </div>
                    </div>
                </div>
                <div className="hidden md:block">
                    {
                        user ? (<div className='flex items-center gap-2 sm:gap-3'>
                            <button className='flex items-center gap-2 bg-purple-200 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700'><img src={assets.credit_star} alt="" className='w-7' />
                                <p className='text-xs sm:text-sm font-medium text-gray-600 cursor-pointer' onClick={() => navigate('/buy-credit')}>Credit left: {credit}</p>
                            </button>
                            <p className='text-gray-600 max-sm:hidden pl-4'>Hi, {user.name}</p>
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
                                <p className='cursor-pointer border border-gray-300 rounded-full px-7 py-2 bg-orange-400 text-sm hover:scale-105 transition-all duration-700' onClick={() => navigate('/buy-credit')}>Pricing</p>
                                <button className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full cursor-pointer' onClick={() => setShowLogin(true)}>Login</button>
                            </div>)
                    }
                </div>
                {/* Mobile menu Icon */}
                <div className="md:hidden">
                    <FaBars size={30} className='cursor-pointer text-purple-600' onClick={() => setmobileMenuOpen(true)}></FaBars>
                </div>
            </div>
            {/* Mobile Menu Slide-in */}

            {mobileMenuOpen && (
                <div className='fixed top-0 right-0 w-full bg-gradient-to-r from-violet-500 to-fuchsia-400 z-40 transition-all duration-300 ease-in-out h-screen'>
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
                                    <Link to='/buy-credit' className='text-white cursor-pointer p-4 hover:bg-gradient-to-r from-purple-600 to-fuchsia-500' ><p >Credits left: {credit}</p></Link>
                                    <Link to="/bgr-home" onClick={() => setmobileMenuOpen(false)} className='hover:bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white p-4'>BG Remover</Link>
                                    <div className="hover:bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white p-4 gap-5"><Link to="#" onClick={() => setmobileMenuOpen(false)}>AI Image Editor <span className='text-red-500 italic'>Coming Soon</span></Link></div>
                                    <div className="hover:bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white p-4 gap-5"><Link to="#" onClick={() => setmobileMenuOpen(false)}>Video Generator <span className='text-red-500 italic'>Coming Soon</span></Link></div>
                                    <button onClick={() => { logout(); setmobileMenuOpen(false) }} className='hover:bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white p-4 text-start'>Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to='/buy-credit' onClick={() => setmobileMenuOpen(false)} className='text-white cursor-pointer p-4 hover:bg-gradient-to-r from-purple-600 to-fuchsia-500'>Pricing</Link>
                                    <Link to='/bgr-home' onClick={() => setmobileMenuOpen(false)} className='text-white cursor-pointer p-4 hover:bg-gradient-to-r from-purple-600 to-fuchsia-500'>BG Remover</Link>
                                    <Link to='/ai-editor' onClick={() => setmobileMenuOpen(false)} className='text-white cursor-pointer p-4 hover:bg-gradient-to-r from-purple-600 to-fuchsia-500'>AI Image Editor</Link>
                                    <button onClick={() => { setShowLogin(true); setmobileMenuOpen(false); }} className='text-white cursor-pointer p-4 hover:bg-gradient-to-r from-purple-600 to-fuchsia-500 text-start'>Login</button>
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