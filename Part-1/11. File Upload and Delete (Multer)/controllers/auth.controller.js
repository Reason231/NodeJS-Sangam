const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// ## register controller
const registerUser = async (req, res) => {
  try {
    // extract user info from our request body
    const { username, email, password} = req.body;

    // check if user is already exists in our database
    const checkExistingUser = await User.findOne({
      $or: [{username}, {email}],
    });
    if (checkExistingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User is already exists either with same username or same email. Please try with a different username or email",
      });
    }

    // hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user and save in your database
    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: "user"
    });

    await newlyCreatedUser.save();

    if (newlyCreatedUser) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Unable to register user! Please try again",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};

// ## login controller
const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Usually, login is done with either username OR email, not both.
    const checkUser = await User.findOne({ username }) || await User.findOne({email});

    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "User doesn't exists with this userName",
      });
    }


    // if the password is correct or not
    const isPasswordMatch = await bcrypt.compare(password, checkUser.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Password Incorrect",
      });
    }

    // create user token
    const accessToken = jwt.sign(
      {
        userId: checkUser._id,
        username: checkUser.username,
        email: checkUser.email,
        role: checkUser.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successful",
      accessToken
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while logging! Please try again",
    });
  }
};



// ## changePassword
const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId; // req.userInfo got from auth-middleware

    // extract old and new password
    const { oldPassword, newPassword } = req.body;

    // find the current logged in user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // check if the old password is correct
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect! Please try again",
      });
    }

    // hash the new password here
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    // update user password
    user.password = newHashedPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occurred while changing password",
    });
  }
};

module.exports = { registerUser, loginUser, changePassword };
