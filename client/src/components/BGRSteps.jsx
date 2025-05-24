import React from 'react'
import { assets } from '../assets/assets'
import { motion } from 'motion/react'

const BGRSteps = () => {
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='mx-4 lg:mx-20 py-20 xl:py-30'>
            <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent'>Steps to remove background <br /> image in seconds</h1>

            <div className='flex items-start gap-4 flex-col sm:flex-row mt-7 xl:mt-10 justify-center'>
                <div className='flex items-start flex-wrap gap-4 bg-white border border-gray-200 drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500 cursor-pointer'>
                    <img className='max-w-9' src={assets.upload_icon} alt="" />
                    <div>
                        <p className='text-xl font-medium'>Upload Image</p>
                        <p className='text-sm text-neutral-500 mt-1'>Select an image whose background you want to remove</p>
                    </div>
                </div>

                <div className='flex items-start flex-wrap gap-4 bg-white border border-gray-200 drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500 cursor-pointer'>
                    <img className='max-w-9' src={assets.remove_bg_icon} alt="" />
                    <div>
                        <p className='text-xl font-medium'>Remove Background</p>
                        <p className='text-sm text-neutral-500 mt-1'>Select an image whose background you want to remove</p>
                    </div>
                </div>

                <div className='flex items-start flex-wrap gap-4 bg-white border border-gray-200 drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500 cursor-pointer'>
                    <img className='max-w-9' src={assets.download_icon2} alt="" />
                    <div>
                        <p className='text-xl font-medium'>Download Image</p>
                        <p className='text-sm text-neutral-500 mt-1'>Select an image whose background you want to remove</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default BGRSteps