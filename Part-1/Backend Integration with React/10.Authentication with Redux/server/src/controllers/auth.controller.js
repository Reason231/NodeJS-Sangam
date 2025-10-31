const User = require("../model/User");
const { validateRegistration, validateLogin } = require("../utils/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { error } = validateRegistration(req.body);

    if (error) {
      console.log(error.details[0].message);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { username, email, password } = req.body;

    const checkUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (checkUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newlyCreatedUser.save();

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newlyCreatedUser._id,
        username: newlyCreatedUser.username,
        email: newlyCreatedUser.email,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success:false,
      message:"Error while registering user"
    })
  }
};

const loginUser = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;

    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exists with this email",
      });
    }

    const comparePassword = await bcrypt.compare(password, checkUser.password);

    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Password doesn't match",
      });
    }

    const token = jwt.sign(
      {
        userId: checkUser._id,
        username: checkUser.username,
        email: checkUser.email,
        role: checkUser.role,
      },
      `CLIENT`,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "User logged in",
      isAuthenticated:true,
      user:checkUser,
      token,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const changePassword = async (req, res) => {
    try{
        const userId=req.userInfo.userId
        
        const checkUser=await User.findById(userId)

        if(!checkUser){
            return res.status(404).json({
                success:false,
                message:"User not found with this ID"
            })
        }

        const {oldPassword,newPassword}=req.body

        const isPasswordMatch=await bcrypt.compare(oldPassword,checkUser.password)
        if(!isPasswordMatch){
            return res.status(409).json({
                success:false,
                message:"Incorrect old password"
            })
        }

        const salt=await bcrypt.genSalt(10)
        const hashNewPassword=await bcrypt.hash(newPassword,salt)

        checkUser.password=hashNewPassword
        await checkUser.save()
        
        return res.status(200).json({
            success:true,
            message:"Password changed successfully",
            user:checkUser
        })
    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}
;
module.exports = { registerUser, loginUser,changePassword };
