import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className='flex flex-col items-center justify-center my-24 p-6 '>
      <h1 className='text-3xl sm:text-4xl font-semibold mb-2'>Create AI Images</h1>
      <p className='text-gray-500 mb-8'>Words are cool. Pictures are cooler. Neurocanvas Does Both</p>

      <div className='flex flex-col gap-5 md:gap-14 md:flex-row items-center '>
        <img src={assets.sample_img_1} alt="" className='w-80 xl:w-96 rounded-lg ' />
        <div>
          <h2 className='text-3xl font-medium max-w-lg mb-4'>Introducing Neurocanvas: your personal AI art machine. Just add words, and boom-instant visuals!🤯</h2>
          <p className='text-gray-600 mb-4 text-md'>Easily bring your ideas to life with our free AI image generator. Because your imagination deserves more than a blank screen. NeuroCanvas turns your thoughts into trippy, beautiful, ridiculous, or jaw-dropping images in seconds.</p>
          <p className='text-gray-600 text-md'>No design skills, no art degree—just words. Our cutting-edge AI understands your imagination and translates it into striking visuals. In seconds, Neurocanvas transforms your prompt into a polished, high-quality image. It’s like having a digital artist living in your browser—only faster, weirder, and 100% yours.</p>
        </div>
      </div>
    </motion.div>
  )
}

export default Description