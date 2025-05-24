import express from "express";
import { generateImage, removeBg, editImage } from "../controllers/imageController.js";
import userAuth from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";
import removeBgUserAuth from "../middlewares/secondAuth.js";

const imageRouter = express.Router()

imageRouter.post('/generate-image', userAuth, generateImage)
imageRouter.post('/remove-bg', removeBgUserAuth, upload.single('image'), removeBg)
imageRouter.post('/edit-image', userAuth, upload.single('image'), editImage)

export default imageRouter