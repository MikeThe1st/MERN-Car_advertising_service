import express from 'express'
import { register, login, getUser, getAllUsers, updateProfile, 
    updatePassword, forgotPassword } from '../controllers/user.js'
import { addCar, getCars, getMainPageCars, getCarById, getCarsAddedby, changeCarStatus, getAdminCars, searchCars, 
    getBrandsAndModels, getBrands, addBrand, addModel, flagAsDeleted, 
    updateCar} from '../controllers/cars.js'
import { changeUserAdmin, changeUserStatus } from '../controllers/admin.js'
import { addChat, addMessage, getChatsForUser, getChatById } from '../controllers/chat.js'
import multer from 'multer'
import path from 'path'
import Car from '../models/Car.js'
import { verifyAdmin } from '../middleware/authAdmin.js'

// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
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

//USER
mainRouter.post('/user/register', register)
mainRouter.post('/user/login', login)
mainRouter.get('/user/get-user', getUser)
mainRouter.get('/user/get-all-users', getAllUsers)
mainRouter.put('/user/update-profile', updateProfile)
mainRouter.post('/user/recover-password', forgotPassword)
mainRouter.put('/user/update-password', updatePassword)

//CHAT
mainRouter.get("/chat/user-chats", getChatsForUser)
mainRouter.get('/chat/:id', getChatById);
mainRouter.post('/chat/add-chat', addChat);
mainRouter.post('/chat/add-message', addMessage);

//CARS
mainRouter.post('/cars/add-new', upload.single('image'), addCar)
mainRouter.get('/cars/get-cars', getCars)
mainRouter.get('/cars/main-page', getMainPageCars)
mainRouter.get('/cars/car/:id', getCarById);
mainRouter.get('/cars/added-by/:id', getCarsAddedby);
mainRouter.patch('/cars/status', changeCarStatus)
mainRouter.patch('/cars/:carId/delete-status', flagAsDeleted)
mainRouter.get('/cars/admin', getAdminCars)
mainRouter.post('/cars/search', searchCars)
mainRouter.put('/cars/update-car/:id', updateCar)

//BRANDS AND MODELS
mainRouter.get('/cars/brands-and-models', getBrandsAndModels)
mainRouter.get('/cars/brands', getBrands)
mainRouter.post('/cars/add-brand', verifyAdmin, addBrand)
mainRouter.post('/cars/add-model', verifyAdmin, addModel)

//ADMIN
mainRouter.patch('/admin/users/:userId/status', verifyAdmin, changeUserStatus)
mainRouter.patch('/admin/users/:userId/permissions', verifyAdmin, changeUserAdmin)

export default mainRouter