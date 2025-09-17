import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import imageRouter from './routes/imageRoutes.js'

//App config
const PORT = process.env.PORT || 4000
const app = express()


//Initialize Middleware
app.use(express.json())
app.use(cors())
await connectDB()



//API routes
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)
app.get('/', (req, res)=>res.send("API Up and Running"))

app.listen(PORT, ()=>console.log("Server running on port " + PORT) )