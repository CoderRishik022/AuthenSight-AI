import {asyncHandler} from "../utils/asyncHandler.js";
import { Query } from "../models/query.models.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const options = {
    httpOnly: true,
    secure: true
    }

const uploadQueryInfo = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "No file uploaded");
  }

  const localPath = req.file.path;
  console.log(localPath);

  const cloudinaryRes = await uploadToCloudinary(localPath);
  if (!cloudinaryRes?.secure_url) {
    throw new ApiError(500, "Failed to upload");
  }

  const { ansClaim, ansPerc } = req.body;

  const query = await Query.create({
    owner: req.user._id,
    queryObject: cloudinaryRes.secure_url,
    ansClaim,
    ansPerc,
    type: cloudinaryRes.resource_type // image | video (safe)
  });

  if (!query) {
    throw new ApiError(500, "Failed to save the query");
  }

  return res.status(200).json(
    new ApiResponse(200, query, "Query saved successfully")
  );
});


const getQuery = asyncHandler(async (req, res) => {
    console.log(req.body)
    console.log(typeof(req.body))
    const query = await Query.findById(req.body._id)
    return res
    .status(200)
    .json(new ApiResponse(200, query, "Query fetched successfully"))
})

const deleteQuery = asyncHandler(async (req, res) => {
    const image = req.filePath
    const deleted = await deleteFromCloudinary(image)
    return res.status(200)
    .json(200, deleted, "File deleted successfully")
})

export {
    uploadQueryInfo,
    getQuery,
    deleteQuery
}