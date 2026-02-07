import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

app.use(cookieParser())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.urlencoded({extended: true}))
app.use(express.json({limit: "16Kb"}))
app.use(express.static("public"))

import userRoute from "./routes/user.routes.js"
app.use("/api/v1/user", userRoute)

import queryRoute from "./routes/query.routes.js"
app.use("/api/v1/query", queryRoute)

export { app }