import express from 'express';
import { commentsController } from '../controllers/comments.controller.js';
import { protect } from '../common/middlewares/protect.middleware.js';

const commentsRouter = express.Router();

commentsRouter.use(protect);

// Tạo route CRUD
//Lấy comments của 1 ảnh
commentsRouter.get('/:id', commentsController.findOne);

//Tạo comment đối với ảnh
//nguoi_dung_id và hinh_id kết hợp làm composite key nên mỗi user chỉ được bình luận 1 lần / ảnh
commentsRouter.post('/:id', commentsController.createComment);

export default commentsRouter;