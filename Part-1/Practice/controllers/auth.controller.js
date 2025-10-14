const bcrypt=require("bcryptjs")
const User=require('../models/User')
const jwt=require('jsonwebtoken')

const registerUser=async(req,res)=>{
    try{
        const {username,email,password}=req.body

        const checkUser=await User.findOne({
            $or:[{username},{email}]
        })

        if(checkUser){
            return res.status(409).json({
                success:false,
                message:"User already exists "
            })
        }

        const salt=await bcrypt.genSalt(12)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newlyCreatedUser=new User({
            username,
            email,
            password:hashedPassword
        })

        await newlyCreatedUser.save()

        if(newlyCreatedUser){
            return res.status(200).json({
                success:true,
                message:"User registered successfully"
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Unable to register user! Please try again"
            })
        }
    }
    catch(e){
        console.log(e)
        throw new Error("Error occurred while registering",e)
    }
}

const loginUser=async(req,res)=>{
    const {email,password}=req.body

    const checkUser=await User.findOne({email})

    if(!checkUser){
        return res.status(404).json({
            success:false,
            message:"User doesn't exists"
        })
    }

    const checkPassword=await bcrypt.compare(password,checkUser.password)

    if(!checkPassword){
        return res.status(401).json({
            success:false,
            message:"Invalid password"
        })
    }

    const accessToken=jwt.sign({
        userId:checkUser._id,
        username:checkUser.username,
        email:checkUser.email,
        role:checkUser.role
    },
    `CLIENT_SECRET_KEY`,
    {expiresIn:"1hr"}
)

    res.status(200).json({
        success:true,
        message:"Logged in successfully",
        accessToken
    })
}

const changePassword=async(req,res)=>{
    try{
        const userId=req.userInfo.userId
        const {oldPassword,newPassword}=req.body

        const user=await User.findById(userId)

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User doesn't exists"
            })
        }

        const isPasswordMatch=bcrypt.compare(oldPassword,user.password)

        if(!isPasswordMatch){
            return res.status(401).json({
                success:false,
                message:"Old password didn't match"
            })
        }

        const salt=await bcrypt.genSalt(12)
        const newHashedPassword=await bcrypt.hash(newPassword,salt)

        user.password=newHashedPassword
        await user.save()

        return res.status(200).json({
            success:true,
            message:"Password changed successfully"
        })

    }
    catch(e){
        console.log(e)
    }
}


module.exports={registerUser,loginUser}