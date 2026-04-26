import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

async function deleteCloudinaryImages(publicIds) {
  if (!publicIds || publicIds.length === 0) return;
  try {
    // Delete in parallel
    const deletePromises = publicIds.map((id) =>
      cloudinary.uploader.destroy(id)
    );
    await Promise.all(deletePromises);
  } catch (error) {
    console.error("Error deleting images from Cloudinary:", error);
  }
}

export default deleteCloudinaryImages;
