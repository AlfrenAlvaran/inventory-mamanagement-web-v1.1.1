import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoute.js'
import categoryRouter from './routes/categoryRoute.js'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config()
const app = express()
const PORT = process.env.PORT

// Middleware
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

// APIEND POINT
app.use('/api/inven&sales', userRouter)
app.use('/api/inven&sales', categoryRouter)
// app.use('/images', express.static('uploads'))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


mongoose.connect(process.env.MONGOOSE).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch(e => {
    console.log(e);
})