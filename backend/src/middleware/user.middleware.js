const  User  = require("../Models/user.models");
const ApiError = require("../utilis/ApiError");
const { asyncHandler } = require("../utilis/AsyncHandler");
const jwt =  require('jsonwebtoken');
const Cookie = require('js-cookie')
const verifyJwt = asyncHandler(async(req, res, next)=>{
  try {
    const token = req.body.user
    
    if (!token) {
        throw new ApiError(401, "Unauthorized request")
    }
    // req.user = token;
    next()
} catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token")
}
})

module.exports = verifyJwt