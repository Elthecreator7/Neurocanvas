import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transactionModel from "../models/transactionModel.js";
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { OAuth2Client } from "google-auth-library";


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.json({ success: false, message: "Look like you skipped a spot! we need all the juicy details to proceed" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token, user: { name: user.name } })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Ghost alert! We couldn't find anyone by that name. Maybe try again?" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            console.log("Sending user to the frontend", {
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                _id: user._id,
            })

            res.json({
                success: true, token, user: {
                    _id: user._id,
                    name: user.name
                }
            })
        } else {
            return res.json({ success: false, message: "Hmm...That combo doesn't match. Double check your details" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ success: false, message: 'Missing token' })
        }
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId, picture: avatar } = payload;

        //check if user already exists
        let user = await userModel.findOne({ googleId });
        if (!user) {
            user = await userModel.findOne({ email })
            if (user) {
                user.googleId = googleId;
                user.avatar = avatar;
                await user.save();
            }
        }


        if (!user) {
            user = await userModel.create({
                email,
                name,
                googleId,
                avatar,
            });
        }

        //Create Jwt token
        const jwToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        console.log("Sending user to the frontend", {
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            _id: user._id,
        })
        res.json({
            success: true,
            googleToken: token,
            token: jwToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
            },
        })
    } catch (error) {
        console.log("Google login error:", error.message);
        res.status(500).json({ success: false, message: "Google login failed" })
    }
}

const userCredits = async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await userModel.findById(userId)

        res.json({ success: true, credits: user.creditBalance, user: { name: user.name, email: user.email, avatar: user.avatar, _id: user._id,  } })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const paymentFlutterwave = async (req, res) => {
    try {

        const { userId, planId } = req.body;

        const userData = await userModel.findById(userId)

        if (!userId || !planId) {
            return res.json({ success: false, message: "Missing Details" })
        }

        let credits, plan, amount, date;

        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 5000
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 25000
                break;

            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 50000
                break;

            default:
                return res.json({ success: false, message: 'Plan not found' });
        }

        date = Date.now();

        const tx_ref = `txn_${uuidv4()}`;

        const transactionData = {
            tx_ref,
            userId,
            plan,
            amount,
            credits,
            paymentStatus: 'Pending',
            date
        }

        const newTransaction = await transactionModel.create(transactionData);

        const flutterwaveRes = await axios.post('https://api.flutterwave.com/v3/payments', {
            tx_ref,
            amount,
            currency: 'NGN',
            redirect_url: `${process.env.FRONTEND_URL}/payment-redirect`,
            customer: {
                email: userData.email,
                name: userData.name
            },
            customization: {
                title: "Buy AI Image Generator Credits",
                description: `${credits} image generation credits`
            }
        }, {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
                'Content-Type': 'application/json'
            }
        }
        );

        const paymentLink = flutterwaveRes.data?.data?.link;

        res.json({
            success: true,
            message: "Redirecting to payment...",
            link: paymentLink
        })

    } catch (error) {
        console.log("Payment initiation error", error.response?.data || error.message)
        res.json({ success: false, message: "Payment initiation failed" })
    }
}

const verifyFlutterwavePayment = async (req, res) => {
    try {
        const { transaction_id } = req.body;
        if (!transaction_id) {
            return res.status(400).send("Missing transaction ID");
        }

        const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`, {
            headers: {
                Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
            },
        });

        const data = response.data.data;

        if (data.status === "successful") {
            const tx_ref = data.tx_ref;

            const transaction = await transactionModel.findOneAndUpdate(
                { tx_ref },
                { paymentStatus: 'Paid' },
                { paid: true },
                { new: true }
            );
            if (!transaction) {
                return res.status(404).send("Transaction not found");
            }

            await userModel.findByIdAndUpdate(transaction.userId, {
                $inc: {
                    creditBalance: transaction.credits
                },
            });

            return res.json({
                success: true,
                message: "Payment Verified"
            });
        } else {
            return res.json({
                success: false,
                message: "Payment Failed"
            });
        }
    } catch (error) {
        console.log("Payment verification error:", error.message);
        return res.json({ success: false, message: error.message })
    }
};

export { registerUser, loginUser, googleLogin, userCredits, paymentFlutterwave, verifyFlutterwavePayment }