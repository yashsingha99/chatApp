const  User  = require("../Models/user.models");
const ApiError = require("../utilis/ApiError");
const { asyncHandler } = require("../utilis/AsyncHandler");
const jwt =  require('jsonwebtoken');

const verifyJwt = asyncHandler(async(req, _, next)=>{
    try {
        const token = req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer ", "");
        console.log("token :: ", token );
        if(!token){
            throw new ApiError(401, " Unauthrized request ")
        }
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const UserData = await User.findById(decodeToken?._id).select("-password -refreshToken")
        if(!UserData){
          throw new ApiError(401, "Invalid Access Token");
        }
        req.user = UserData;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
})

module.exports = verifyJwt