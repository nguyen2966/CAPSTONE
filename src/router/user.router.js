import express from 'express';
import { userController } from '../controllers/user.controller.js';
import { uploadMemoryStorage } from '../common/multer/memory-storage.multer.js';
import { protect } from '../common/middlewares/protect.middleware.js';
const userRouter = express.Router();

// Tạo route CRUD
//lấy danh sách ảnh đã lưu và ảnh đã tạo
userRouter.use(protect);

userRouter.get('/images', userController.findAllImages);
userRouter.get('/images-saved', userController.findAllImagesSaved);

// tạo ảnh và xóa ảnh
userRouter.post('/images',uploadMemoryStorage.single("image"),userController.uploadImage);
userRouter.delete('/images/:id', userController.removeImage);

userRouter.put('/info',uploadMemoryStorage.single("avatar") ,userController.updateInfo);



export default userRouter;