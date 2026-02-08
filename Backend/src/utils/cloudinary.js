import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

function extractPublicId(url) {
  const parts = url.split("/upload/")[1];
  const withoutVersion = parts.replace(/^v\d+\//, "");
  return withoutVersion.replace(/\.[^/.]+$/, "");
}

const uploadToCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto" // 🔥 REQUIRED
    });

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    console.log("Error while uploading to Cloudinary", error);
    return null;
  }
};

const deleteFromCloudinary = async (url, resourceType = "image") => {
  const id = extractPublicId(url);
  const response = await cloudinary.uploader.destroy(id, {
    resource_type: resourceType
  });
  return response;
};

export {
  uploadToCloudinary,
  deleteFromCloudinary
};
