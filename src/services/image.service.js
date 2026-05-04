import { BadRequestException, ForbiddenException, NotFoundException } from "../common/helpers/exception.helper.js";
import { prisma } from "../common/prisma/connect.prisma.js";

export const imageService = {
   async findAll(req) {
      const { searchName} = req.query;

      const result = searchName? await prisma.hinh_anh.findMany({
        where:{
          ten_hinh:{
            contains: searchName
          }
        }
      }) : await prisma.hinh_anh.findMany();

      return result;
   },

   async findOne(req) {
    const { id } = req.params;

    const image = await prisma.hinh_anh.findUnique({
      where:{
        hinh_id: +id
      },
      include:{
        nguoi_dung:true
      },
    });

    if(!image){
      throw new NotFoundException("Không tìm thấy hình ảnh");
    }

    return image;
   },

   async checkIsSaved(req, res, next) {
      const nguoi_dung_id = req.user.nguoi_dung_id;
      const id = req.params.id;

      const image = await prisma.hinh_anh.findUnique({
        where:{
          hinh_id: +id
        }
      });

      if(!image) throw new NotFoundException("Không tìm thấy hình ảnh");

      const isSaved = await prisma.luu_anh.findFirst({
        where:{
          nguoi_dung_id:+nguoi_dung_id,
          hinh_id: +id
        }
      });
      

      return isSaved !== null ? "Ảnh đã được lưu" : "Ảnh chưa được lưu";
   },

   async saveImage(req, res, next) {
      const nguoi_dung_id = req.user.nguoi_dung_id;
      const id = req.params.id;

      const image = await prisma.hinh_anh.findUnique({
        where:{
          hinh_id: +id
        }
      });

      if(!image) throw new NotFoundException("Không tìm thấy hình ảnh");

      const isSaved = await prisma.luu_anh.findFirst({
        where:{
          nguoi_dung_id:+nguoi_dung_id,
          hinh_id: +id
        }
      });
      
      if(isSaved) throw new BadRequestException("Ảnh này đã được lưu rồi");

      await prisma.luu_anh.create({
        data:{
          hinh_id: +id,
          nguoi_dung_id: +nguoi_dung_id
        }
      })

   }
};