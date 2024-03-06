const express = require('express')
const dotenv = require('dotenv')
const app = express()
const cors = require("cors")
// const cookieParser = require("cookie-parser")
dotenv.config({
    path:"./env"
})

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}))

app.use(express.json())
// app.use(express.urlencoded({extended: true, limit: "16kb"}))
// app.use(express.static("public"))
// app.use(cookieParser())

//* ROUTERS .....
const  Router  =  require('./routers/user.routes')
app.use("/user", Router)

module.exports = app
