import React, { useContext, useState, useRef, useEffect } from 'react'
import Loader from '../components/Loader'
import { AppContext } from '../context/AppContext'
import { motion } from 'motion/react'
const Result = () => {

    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; 
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [input]);

    const { generateImage } = useContext(AppContext);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (input) {
            const image = await generateImage(input)
            if (image) {
                setIsImageLoaded(true)
                setImage(image)
            }
        }
        setLoading(false)
    }
    return (
        <motion.form
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit} className='flex flex-col min-h-[70vh] items-center justify-center'>
            <div>
                <div className='relative'>
                    {isImageLoaded ? (<img src={image} alt="" className='max-w-sm rounded ' />) : (<p className={loading ? 'hidden' : 'block text-center text-2xl text-white font-bold'}>Hiya, what are we cooking today</p>)}
                    {loading && <Loader></Loader>}
                </div>
            </div>


            {!isImageLoaded &&
                <div className="w-full max-w-3xl mx-auto mt-10">
                    <div className="rounded-2xl p-[2px] bg-gradient-to-r from-[#7c0fab] to-[#ff4411]">
                        <div className="flex items-center rounded-2xl bg-[#1a1b1e] px-4 sm:px-5 py-3">
                            <textarea
                                ref={textareaRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="What do you want to create?"
                                className="flex-1 bg-transparent text-white placeholder:text-zinc-400 outline-none text-base resize-none overflow-hidden"
                                rows={1}
                            />

                            <button
                                type="submit"
                                className="rounded-xl bg-[#2c2e33] hover:bg-[#3a3d43] text-white/90 px-6 sm:px-8 py-2.5 transition"
                            >
                                Generate
                            </button>
                        </div>
                    </div>
                </div>}


            {
                isImageLoaded &&
                <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
                    <p className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer' onClick={() => { setIsImageLoaded(false) }}>Generate Another</p>
                    <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
                </div>
            }

        </motion.form>
    )
}

export default Result