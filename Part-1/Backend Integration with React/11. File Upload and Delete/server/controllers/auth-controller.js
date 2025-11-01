const { model } = require("mongoose");
const User = require("../models/User");
const {
  validateRegistration,
  validateLogin,
  validateChangePassword,
} = require("../utils/validation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { error } = validateRegistration(req.body);
    if (error) {
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
    const hashPassword = await bcrypt.hash(password, salt);

    const newlyCreatedUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newlyCreatedUser.save();

    return res.status(200).json({
      success: true,
      message: "User created successfully",
      user: newlyCreatedUser,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
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

    const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password doesn't match",
      });
    }

    const accessToken = jwt.sign(
      {
        userId: checkUser._id,
        username: checkUser.username,
        email: checkUser.email,
        role: checkUser.role,
      },
      "CLIENT",
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      accessToken,
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
  try {
    const userId = req.userInfo.userId;

    const checkUser = await User.findById(userId);

    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exists with this userId",
      });
    }

    const { oldPassword, newPassword } = req.body;

    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      checkUser.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password doesn't match",
      });
    }

    const { error } = validateChangePassword(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const newHashPassword = await bcrypt.hash(newPassword, 10);
    checkUser.password = newHashPassword;
    await checkUser.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Error occurred while changing password",
    });
  }
};

module.exports = { registerUser, loginUser, changePassword };
