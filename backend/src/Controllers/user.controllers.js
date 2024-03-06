const { asyncHandler } = require("../utilis/AsyncHandler.js")
const  User  = require("../Models/user.models");
const ApiError = require("../utilis/ApiError");
const ApiResponse = require("../utilis/ApiResponse");
const jwt = require("jsonwebtoken")
//! THE MODEL User CANN'T ACCESS CUSTOME METHODS BECAUSE User HAS OVERALL DATA OF ALL USERS SO WE CAN ONLY
//! ACCESS VIA FETCH ONLE ONE RECORD OF ANY USER THEN WE CAN USE MTHODS ON ONLY SINGAL TUPLES...

const generateAccessRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const AccessToken = await user.generateRefreshToken();
    const RefreshToken = await user.generateAccessToken();
    user.refreshToken = RefreshToken;
    await user.save({ validateBeforeSave: false });
    return { AccessToken, RefreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generate access token and request token"
    );
  }
};

const register = asyncHandler(async (req, res) => {
  // fetch all data from req
  // verify all data are fullfilled
  // check another user aren't register with same email or userId
  //  then create entry
  // remove password and refreshToken field from respone...
  // check for entry is created...
  // then send to user

  const { name, email, password } = req.body;
  if ([name, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All credentials are required!!");
  }
  console.log(req.body);
  const isUserExist = await User.findOne({email});
  if (isUserExist) {
    throw new ApiError(404, " User with email already exist ");
  }
  const create = await User.create({ name, email, password });
 console.log(create);
  if (!create) {
    throw new ApiError(500, "something went wrong while user create");
  }

  const user = await User.findById(create?._id).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(500, "something went wrong while user create");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User registered Successfully"));
});

const login = asyncHandler(async (req, res) => {
  // fetch all data from req
  // verify all data is available
  // check user is exist
  // password check
  // update refresh token nad accessToken
  // fetch all data from db
  // send to user

  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(401, "All credentials are required");
  }

  const checkUser = await User.findOne({email});
  console.log(checkUser);
  if (!checkUser) {
    throw new ApiError(401, "email is wrong");
  }
  const checkPassword = checkUser.isPasswordCorrect(password)
  if (!checkPassword) {
    throw new ApiError(401, "password must same with email");
  }
  const tokens = await generateAccessRefreshToken(checkUser?._id);
  const {AccessToken, RefreshToken} = tokens
  // console.log("AccessToken ::", AccessToken,"RefreshToken ::", RefreshToken);
  if (!AccessToken || !RefreshToken) {
    throw new ApiError(
      500,
      "something went wrong while fetch AccessToken and RefershToken, And cann't find AccessToken or Refresh Token"
    );
  }
  const options = {
    httpOnly: true,
    secure: true,
  };

  const userData = await User.findById(checkUser?._id).select(
    "-password -refreshToken"
  );

  if (!userData) {
    throw new ApiError(500, " something went wrong while user is autharizing");
  }
  return res
    .cookie("accessToken", AccessToken, options)
    .cookie("refreshToken", RefreshToken, options)
    .status(200)
    .json(new ApiResponse(200, {userData, AccessToken, RefreshToken}, "User is Successfully logged in"), options);
});

const logoutUser = asyncHandler( async(req, res) => {
   await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{
        refreshToken: undefined
      }
    },
    {
      new : true
    }
   )

   const options = {
    httpOnly : true,
    secure : true
   }
   return res.this 
             .status(200)
             .clearCookie("accessToken", options)
             .clearCookie("refreshToken", options)
             .json(new ApiResponse(200, "Successfully Logout"))
})

const refreshAccessToken = asyncHandler(async(req, res) =>{
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
  if(!incomingRefreshToken){
    throw new ApiError(401, "Unauthrized request")
  }
  const decodeToken = jwt.verify(incomingRefreshToken, process.env.ACCESS_TOKEN_SECRET)
  const user = await User.findById(decodeToken?._id)
  if(!user){
    throw new ApiError(401, "Invalid refresh token")
  }
  if(user?.refreshToken !== incomingRefreshToken){
    throw new ApiError(401, "refresh token has been expired");
  }

  const token = await generateAccessRefreshToken(user._id);
  const {AccessToken, RefreshToken} = token;
  options = {
    httpOnly: true,
    secure:true
  }
  
  res.status(200)
  .cookie("refreshToken", RefreshToken, options)
  .cookie("accessToken", AccessToken, options)
     .json(new ApiResponse(200, {accessToken:AccessToken, refreshToken: RefreshToken}, "accessToken Successfully changed" ))
})

const getCurrentUser = asyncHandler(async(req, res) => {

})

// const changePassWord = asyncHandler(async(reaq, res) => {

// })

// const updateProfile = asyncHandler( async( req, res ) => {
    
// })
module.exports = { register, login, logoutUser, refreshAccessToken, getCurrentUser} //, login, logoutUser,getCurrentUser, changePassWord, updateProfile};
