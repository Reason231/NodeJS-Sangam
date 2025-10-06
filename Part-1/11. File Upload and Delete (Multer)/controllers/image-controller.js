// const { cloudinary } = require("../config/cloudinary")
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper")
const Image=require("../models/Image")
const fs=require('fs')
const cloudinary=require("cloudinary")

// to add the image by admin only
const uploadImageController=async(req,res)=>{
    try{
        // check if file is missing while submitting the formData
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:"File is required. Please upload an image"
            })
        }

        // upload to cloudinary
        const {url,publicId}=await uploadToCloudinary(req.file.path)

        // store the image url and publicId along with the uploaded userId in database
        const newlyUploadedImage=new Image({
            url,
            publicId,
            uploadedBy:req.userInfo.userId
        })

        await newlyUploadedImage.save()

        // delete the file from localStorage (from upload folder) after uploading to the cloudinary
        // There won't be any "images" in the upload folder if you write the below code.
        // fs.unlinkSync(req.file.path)

        res.status(201).json({
            success:true,
            message:"Image uploaded successfully",
            image:newlyUploadedImage
        })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Error occurred while uploading to cloudinary"
        })
    }
}

// to show the image to both user and admin
const fetchImagesController=async(req,res)=>{
    try{
        const images=await Image.find({})

        if(images){
            res.status(200).json({
                success:true,
                data:images
            })
        }
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            success:false,
            message:"Image not found"
        })
    }
}

// image delete
const deleteImageController = async (req, res) => {
  try {
    const getCurrentIdOfImageToBeDeleted = req.params.id;
    const userId = req.userInfo.userId;  // to know which admin is deleting the img

    const image = await Image.findById(getCurrentIdOfImageToBeDeleted);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    //check if this image is uploaded by the current user who is trying to delete this image
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: `You are not authorized to delete this image because you haven't uploaded it`,
      });
    }

    //delete this image first from your cloudinary storage
    await cloudinary.uploader.destroy(image.publicId);

    //delete this image from mongodb database
    await Image.findByIdAndDelete(getCurrentIdOfImageToBeDeleted);


    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
};

module.exports={uploadImageController,fetchImagesController,deleteImageController}