import express from 'express'
import { register, login, getUser } from '../controllers/user.js'

const mainRouter = express.Router()


mainRouter.post('/user/register', register)
mainRouter.post('/user/login', login)
mainRouter.get('/user/get-user', getUser)
// mainRouter.post('/user/forgot-password', forgotPassword)
// mainRouter.post('/user/reset-password', resetPassword)


export default mainRouter