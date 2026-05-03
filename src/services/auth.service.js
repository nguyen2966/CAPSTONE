import { BadRequestException, ForbiddenException, UnAuthoziedException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";
import bcrypt from "bcrypt";
import { tokenService } from "./token.service.js";
import { access } from "fs";

export const authService = {
   async login(req) {
      const { email, mat_khau } = req.body;

      //Kiểm tra email
      //nếu ko tồn tại, yêu cầu người dùng đăng kí
      //nếu có thì xử lí tiếp
      const userExsist = await prisma.nguoi_dung.findUnique({
         where:{
            email:email,
         },
         omit:{
            mat_khau: false
         }
      });

      if(!userExsist) throw new BadRequestException("Bạn chưa có tài khoản trong hệ thống");

      //Kiểm tra password
      const isAuthored = bcrypt.compareSync(mat_khau, userExsist.mat_khau);
      if(!isAuthored) throw new BadRequestException("Mật khẩu không chính xác");

      const accessToken = tokenService.createAccessToken(userExsist.nguoi_dung_id);
      const refreshToken = tokenService.createRefreshToken(userExsist.nguoi_dung_id)
      return {
         accessToken: accessToken,
         refreshToken: refreshToken
      };
   },

   async register(req) {
      // nhận dữ liệu từ frontend
      const {email, mat_khau, ho_ten} = req.body;
      console.log({email,mat_khau,ho_ten});

      //kiểm tra email có tồn tại trong db ko
      const emailExist = await prisma.nguoi_dung.findUnique({
         where:{
            email: email
         }
      });

      if (emailExist) {
         throw new ForbiddenException("Email này đã được đăng kí trước đó");
      }

      // ENCRYPTION HASH
      //ko thể dịch ngược
      const passwordHash = bcrypt.hashSync(mat_khau,10); 


      //Tạo mới người dùng vào DB
      const userNew = await prisma.nguoi_dung.create({
         data:{
            email: email,
            mat_khau: passwordHash,
            ho_ten: ho_ten
         }
      })

      
      return true;
   },
   async getInfo(req){
      return req.user;
   },

   //FE gọi api này khi accessToken hết hạn
   async refreshToken(req){
      let {accessToken, refreshToken} = req.cookies;
      if(!accessToken || !refreshToken) throw new UnAuthoziedException("Không có token để kiểm tra");
      
      //Access Token hết hạn nên phải ignore hết hạn, chỉ kiểm tra xem token này có phải 
      // do backend phát hành hay ko
      const decodeAccess = tokenService.verifyAccessToken(accessToken,{ignoreExpiration:true});
      const decodeRefresh = tokenService.verifyRefreshToken(refreshToken);

      //console.log({decodeAccess,decodeRefresh});
      if(decodeAccess.nguoi_dung_id !== decodeRefresh.nguoi_dung_id) throw new UnAuthoziedException("Token không hợp lệ ..");

      const userExist = await prisma.nguoi_dung.findUnique({
         where:{
            nguoi_dung_id: +decodeAccess.nguoi_dung_id
         }
      });

      if(!userExist) throw new UnAuthoziedException("Người dùng không tồn tại");

      accessToken = tokenService.createAccessToken(userExist.id);
      refreshToken = tokenService.createRefreshToken(userExist.id);
      //Thời hạn của refreshToken là 1 ngày

      //Nếu người dùng dùng liên tục thì refreshToken luôn làm mới -> RefreshToken luôn dc làm mới hạn
      //Nếu user ko dùng thì refreshToken hết hạn

      return {
         accessToken: accessToken,
         refreshToken: refreshToken
      };
   }
};