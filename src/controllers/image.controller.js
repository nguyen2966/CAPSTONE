import { responseSuccess } from "../common/helpers/response.helper.js";
import { imageService } from "../services/image.service.js";

export const imageController = {
   async findAll(req, res, next) {
      const result = await imageService.findAll(req);
      const response = responseSuccess(result, `Lấy danh sách ảnh thành công`);
      res.status(response.statusCode).json(response);
   },

   async findOne(req, res, next) {
      const result = await imageService.findOne(req);
      const response = responseSuccess(result, `Lấy chi tiết ảnh thành công`);
      res.status(response.statusCode).json(response);
   },

   async checkIsSaved(req, res, next) {
      const result = await imageService.checkIsSaved(req);
      const response = responseSuccess(result, `Kiểm tra lưu ảnh`);
      res.status(response.statusCode).json(response);
   },

   async saveImage(req, res, next) {
      const result = await imageService.saveImage(req);
      const response = responseSuccess(result, `Lưu ảnh thành công`);
      res.status(response.statusCode).json(response);
   }
};