import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
      <img src={assets.logo} alt="" width={150} />
      <p className='flex-1 pl-4 border-l border-white  text-sm text-white max-sm:hidden'>Copyright @ 2025 | Digital Evolutions | All right reserved.</p>

      <div className='flex gap-2.5'>
        <a href="https://www.linkedin.com/company/digital-evolutions-ltd/" target='_blank'><img src={assets.linkedin_icon} alt="linkedin" width={35} className='cursor-pointer w-6' /> </a>
        <a href="https://www.instagram.com/digivo_/" target='_blank'><img src={assets.instagram_icon} alt="instagram" width={35} className='cursor-pointer w-6' /></a>
        <a href="https://www.youtube.com/@ScottCEneje" target='_blank'><img src={assets.youtube_icon} alt="youtube" className='cursor-pointer w-6' /></a>
      </div>
    </div>
  )
}

export default Footer