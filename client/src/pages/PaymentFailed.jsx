import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const PaymentFailed = () => {
  return (
       <div className='flex items-center justify-center px-4 py-2 mt-4'>
           <div className='w-lg border border-gray-200 shadow-md flex flex-col items-center justify-center bg-white min-h-[50vh] p-10'>
               <img src={assets.failed_icon} className='w-28' alt="" />
               <h1 className='text-red-600 text-2xl sm:text-3xl'>Payment Failed</h1>
               <p className='text-sm sm:text-lg text-gray-500 text-center'>Something went wrong, please try again</p>
   
               <p className='mt-8 text-sm text-gray-500'>For support contact us at:</p>
               <a href='#' className='mt-1 text-sm text-gray-500'>enejecaleb@gmail.com</a>
   
              <Link to='/buy-credit'> <button className='bg-red-800 cursor-pointer text-white px-6 py-2 rounded-md mt-7'>Try again</button></Link>
           </div>
       </div>
  )
}

export default PaymentFailed