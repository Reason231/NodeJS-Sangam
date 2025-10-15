const RefreshToken=require('../models/RefreshToken')
const User=require('../models/User')
const generateTokens = require('../utils/generateToken')
const logger=require('../utils/logger')
const { validateRegistration, validatelogin } = require('../utils/validation')


// ## user registration
const registerUser=async(req,res)=>{
    // 0. gives info that user has entered the registered route
    logger.info("Registration endpoint hit.....")  

    try{
        // 1. validate the schema
        const {error}=validateRegistration(req.body)
        if(error){
            logger.warn("Validation error",error.details[0].message)
            return res.status(400).json({
                success:false,
                message:error.details[0].message
            })
        }

        // 2. checks the db for the user
        const {username,email,password}=req.body

        let user=await User.findOne({
            $or:[{username},{email}]
        })
        
        if(user){
            logger.warn("User already exists")
            return res.status(409).json({
                success:false,
                message:`${user} user already exists`
            })
        }

        // ## Note -> rhashing password is already done in "User.js"
        
        // 3. save the user to db
        user = new User({username,email,password})
        await user.save()
        logger.warn("User saved successfully",user._id)  // logs that user is saved in db


        // 4. sends the userData for the refreshToken to "generateToken.js" file
        // getting the accessToken and refreshToken
        const {accessToken,refreshToken}=await generateTokens(user)

        // 5. sends the response after all steps are completed successfully
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            accessToken,
            refreshToken
        })
        
    }
    catch(error){
        logger.error("Registration error occurred",error)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
    
// ## user login
const loginUser=async(req,res)=>{

    // 0. Gives info that user has entered the registered route
    logger.info("Login endpoint hit....")
    try{

        // 1. validate the schema
        const {error}=validatelogin(req.body)
        if(error){
            logger.warn("Validation error",error.details[0].message)
            return res.status(400).json({
                success:false,
                message:error.details[0].message
            })
        }
        
        // 2. checks the db for the user
        const {email,password}=req.body

        const user=await User.findOne({email})

        if(!user){
            logger.warn("Invalid user")
            return res.status(403).json({
                success:false,
                message:"Invalid credentials"
            })
        }
    
        // 3. user valid password or not
        const isValidPassword=await user.comparePassword(password)
        if(!isValidPassword){
            logger.warn("Invalid password")
            return res.status(401).json({
                success:false,
                message:"Invalid password"
            })
        }

        // 4. sends the userData for the refreshToken to "generateToken.js" file
        // getting the accessToken and refreshToken
        const {accessToken,refreshToken}=await generateTokens(user)

        // 5. sends the response after all steps are completed successfully
        res.json({
            accessToken,
            refreshToken,
            userId:user._id
        })

    }
    catch(error){
        logger.error("Login error occurred",error)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


// refresh token
// Need the refresh token for logout
// Its function is to verifies a user’s refresh token and, if it’s valid, issues a new access token and a new refresh token.
// It renews the user’s session without forcing them to log in again.
// It replaces the old refresh token with a new one (for security reasons).
const refreshTokenUser=async(req,res)=>{
    logger.info("Refresh token endpoint hit.....")
    try{

        // 1. extracts refresh token from request body
        const {refreshToken}=req.body
        if(!refreshToken){
            logger.warn("Refresh token missing")
            return res.json({
                success:false,
                message:"Refresh token missing"
            })
        }

        // 2. The backend checks if the token exists in the RefreshToken collection
        const storedToken=await RefreshToken.findOne({token:refreshToken})

        // const storedToken=await RefreshToken.deleteOne({token:refreshToken})
        if(!storedToken){
            logger.warn("Invalid refresh token provided")
            return res.status(400).json({
                success:false,
                message:"Invalid refresh token"
            })
        }

    
        // 3. Checks if the token is expired
        if(!storedToken || storedToken.expiresAt < new Date()){
            logger.warn("Invalid or expired refresh token")

            return res.status(401).json({
                success:false,
                message:"Invalid or expired refresh token"
            })
        }

        // 4. Finds the user linked to the token
        const user=await User.findById(storedToken.user)
        
        // Each refresh token is linked to a specific user.
        // If the user no longer exists, it returns an error.
        if(!user){
            logger.warn("User not found")

            return res.status(401).json({
                success:false,
                message:"User not found"
            })
        }

        // 5. Generates new tokens
        const {accessToken:newAccessToken,refreshToken:newRefreshToken}=await generateTokens(user)

        // 6. deletes the old refresh token
        await RefreshToken.deleteOne({_id:storedToken._id})

        res.json({
            accessToken:newAccessToken,
            refreshToken:newRefreshToken
        })
        
    }
    catch(error){
        logger.error("Refresh token error occurred",error)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


// logout
const logoutUser=async(req,res)=>{
    logger.info("Logout endpoint hit")
    try{
        const {refreshToken}=req.body
        if(!refreshToken){
            logger.warn("Refresh token missing")
            return res.status(400).json({
                success:false,
                message:"Refresh token missing"
            })
        }

        // delete the refresh token for logout
        const storedToken=await RefreshToken.findOneAndDelete({
            token:refreshToken
        })
        if(!storedToken){
            logger.warn("Invalid refresh token provided")
            return res.status(400).json({
                success:false,
                message:"Invalid refresh token"
            })
        }

        logger.info("Refresh token deleted for logout")

        res.json({
            success:true,
            message:"Logged out successfully"
        })
    }
    catch(error){
        logger.error("Error while logging out",error)
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

module.exports={registerUser,loginUser,refreshTokenUser,logoutUser}