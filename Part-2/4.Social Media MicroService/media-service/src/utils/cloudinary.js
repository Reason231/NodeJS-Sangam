// Note: Code is copied from "Part 1-Upload files"

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadMediaToCloudinary(file) {
  if (!file) throw new Error('uploadMediaToCloudinary: empty file argument');

  
  // ## 1st method of uploading image.If multer.diskStorage used, expect file.path (string)
  if (file.path && typeof file.path === 'string') {
    try {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: 'auto',
        folder: process.env.CLOUDINARY_FOLDER || 'media-service',
      });

      // remove local file (best-effort)
      try { fs.unlinkSync(file.path); } catch (err) { /* log if wanted */ }

      return result; // MUST return the cloudinary result
    } catch (err) {
      // On error, try to remove the file to avoid leftover temp files
      try { if (file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path); } catch (e) {}
      // wrap error for clarity
      throw new Error('Error while uploading to cloudinary: ' + (err.message || err));
    }
  }

  // ## 2nd method of uploading image, using the memoryStorage and buffer
  // if (file.buffer) {
  //   // Use upload_stream variant (but return a Promise)
  //   return new Promise((resolve, reject) => {
  //     const uploadStream = cloudinary.uploader.upload_stream(
  //       { resource_type: 'auto', folder: process.env.CLOUDINARY_FOLDER || 'media-service' },
  //       (error, result) => {
  //         if (error) return reject(new Error('Cloudinary stream upload error: ' + error.message));
  //         resolve(result);
  //       }
  //     );
  //     // streamifier is required for buffer -> stream
  //     const streamifier = require('streamifier');
  //     streamifier.createReadStream(file.buffer).pipe(uploadStream);
  //   });
  // }

  throw new Error('uploadMediaToCloudinary: unsupported file object');
}

module.exports = { uploadMediaToCloudinary };
