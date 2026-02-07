import { v2 as cloudinary } from 'cloudinary'
import fs from "fs"

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
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        console.log('Error while uploading to Cloudinary')
        return null
    }
}

const deleteFromCloudinary = async (image) => {
    const id = extractPublicId(image)
    const response = await cloudinary.uploader.destroy(id)
    return response
}

export { uploadToCloudinary,
    deleteFromCloudinary,
    }