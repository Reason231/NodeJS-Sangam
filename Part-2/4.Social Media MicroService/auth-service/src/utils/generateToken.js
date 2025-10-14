const jwt=require("jsonwebtoken")
const crypto=require('crypto')
const RefreshToken=require('../models/RefreshToken')

const generateTokens=async(user)=>{
    const accessToken=jwt.sign({
        userId:user._id,
        username:user.username
    },
    process.env.JWT_SECRET,
    {expiresIn:"60m"}   // in industry, the accessToken is generally less than 15mins.
)

    // refreshToken allows applications to get new, short-lived access tokens without making the user re-enter their credentials
    const refreshToken=crypto.randomBytes(40).toString("hex")
    const expiresAt=new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)  // refresh token expires in 7 days


    // creates the refresh token model for "RefreshToken.js" which is for db
    await RefreshToken.create({
        token:refreshToken,
        user:user._id,
        expiresAt
    })

    return {accessToken,refreshToken}
}

module.exports=generateTokens