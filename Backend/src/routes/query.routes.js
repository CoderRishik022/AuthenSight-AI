import mongoose from "mongoose";
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { uploadQueryInfo, getQuery, deleteQuery } from "../controllers/query.controllers";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/queryInfo").post(
    verifyJwt,
    upload.single("queryObject"),
    uploadQueryInfo
)

router.route("/getQuery").post(verifyJwt, getQuery)
router.route("/deleteQuery").post(verifyJwt, deleteQuery)

export default router