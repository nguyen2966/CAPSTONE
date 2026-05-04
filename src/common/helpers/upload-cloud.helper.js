import cloudinary from "../cloudinary/cloudinary.config.js";

export const uploadCloud = async (req) => {
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "node_54" }, (error, uploadResult) => {
        if (error) {
          return reject(error);
        }
        return resolve(uploadResult);
      })
      .end(req.file.buffer);
  });

  return uploadResult;
}

