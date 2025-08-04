const express = require("express");
const { registerUser, loginUser, googleLogin, userCredits, paymentPaystack, verifyPaystackPayment } = require("../controllers/userController.js");
const userAuth = require("../middlewares/auth.js");

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/google-login', googleLogin)
userRouter.get('/credits', userAuth, userCredits)
userRouter.post('/paystack-pay', userAuth, paymentPaystack)
userRouter.post('/verify-paystack', userAuth, verifyPaystackPayment)

//so the end point for registration looks like this http://localhost:4000/api/user/register
//And the end point for login looks like this http://localhost:4000/api/user/login
//And the end point for credits looks like this http://localhost:4000/api/user/credits


module.exports = userRouter