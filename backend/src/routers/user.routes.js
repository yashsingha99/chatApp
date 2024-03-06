const express = require("express")
const { loginController, registerController, fetchAllUsersController} = require("../Controllers/newUser.controller")
const verifyJwt = require("../middleware/user.middleware")
const Router = express.Router()
// const router = Router()
Router.post("/login", loginController)
Router.post("/signup", registerController)
Router.post("/fetchUsers",protect, fetchAllUsersController)
// Router.post("/logout",verifyJwt, getCurrentUser)

module.exports = Router