import express from 'express';
import { protect } from '../common/middlewares/protect.middleware.js';
import { imageController } from '../controllers/image.controller.js';

const imageRouter = express.Router();

imageRouter.use(protect);

// Tạo route CRUD
imageRouter.get('/', imageController.findAll);
//Tạo record lưu ảnh
imageRouter.post('/:id', imageController.saveImage);

//Lấy chi tiết ảnh
imageRouter.get('/:id', imageController.findOne);

//Kiểm tra ảnh đã lưu chưa
imageRouter.get('/is-saved/:id', imageController.checkIsSaved);



export default imageRouter;