import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom';

const UploadBtn = () => {
    const {handleFileChange} = useContext(AppContext);
    const navigate = useNavigate();

    return (
        <div className='pb-16'>
            <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py-16'>Remove Bg Now</h1>
            <div className=' flex items-center justify-center'>
                <input type="file" name="" id="upload2" hidden onChange={(e)=> handleFileChange(e, navigate)} />
                <label htmlFor="upload2" className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700 '>
                    <img src={assets.upload_btn_icon} width={20} alt="" />
                    <p className='text-white text-sm'>Upload your image</p>
                </label>
            </div>
        </div>
    )
}

export default UploadBtn