import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const uploadsDir = path.resolve("Uploads");

const toPublicImage = (filename) => ({
  public_id: filename,
  url: `/uploads/${filename}`,
});

async function processListingImages(files = []) {
  const processedImages = [];

  for (const file of files) {
    const compressedFilename = `${file.filename}-compressed.jpg`;
    const compressedPath = path.join(uploadsDir, compressedFilename);

    await sharp(file.path).resize({ width: 1200, withoutEnlargement: true }).jpeg({ quality: 70 }).toFile(compressedPath);

    processedImages.push(toPublicImage(compressedFilename));

    await fs.unlink(file.path).catch(() => {});
  }

  return processedImages;
}

export default processListingImages;
