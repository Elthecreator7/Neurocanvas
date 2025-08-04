const express = require("express");
const { generateImage, removeBg, editImage } = require("../controllers/imageController.js");
const userAuth = require("../middlewares/auth.js");
const upload = require("../middlewares/multer.js");
const removeBgUserAuth = require("../middlewares/secondAuth.js");

const imageRouter = express.Router()

imageRouter.post('/generate-image', userAuth, generateImage)
imageRouter.post('/remove-bg', removeBgUserAuth, upload.single('image'), removeBg)
imageRouter.post('/edit-image', userAuth, upload.single('image'), editImage)

module.exports = imageRouter