const userModel = require("../models/userModel.js");
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');

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

const editImage = async (req, res)=>{
    try {
        const {prompt, userId} = req.body;
        console.log("BODY:", req.body)
        if(!prompt || !userId){
            return res.status(400).json({success: false, message: "Missing prompt or user ID"});
        }
        const user = await userModel.findById(userId);

        if(!user || user.creditBalance < 5){
            return res.status(403).json({success: false, message: 'Insufficient credits or user not found'});
        }

        if(!req.file){
            return res.status(400).json({success: false, message: 'Image is required'});
        }

        const formData = new FormData();
        formData.append('init_image', fs.createReadStream(req.file.path));
        formData.append('text_prompts[0][text]', prompt);
        formData.append('cfg_scale', 8);
        formData.append('steps', 50);
        formData.append('clip_guidance_preset', 'SLOW');
        formData.append('init_image_mode', 'STEP_SCHEDULE');
        formData.append('step_schedule_start', 0.85);
        // formData.append('step_schedule_end', 0.6);

        const response = await axios.post( `https://api.stability.ai/v1/generation/stable-diffusion-v1-6/image-to-image`, formData, {
            headers: {
                ...formData.getHeaders(),
                Authorization: `Bearer ${process.env.STABILITY_API}`,
                Accept: 'image/png'
            },
            responseType: 'arraybuffer'
        });

        const base64Image = Buffer.from(response.data).toString('base64');
        const imageData = `data:image/png;base64,${base64Image}`;

        fs.unlinkSync(req.file.path);

        user.creditBalance -= 5;
        await user.save();

        res.status(200).json({success: true, image: imageData, message: 'Image edited successfully'})
    } catch (error) {
    const isBuffer = Buffer.isBuffer(error?.response?.data);
    if (isBuffer) {
        const errorText = error.response.data.toString('utf8');
        console.log("Stability API Error (decoded):", errorText);
    } else {
        console.log("Edit Image Error:", error?.response?.data || error.message);
    }

    res.status(500).json({ success: false, message: "Failed to edit image" });
}
}

module.exports = {
  generateImage,
  removeBg,
  editImage
};