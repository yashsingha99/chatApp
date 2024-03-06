const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const jwt =  require('jsonwebtoken');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,     
      lowerCase: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowerCase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timeStamp: true }
);

userSchema.pre("save", async function (next) {
  if(!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10)
  next()
})


//* create custome methods in models...
// userSchema.methods.isPasswordCorrect = async(password) => {  //! why is this not working...
//   return await bcrypt.compare(password, this.password)
// }
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateRefreshToken = async() => {
    return  jwt.sign(
      {
        _id : this._id,
        email : this.email,
        username : this.username,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
      }
    )
}

userSchema.methods.generateAccessToken = async() => {
    return  jwt.sign(
      {
        _id : this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
      }
    )
}

 const User = mongoose.model("User", userSchema);
 module.exports  = User