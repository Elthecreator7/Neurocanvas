import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const { user, setShowLogin } = useContext(AppContext);
    const navigate = useNavigate();
    const handleClick = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    const sampleImages = [
        assets.sample_img_1,
        assets.sample_img_2,
        assets.sample_img_3,
        assets.sample_img_4,
        assets.sample_img_5,
        assets.sample_img_6
    ];

    return (
        <motion.div initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='flex flex-col justify-center items-center text-center'>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className='text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-300 mt-8 sm:mt-0'>
                <p className='text-sm'>Type it. See it. Believe it. Neurocanvas Delivers Magic</p>
                <img src={assets.star_icon} alt="" />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 2 }}
                className='text-4xl max-w-[300px]  sm:text-6xl sm:max-w-[590px] mx-auto mt-14 sm:mt-10 text-center'>Turn text to <span className='text-purple-600'>image</span>, in seconds.</motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className='text-center max-w-xl mx-auto mt-7 sm:mt-3'>Neurocanvas is where imagination meets machine magic, type anthing-literally anything and watch it burst to life like a creative genie with a GPU. from 'a cat surfing in space' to 'a robot sipping tea in paris' we have got your weird covered😉</motion.p>
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
                className='sm:text-lg text-white bg-black hover:bg-purple-800 w-auto mt-6 sm:mt-4 px-12 py-2.5 flex items-center gap-2 rounded-full cursor-pointer'
                onClick={handleClick}>Generate image
                <img src={assets.star_group} alt="" className='h-6' />
            </motion.button>


            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className='flex flex-wrap sm:grid grid-cols-3 justify-center mt-7 sm:mt-5 gap-3'>
                {
                    sampleImages.map((imgSrc, index) => (
                        <motion.img
                            whileHover={{ scale: 1.05, duration: 0.1 }}
                            src={imgSrc}
                            alt=""
                            key={index}
                            width={70}
                            className='rounded hover:scale-105 transition-all duration-300 cursor-pointer w-60 max-sm:w-20' />
                    ))
                }
            </motion.div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className='mt-2 text-neutral-600'>Generated Images from Neurocanva</motion.p>

        </motion.div>
    )
}

export default Header