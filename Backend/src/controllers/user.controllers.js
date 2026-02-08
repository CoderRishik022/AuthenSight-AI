import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.models.js"

const options = {
    httpOnly: true,
    secure: true
}

const getAccessRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        if(!user) throw new ApiError(400, "User not found");
    
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
    
        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Unable to generate refresh token")
    }
}

const registerUser = asyncHandler(async(req, res) => {
    const {username, email, password} = req.body
    if(
        [username, email, password].some((e) => e.trim === "")
    ){
        throw new ApiError(400, "All the fields are required")
    }

    const existedUser = await User.findOne({email})
    if(existedUser) throw new ApiError(400, "User with email already exist");
    const user = await User.create({
        username,
        password,
        email,
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser) throw new ApiError(500, "Unable to create user");
    console.log(createdUser)
    const {accessToken, refreshToken} = getAccessRefreshToken(user._id)
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, createdUser, "User registered successfully"))
})

const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body
    if(
        [email, password].some((e) => e.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }
    const user = await User.findOne({email})
    if(!user) throw new ApiError(400, "User not found");

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if(!isPasswordCorrect) throw new ApiError(401, "Invalid password");

    const {accessToken, refreshToken} = await getAccessRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    if(!loggedInUser) throw new ApiError(200, "User not found");
    console.log(loggedInUser)

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"))
})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    console.log("User logged out successfully")
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
})

const getUserHistory = asyncHandler(async(req,res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            }
        },
        {
            $lookup: {
                from: "queries",
                localField: "_id",
                foreignField: "owner",
                as: "history",
                pipeline: [
                    {
                        $project: {
                            queryObject: 1,
                            ansPerc: 1,
                            ansClaim: 1,
                            type: 1
                        }
                    }
                ]
            }
        },
        {
            $project: {
                history: 1
            }
        }
    ])
    console.log(user[0].history[0])
    return res.status(200)
    .json(new ApiResponse(200, user[0].history, "History fetched successfully"))
})

export {
    registerUser, 
    loginUser,
    logoutUser,
    getUserHistory
}