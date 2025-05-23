import React from 'react'

const Spinner = () => {
  return (
    <div className='flex items-center justify-center min-h-[70vh]'>
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export default Spinner