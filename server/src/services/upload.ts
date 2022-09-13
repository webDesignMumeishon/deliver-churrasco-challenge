import multer from "multer"
import { v2 as cloudinary } from "cloudinary"

// @ts-ignore
cloudinary.config({
  cloud_name: 'tomasmacchi-muma',
  api_key: "718889228812439",
  api_secret: "6W_isy5uJtfRz1p0hKdK_gUi0fg",
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
