import { authService } from "../services/auth.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const authController = {
   async register(req, res, next) {
      console.log(req.body);
      const result = await authService.register(req);
      const response = responseSuccess(result, `Register thành công`);
      res.status(response.statusCode).json(response);
   },

   async login(req, res, next) {
      const result = await authService.login(req);
      const response = responseSuccess(true, `Login thành công`);
      res.cookie("accessToken", result.accessToken);
      res.cookie("refreshToken", result.refreshToken);
      res.status(response.statusCode).json(response);
   },

   async getInfo(req, res, next) {
      const result = await authService.getInfo(req);
      const response = responseSuccess(result, `Lấy info người dùng thành công`);
      res.status(response.statusCode).json(response);
   },

   async refreshToken(req, res, next) {
      const {accessToken, refreshToken} = req.cookies;
      const result = await authService.refreshToken(req);
      const response = responseSuccess(true, `Refresh token thành công`);
      res.cookie("accessToken", result.accessToken);
      res.cookie("refreshToken", result.refreshToken);
      res.status(response.statusCode).json(response);
   }
};