import React from 'react'
import {  DotLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className='fixed inset-0 top-0 left-0 w-full bg-black opacity-50 flex items-center justify-center z-50'>
        <DotLoader size={60} color='#800080'></DotLoader>
    </div>
  )
}

export default Loader