import { UnAuthoziedException } from "../helpers/exception.helper.js";
import { tokenService } from "../../services/token.service.js";
import { prisma } from "../prisma/connect.prisma.js";

export const protect = async (req,res,next) => {
  const { accessToken } = req.cookies;
  if(!accessToken) throw new UnAuthoziedException("Không tìm thấy Token");
  const decode = tokenService.verifyAccessToken(accessToken);
  
  const userExsist =  await prisma.nguoi_dung.findUnique({
    where:{
      nguoi_dung_id: +decode.nguoi_dung_id
    }
  });

  if(!userExsist) throw new UnAuthoziedException("Không tìm thấy user");

  req.user = userExsist;

  next();
};