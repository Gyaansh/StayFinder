import fs from "fs/promises";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function processListingImages(files = []) {
  const uploadPromises = files.map(async (file) => {
    try {
      const compressedBuffer = await sharp(file.path)
        .resize({ width: 1200, withoutEnlargement: true })
        .jpeg({ quality: 70 })
        .toBuffer();

      const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "airbnb_listings" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(compressedBuffer);
      });

      await fs.unlink(file.path).catch(() => {});

      return {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    } catch (error) {
      console.error("Error uploading image:", error);
      await fs.unlink(file.path).catch(() => {});
      throw error;
    }
  });

  return await Promise.all(uploadPromises);
}

export default processListingImages;
