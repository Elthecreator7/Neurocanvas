const express = require('express')
const cors = require('cors')
require('dotenv/config')
const connectDB = require('./config/mongodb.js')
const userRouter = require('./routes/userRoutes.js')
const imageRouter = require('./routes/imageRoutes.js')

//App config
const PORT = process.env.PORT || 4000
const app = express()
const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
}


//Initialize Middleware
app.use(express.json())
app.use(cors(corsOptions))
connectDB()


//API routes
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.get('/', (req, res)=>res.send("API Up and Running"))

app.listen(PORT, ()=>console.log("Server running on port " + PORT) )