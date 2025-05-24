import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import ButtonSpinner from '../components/ButtonSpinner';

const AIEditor = () => {
    const { user, token, backendUrl, loadCreditData } = useContext(AppContext);
    const [prompt, setPrompt] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [resultImage, setResultImage] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
        setResultImage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("prompt", prompt);
        console.log("Image file", imageFile);
        console.log("user id", user._id);
        console.log("user", user)

        if (!prompt || !imageFile || !user?._id) {
            toast.error("Missing required data. please ensure you are logged in.")
            return;
        }
        setLoading(true);

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('prompt', prompt);
        formData.append('userId', user?._id);

        try {
            const res = await axios.post(`${backendUrl}/api/image/edit-image`, formData, {
                headers: {
                    token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResultImage(res.data.image);
        } catch (error) {
            console.log("Edit Error:", error);
            toast.error("Failed to edit image");
        } finally {
            setLoading(false);
            loadCreditData();
        }
    };

    const resetEditor = () => {
        setImageFile(null);
        setPreview(null);
        setPrompt('');
        setResultImage(null);
    };


    return (
        <div className='px-4 lg:px-20 mt-8 min-h-screen'>
            <h1 className="text-2xl font-semibold text-gray-700 mb-4">AI Image Editor</h1>

            {!resultImage ? (
                <>
                    <div className="mb-4">
                        <label className='block text-gray-600 font-medium mb-2'>Upload Image:</label>
                        <input type="file" accept='image/*' onChange={handleFileChange} className='cursor-pointer' />
                    </div>

                    {preview && <img src={preview} alt='preview' className='w-40 max-w-md mb-4 rounded shadow' />}

                    <div className="mb-4">
                        <label className='block text-gray-600 font-medium mb-2'>Describe your transformation:</label>
                        <textarea  
                        rows={3}
                        className='w-full max-w-md border border-gray-300 rounded p-2'
                        placeholder='e.g Make the background a snowy mountain'
                        value={prompt}
                        onChange={(e)=>setPrompt(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className='bg-violet-600 text-white px-6 py-2 rounded-full hover:scale-105 transition-all'
                    >
                        {loading ? <ButtonSpinner></ButtonSpinner> : 'Generate'}
                    </button>

                </>
            ) : (
                <>
                <p className='text-gray-600 mb-2'>Result:</p>
                <img src={resultImage} className='w-full max-w-lg mb-4 rounded shadow' />
                <div className="flex gap-4">
                    <a 
                    href={resultImage} 
                    download
                    className='bg-green-500 text-white px-6 py-2 rounded-full hover:scale-105 transition-all cursor-pointer'
                    >
                        Download
                    </a>
                    <button
                    onClick={resetEditor}
                    className='border border-gray-500 px-6 py-2 rounded-full text-gray-700 hover:scale-105 transition-all cursor-pointer'
                    >
                        Try another
                    </button>
                </div>
                </>
        )}
        </div>
    )
}

export default AIEditor