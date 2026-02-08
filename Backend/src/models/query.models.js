import mongoose, { Schema } from "mongoose";

const querySchema = new Schema(
    {
        owner: {
            type: mongoose.Types.ObjectId,
            ref: "User"
        },
        queryObject: {
            type: String,
            required: true
        },
        ansPerc: {
            type: String,
            required: true
        },
        ansClaim: {
            type: Boolean,
            required: true
        },
        type: {
            type: String,
            enum: ["image", "video"],
            required: true
        }
    }
,{timestamps: true})

export const Query = mongoose.model("Query", querySchema)