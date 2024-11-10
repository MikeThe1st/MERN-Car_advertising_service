import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import mainRouter from '../routes/main.js'

dotenv.config()
const app = express()
const appPort = process.env.APP_PORT || 3000
const mongoURL = process.env.MONGOOSE_CONNECT

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/backend', mainRouter)


const start = async () => { 
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURL)
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            })

        app.listen(appPort, () => console.log(`App is running on Port: ${appPort}`))
    } catch (error) {
        console.log(error)
    }
}

start()