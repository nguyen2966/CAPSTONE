import { BadRequestException, ForbiddenException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";

export const commentsService = {
   async findOne(req, res, next) {
      const { id } = req.params;

      const comments = await prisma.binh_luan.findMany({
        where:{
          hinh_id: +id
        }
      });

      return comments;
   },

   async createComment(req, res, next) {
      const { id } = req.params;
      const { content } = req.body;
      const nguoi_dung_id = req.user.nguoi_dung_id;
      
      if(!content) throw BadRequestException("Không tìm thấy nội dung bình luận");

      const comment = await prisma.binh_luan.findFirst({
        where:{
          nguoi_dung_id: +nguoi_dung_id,
          hinh_id: +id
        }
      });

      if(comment) throw new ForbiddenException("Bạn đã bình luận ảnh này rồi");

      await prisma.binh_luan.create({
        data:{
          hinh_id: +id,
          nguoi_dung_id: +nguoi_dung_id,
          noi_dung: content 
        }
      });

      return true;
    },
};