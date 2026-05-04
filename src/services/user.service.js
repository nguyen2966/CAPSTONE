import { prisma } from "../common/prisma/connect.prisma.js";
import { BadRequestException, ForbiddenException, NotFoundException } from "../common/helpers/exception.helper.js";
import { uploadCloud } from "../common/helpers/upload-cloud.helper.js";

export const userService = {
  async uploadImage(req) {
    if (!req.file) {
      throw new BadRequestException("Không tìm thấy hình ảnh");
    }

    const uploadResult = await uploadCloud(req);

    await prisma.hinh_anh.create({
      data: {
        ten_hinh: req.file.originalname,
        duong_dan: uploadResult.secure_url,
        nguoi_dung_id: +req.user.nguoi_dung_id
      },
    });

    return uploadResult.secure_url;
  },

  async findAllImages(req) {
    const nguoi_dung_id = req.user.nguoi_dung_id;

    const images = await prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: +nguoi_dung_id
      }
    });

    return images;
  },

  async findAllImagesSaved(req) {
    const nguoi_dung_id = req.user.nguoi_dung_id;

    const imagesSaved = prisma.luu_anh.findMany({
      where: {
        nguoi_dung_id: +nguoi_dung_id
      }
    });

    return imagesSaved;
  },

  async updateInfo(req) {
    const { ho_ten, tuoi } = req.body;

    let data = {};

    // chỉ thêm vào nếu có giá trị
    if (ho_ten !== undefined) data.ho_ten = ho_ten;
    if (tuoi !== undefined) data.tuoi = +tuoi;

    // nếu có file -> upload avatar
    if (req.file) {
      const uploadResult = await uploadCloud(req);
      data.anh_dai_dien = uploadResult.secure_url;
    }

    // nếu không có gì để update
    if (Object.keys(data).length === 0) {
      throw new BadRequestException("Không có dữ liệu để cập nhật");
    }

    await prisma.nguoi_dung.update({
      where: {
        nguoi_dung_id: +req.user.nguoi_dung_id,
      },
      data,
    });

    return true;
  },

  async removeImage(req) {
    const {id}= req.params;

    const imgToDelete = await prisma.hinh_anh.findUnique({
      where:{
        hinh_id:+id
      }
    });

    if(!imgToDelete) throw new NotFoundException("Không tìm thấy hình ảnh để xóa");

    if(imgToDelete.nguoi_dung_id !== req.user.nguoi_dung_id) {
      //Trường hợp user không phải người tạo ảnh 
      throw new ForbiddenException("Bạn không có quyền xóa ảnh này");
    }

    if(imgToDelete.isDeleted){
      throw new BadRequestException("Ảnh này đã được xóa");
    }

    await prisma.hinh_anh.update({
      where:{
        hinh_id: +id
      },
      data:{
        isDeleted: true,
        deletedAt: new Date(),
      }
    });

    return true;
  }
};