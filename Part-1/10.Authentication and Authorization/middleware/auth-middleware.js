// ## Note: This tutorial section part is given in readme.md
const jwt = require("jsonwebtoken");


// Auth middleware to protect routes and check if user is logged in
// When the user refreshes the page, it checks if it's authorized. it is used in "home-routes.js"
const authMiddleware = (req, res, next) => {
  try {
    // There are two patterns for sending JWT Token
    // 1. Header/ Bearer Token  2. Cookie/HttpOnly Cookie

    // Method 1.
    const authHeader = req.headers["authorization"]; // read header
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    // Method 2. Read token from cookies and store in browser
    // const token=req.cookies?.token



    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user. No token provided",
      });
    }

    if (!process.env.JWT_SECRET_KEY) {
      console.error("Missing JWT_SECRET_KEY");
      return res
        .status(500)
        .json({ success: false, message: "Server misconfiguration" });
    }

    
    // decode the token || Verify token
    const decodedTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedTokenInfo);

    // req is provided by Express — it already contains a lot of info.
    // we created custom "req.userInfo" middleware which is used in auth-controller
    req.userInfo = decodedTokenInfo; // Now it has has,email info
    next();
  } catch (e) {
    console.log("Auth Middleware error", e);
    return res.status(500).json({
      success: false,
      message: "Authentication error",
    });
  }
};

module.exports = authMiddleware;
