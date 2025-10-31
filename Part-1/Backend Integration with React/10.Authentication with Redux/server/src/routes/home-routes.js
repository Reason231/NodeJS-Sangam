const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const homeMiddleware=require('../middleware/home-middleware')
const router = express.Router();



router.get("/home", authMiddleware,homeMiddleware, (req, res) => {
  const { username, userId, role } = req.userInfo;

  console.log(username)

  res.json({
    message: "Welcome to the home page",
    user: {
      _id: userId,
      username,
      role,
    },
  });
});

module.exports = router;