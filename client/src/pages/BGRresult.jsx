import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import Spinner from '../components/Spinner'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const BGRresult = () => {
    const { originalImage, resultImage, setOriginalImage, setResultImage, loading, setLoading, token, user, backendUrl, loadCreditData } = useContext(AppContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null)

    if (!originalImage || !resultImage) {
        navigate('/bgr-home');
        return null;
    }

    const handleFileChange = async (event) => {
        const file = event.target.files[0]
        if (!file) return;

        setOriginalImage(URL.createObjectURL(file))
        setLoading(true)

        const formData = new FormData();
        formData.append('image', file);
        // formData.append('userId', user.id)

        try {
            const res = await axios.post(`${backendUrl}/api/image/remove-bg`, formData, {
                headers: {
                    token,
                    "Content-Type": 'multipart/form-data'
                },
            }
            );
            setResultImage(res.data.image);
        } catch (error) {
            toast.error("Upload Error:", error)
        } finally {
            setLoading(false);
            loadCreditData();
        }
    }

    const triggerUpload = () => {
        if (fileInputRef.current) fileInputRef.current.click()
    }

    return (
        <div className='mx-4 my-3 lg:mx-10 mt-7 min-h-[75vh]'>

            <div className='bg-white rounded-lg px-8 py-6 drop-shadow-sm'>
                {/* Image Container */}

                <div className='flex flex-col sm:grid grid-cols-2 gap-8'>
                    {/* left side */}
                    <div>
                        <p className='font-semibold text-gray-600 mb-2'>Original</p>
                        <img className='rounded-md border border-gray-200' src={originalImage} alt="" />
                    </div>

                    <div className='flex flex-col'>
                        {/* right side */}
                        <p className='font-semibold text-gray-600 mb-2'>Background Removed</p>
                        <div className='rounded-md border border-gray-200 h-full relative bg-layer overflow-hidden'>
                            {loading ? ( <div className='absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2'>
                        <div>
                            <Spinner></Spinner>
                        </div>
                    </div>) : (<img src={resultImage} alt="" />) }
                            
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className='flex justify-center sm:justify-end items-center flex-wrap gap-4 mt-6'>
                    <button onClick={triggerUpload} className='px-8 py-2.5 text-violet-600 text-sm border border-violet-600 rounded-full hover:scale-105 transition-all duration-700'>Try another image</button>
                    <a href={resultImage} download className='px-8 py-2.5 text-white text-sm bg-gradient-to-r from-violet-600 to-fuchsia-500 rounded-full hover:scale-105 transition-all duration-700'>Download</a>
                </div>

                <input
                    type="file"
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className='hidden'
                />
            </div>
        </div>
    )
}

export default BGRresult