const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Token required",
      });
    }

    try {
      const decoded = jwt.verify(token, `CLIENT`);
      req.userInfo = decoded; 
      return next();
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ success: false, message: "Token expired" });
      }
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = authMiddleware;
