import mongoose from "mongoose";
import { registerUser, loginUser, logoutUser, getUserHistory } from "../controllers/user.controllers.js";
import { Router } from "express";
import {verifyJwt} from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt, logoutUser)
router.route("/history").post(verifyJwt, getUserHistory)

export default router
