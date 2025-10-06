const cloudinary=require("../config/cloudinary")

const uploadToCloudinary=async(filePath)=>{
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

module.exports={uploadToCloudinary}