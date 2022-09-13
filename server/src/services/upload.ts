import multer from "multer"
import { v2 as cloudinary } from "cloudinary"
import dotenv from 'dotenv';
dotenv.config();

// @ts-ignore
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const memoryStorage = multer.memoryStorage();

export const upload = multer({
  storage: memoryStorage,
});

export const uploadToCloudinary = async (fileString: string[], format) => {
  try {

    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    // @ts-ignore
    const { uploader } = cloudinary;
    
    const uploadImages = fileString.map(async (f) => {
      return await uploader.upload(
        `data:image/${format};base64,${f}`,
        options
      );
    })

    const imagesUrls = await Promise.all(uploadImages)
    
    return imagesUrls.map(image => image.url)

  } catch (error) {
    throw new Error(error);
  }
};
