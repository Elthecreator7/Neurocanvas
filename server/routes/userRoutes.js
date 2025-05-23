import express from "express";
import { registerUser, loginUser, googleLogin, userCredits, paymentFlutterwave, verifyFlutterwavePayment } from "../controllers/userController.js";
import userAuth from "../middlewares/auth.js";

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/google-login', googleLogin)
userRouter.get('/credits', userAuth, userCredits)
userRouter.post('/flutterwave-pay', userAuth, paymentFlutterwave)
userRouter.post('/verify-flutterwave', userAuth, verifyFlutterwavePayment)

//so the end point for registration looks like this http://localhost:4000/api/user/register
//And the end point for login looks like this http://localhost:4000/api/user/login
//And the end point for credits looks like this http://localhost:4000/api/user/credits


export default userRouter