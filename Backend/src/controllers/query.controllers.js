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

// import { Query } from "../models/query.model.js"
// import { deleteFromCloudinary } from "../utils/cloudinary.js"
// import { ApiError } from "../utils/ApiError.js"
// import { ApiResponse } from "../utils/ApiResponse.js"
// import asyncHandler from "../utils/asyncHandler.js"

const deleteQuery = asyncHandler(async (req, res) => {
  const { _id } = req.body

  if (!_id) {
    throw new ApiError(400, "Query ID is required")
  }

  // 🔹 Find query
  const query = await Query.findById(_id)
  if (!query) {
    throw new ApiError(404, "Query not found")
  }

  // 🔹 Ownership check
  if (query.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this query")
  }

  // 🔹 Delete from Cloudinary
  try {
    await deleteFromCloudinary(query.queryObject, query.type)
  } catch (err) {
    console.error("Cloudinary delete failed:", err)
    // We don't block deletion if Cloudinary fails
  }

  // 🔹 Delete from DB
  await Query.findByIdAndDelete(_id)

  return res.status(200).json(
    new ApiResponse(200, null, "Query deleted successfully")
  )
})

export {
    uploadQueryInfo,
    getQuery,
    deleteQuery
}