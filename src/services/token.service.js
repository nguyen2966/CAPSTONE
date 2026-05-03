import jwt from "jsonwebtoken";
import { BadRequestException } from "../common/helpers/exception.helper.js";
import { ACCESS_TOKEN_SECRECT } from "../common/constants/app.constants.js";
import { REFRESH_TOKEN_SECRECT } from "../common/constants/app.constants.js";

export const tokenService = {
  createAccessToken(nguoi_dung_id){
    if(!nguoi_dung_id){
      throw new BadRequestException("Không tìm thấy user ID");
    }
    const accessToken = jwt.sign(
      {nguoi_dung_id},
      ACCESS_TOKEN_SECRECT ,
      {
       expiresIn:"10m"
      }
    );
    return accessToken;
  },
  createRefreshToken(nguoi_dung_id){
    if(!nguoi_dung_id){
      throw new BadRequestException("Không tìm thấy user ID");
    }
    const refreshToken = jwt.sign(
      {nguoi_dung_id},
      REFRESH_TOKEN_SECRECT ,
      {
       expiresIn:"1d"
      }
    );
    return refreshToken;
  },
  verifyAccessToken(accessToken,options){
    const decode = jwt.verify(accessToken,ACCESS_TOKEN_SECRECT,options);
    return decode;
  },
  verifyRefreshToken(refreshToken,options){
    const decode = jwt.verify(refreshToken,REFRESH_TOKEN_SECRECT,options);
    return decode;
  }
}