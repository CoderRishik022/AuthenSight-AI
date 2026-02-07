import {asyncHandler} from "../utils/asyncHandler.js";
import { Query } from "../model/query.model.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const options = {
    httpOnly: true,
    secure: true
    }

const uploadQueryInfo = asyncHandler(async(req, res) => {
    const localPath = req.file.path
    const queryObject = await uploadToCloudinary(localPath)
    if(!queryObject.url) throw new ApiError(500, "Failed to upload");
    const {ansClaim, ansPerc, user} = req.body
    const query = await Query.create({
        owner: user._id,
        queryObject: queryObject.url,
        ansClaim,
        ansPerc
    })
    if(!query) throw new ApiError(500, "Failed to save the query");
    console.log(query)
    return res
    .status(200)
    .json(new ApiResponse(200, query, "Query saved successfully"))
})

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