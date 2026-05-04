import { responseSuccess } from "../common/helpers/response.helper.js";
import { commentsService } from "../services/comments.service.js";

export const commentsController = {
   async findOne(req, res, next) {
      const result = await commentsService.findOne(req);
      const response = responseSuccess(result, `Lấy các bình luận của ảnh thành công`);
      res.status(response.statusCode).json(response);
   },

   async createComment(req, res, next) {
      const result = await commentsService.createComment(req);
      const response = responseSuccess(result, `Tạo bình luận thành công`);
      res.status(response.statusCode).json(response);
   },
};