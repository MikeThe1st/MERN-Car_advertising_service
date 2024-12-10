import express from 'express'
import { register, login, getUser } from '../controllers/user.js'
import { addCar, getCars } from '../controllers/cars.js'
import multer from 'multer'
import path from 'path'
import Car from '../models/Car.js'

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // const uploadPath = path.join(path.resolve(), 'frontend/public/car_imgs');
        const uploadPath = path.join(path.resolve(), '/public');
        cb(null, uploadPath);
    },
    filename: async function (req, file, cb) {
        try {
            const carCount = await Car.countDocuments(); // Count existing documents in the collection
            const uniqueName = `${carCount + 1}-car.jpg`;
            cb(null, uniqueName);
        } catch (error) {
            cb(error);
        }
    },
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, JPG, and PNG are allowed.'));
    }
};
const upload = multer({ storage: storage, fileFilter });


const mainRouter = express.Router()

mainRouter.post('/user/register', register)
mainRouter.post('/user/login', login)
mainRouter.get('/user/get-user', getUser)
// mainRouter.post('/user/forgot-password', forgotPassword)
// mainRouter.post('/user/reset-password', resetPassword)

// mainRouter.post('/cars/add-new', addCar)
mainRouter.post('/cars/add-new', upload.single('image'), addCar)
mainRouter.get('/cars/get-cars', getCars)

export default mainRouter