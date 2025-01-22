import express from 'express'
import { register, login, getUser, getUserInfo, getAllUsers, updateProfile } from '../controllers/user.js'
import { addCar, getCars, getMainPageCars, getCarById, getCarsAddedby, changeCarStatus, getAdminCars, searchCars, 
    getBrandsAndModels, getBrands, addBrand, addModel, flagAsDeleted } from '../controllers/cars.js'
import { changeUserAdmin, changeUserStatus } from '../controllers/admin.js'
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
mainRouter.get('/user/info', getUserInfo)
mainRouter.get('/user/get-all-users', getAllUsers)
mainRouter.post('/user/update-profile', updateProfile)
mainRouter.post('/user/recover-password', )

mainRouter.post('/cars/add-new', upload.single('image'), addCar)
mainRouter.get('/cars/get-cars', getCars)
mainRouter.get('/cars/main-page', getMainPageCars)
mainRouter.get('/cars/car/:id', getCarById);
mainRouter.get('/cars/added-by', getCarsAddedby);
mainRouter.post('/cars/status', changeCarStatus)
mainRouter.post('/cars/mark-as-deleted', flagAsDeleted)
mainRouter.get('/cars/admin', getAdminCars)
mainRouter.post('/cars/search', searchCars)

mainRouter.get('/cars/brands-and-models', getBrandsAndModels)
mainRouter.get('/cars/brands', getBrands)
mainRouter.post('/cars/add-brand', addBrand)
mainRouter.post('/cars/add-model', addModel)

mainRouter.post('/admin/toggle-user-status', changeUserStatus)
mainRouter.post('/admin/toggle-permissions', changeUserAdmin)

export default mainRouter