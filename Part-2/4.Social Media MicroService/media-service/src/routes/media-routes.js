const express = require("express");
const multer = require("multer");
const {
  uploadMedia,
  getAllMedias,
  deleteImageController,
} = require("../controllers/media-controller");
const { authenticateRequest } = require("../middleware/authMiddleware");
const logger = require("../utils/logger");
const uploadMiddleware = require("../middleware/upload-middleware");


const router = express.Router();


router.post(
  "/upload",
  authenticateRequest,
   uploadMiddleware.single("file"),
  uploadMedia
);

router.get("/get", authenticateRequest, getAllMedias);
router.delete("/:id",authenticateRequest,deleteImageController)

module.exports = router;