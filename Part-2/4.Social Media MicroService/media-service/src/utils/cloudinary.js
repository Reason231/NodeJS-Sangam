const cloudinary = require("cloudinary").v2;
const logger = require("./logger");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const uploadMediaToCloudinary  = (file) => {
//   return new Promise((resolve, reject) => {
//     const uploadStream = cloudinary.uploader.upload_stream(
//       {
//         resource_type: "auto", // file-format
//       },
//       (error, result) => {
//         if (error) {
//           logger.error("Error while uploading media to cloudinary", error);
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       }
//     );

//     uploadStream.end(file.buffer);
//   });
// };

const uploadMediaToCloudinary=async(filePath)=>{
    try{
        const result=await cloudinary.uploader.upload(filePath)

        // You need publicId, so that you can update or remove the image in cloudinary, it will be update/remove in the db but not in the cloudinary, so we need it.
        return{
            url:result.secure_url,
            publicId:result.public_id
        }
    }
    catch(e){
        console.log("Error occur while uploading to cloudinary",e)
        throw new Error("Error while uploading to cloudinary")
    }
}



module.exports={uploadMediaToCloudinary}