import { userService } from "../services/user.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const userController = {
   async uploadImage(req, res, next) {
      const result = await userService.uploadImage(req);
      const response = responseSuccess(result, `Tạo ảnh thành công`);
      res.status(response.statusCode).json(response);
   },

   async findAllImages(req, res, next) {
      const result = await userService.findAllImages(req);
      const response = responseSuccess(result, `Lấy danh sách ảnh đã tạo thành công`);
      res.status(response.statusCode).json(response);
   },

   async findAllImagesSaved(req, res, next) {
      const result = await userService.findAllImagesSaved(req);
      const response = responseSuccess(result, `Lấy danh sách ảnh đã lưu thành công`);
      res.status(response.statusCode).json(response);
   },

   async updateInfo(req, res, next) {
      const result = await userService. updateInfo(req);
      const response = responseSuccess(result, `Cập nhật thông tin người dùng thành công`);
      res.status(response.statusCode).json(response);
   },

   async removeImage(req, res, next) {
      const result = await userService.removeImage(req);
      const response = responseSuccess(result, `Xóa ảnh thành công`);
      res.status(response.statusCode).json(response);
   }
};