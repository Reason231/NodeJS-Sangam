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

const uploadMediaToCloudinary=async(file)=>{
  if(!file) throw new Error("Empty file")

    if(file.path && typeof file.path === "String"){
      try{
        const result=await cloudinary.uploader.upload(file.path,{
          resource_type:"auto",
               folder: process.env.CLOUDINARY_FOLDER || 'media-service',
        })

        // delete local file after successful upload
     try { fs.unlinkSync(file.path); } catch (e) { /* log if needed */ }
        return result
      

      }
      catch(e){
        console.log("Error occur while uploading to cloudinary",e)
        throw new Error("Error while uploading to cloudinary")
      }
    }
}



module.exports={uploadMediaToCloudinary}