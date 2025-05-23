import userModel from "../models/userModel.js";
import FormData from 'form-data'
import axios from 'axios'
import fs from 'fs'

const generateImage = async (req, res)=>{
    try {
        
        const {userId, prompt} = req.body;

        if (!userId || !prompt) {
            return res.status(400).json({success: false, message: 'Missing prompt or user ID'});    
        }

        const user = await userModel.findById(userId)
        if(!user){
            return res.status(404).json({success: false, message: 'User not found'});
        }

        if(user.creditBalance < 8){
            return res.json({ success: false, message: 'Insufficient credits. Please purchase more to generate images', creditBalance: user.creditBalance,});
        }

        const formData = new FormData();
        formData.append('prompt', prompt);
        formData.append('output_format', 'png');

        const response = await axios.post('https://api.stability.ai/v2beta/stable-image/generate/ultra', formData, 
            {
                headers:{
                    ...formData.getHeaders(),
                    Authorization: `Bearer ${process.env.STABILITY_API}`,
                    Accept: 'image/*',
                },
                responseType: 'arraybuffer'
            }
        );

        const base64Image = Buffer.from(response.data).toString('base64');
        const imageData = `data:image/png;base64,${base64Image}`;

        user.creditBalance -= 8;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Image generated successfully',
            creditBalance: user.creditBalance,
            image: imageData,
        });

    } catch (error) {
        if(error.response && error.response.data){
            const errorText = Buffer.from(error.response.data).toString('utf8');
            console.error("Error generation image:", errorText);
             console.log("Error generation image:", errorText);
        }else{
             console.error("Error generation image:", error.message);
        }
        res.status(500).json({
            success: false,
            message: 'Image generation failed',
        });
    }
};


const removeBg = async (req, res) => {
    try {

         const userId  = req.userId;
        //  console.log("req.userId:", req.userId);
        //  console.log("req.body:", req.body);

        if (!userId) {
            return res.status(400).json({success: false, message: 'Missing user ID'});    
        }

        const user = await userModel.findById(userId)
        if(!user){
            return res.status(404).json({success: false, message: 'User not found'});
        }

        if(user.creditBalance < 8){
            return res.json({ success: false, message: 'Insufficient credits. Please purchase more to generate images', creditBalance: user.creditBalance,});
        }

        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "No image file was uploaded",
            })
        }
        
            const formData = new FormData();
            formData.append('image', fs.createReadStream(req.file.path));
            formData.append('output_format', 'png');

            const response = await axios.post('https://api.stability.ai/v2beta/stable-image/edit/remove-background', formData, {
                headers:{
                    ...formData.getHeaders(),
                    Authorization: `Bearer ${process.env.STABILITY_API}`,
                    Accept: 'image/*',
                },
                responseType: 'arraybuffer',
            }
        );

        const base64Image = Buffer.from(response.data).toString('base64')
        const imageData = `data:image/png;base64,${base64Image}`;

        fs.unlinkSync(req.file.path);

        user.creditBalance -= 2;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Background removed successfully",
            image:imageData,
        })
    } catch (error) {
        console.log("Remove BG Error:", error?.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to remove background'
        });
    }
};

export {generateImage, removeBg}