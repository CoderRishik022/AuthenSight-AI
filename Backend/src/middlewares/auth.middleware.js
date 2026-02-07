import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import {asyncHandler} from "../utils/asyncHandler.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("authorization")?.replace("Bearer ", "")
    if(!token) throw new ApiError(400, "Invalid access token");
    const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    const user = await User.findById(decodeToken._id)
    if(!user) throw new ApiError(400, "Access token expired");
    req.user = user
    return next()
}) 