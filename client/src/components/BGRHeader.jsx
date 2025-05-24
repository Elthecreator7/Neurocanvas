import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import Loader from './Loader';

const BGRHeader = () => {
    const { handleFileChange, loading, user, setShowLogin } = useContext(AppContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const triggerFileChange = (e)=>{
        if(user && user._id){
            fileInputRef.current.click()
        }else{
            setShowLogin(true)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 m lg:px-10'>
            {loading && <Loader></Loader>}
            {/* Left side */}
            <div>
                <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>
                    Remove the <br className='max-md:hidden' /> <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>background </span> from <br className='max-md:hidden' /> images instantly
                </h1>
                <p className='my-6 text-[15px] text-gray-500'>Upload your photo and get a clean, transparent background in seconds — no design skills needed. <br className='max-sm:hidden' /> Perfect for product photos, profile pictures, and more.</p>
                <div>
                    <input type="file" name="" id="upload1" hidden onChange={(e)=>{ handleFileChange(e, navigate); e.target.value = ''}} ref={fileInputRef} />
                  <button onClick={triggerFileChange} className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700'>
                    <img src={assets.upload_btn_icon} width={20} alt="" />
                     <p className='text-white text-sm'>Upload your image</p>
                  </button>
                </div>
            </div>
            {/* Right side */}
            <div className='w-full max-w-md'>
                <img src={assets.header_img} alt="" />
            </div>
        </motion.div>
    )
}

export default BGRHeader