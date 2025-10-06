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

        // ## Pagination
        // when you click on "1st page", you will get query.page as 1 => in short it is 1st currentPage.
        // when you click on "2nd page", you will get query.page as 2 => in short it is 2nd currentPage
        const page=parseInt(req.query.page) || 1

        // Suppose, you want to render 5 images in one page so i.e. limit.
        const limit=parseInt(req.query.limit) || 0

        // when you are in 2nd page, the first 5 images should be skip.
        // when you are in 3rd page, the first 5 images, and second 5 images, should be skip to render 3rd part 5 images
        const skip = (page - 1) * limit  // (3-1) * 5 = 10 so 10 images is skip for 3rd page 


        // ## Sorting
        const sortBy=req.query.sortBy || "createdAt"
        const sortOrder=req.query.sortOrder === "asc" ? 1 : -1   // 1 is ascending.
        const totalImages=await Image.countDocuments()
        const totalPages=Math.ceil(totalImages/ limit)

        const sortObj={}
        sortObj[sortBy] = sortOrder
        const images=await Image.find().sort(sortObj).skip(skip).limit(limit)


        if(images){
            res.status(200).json({
                success:true,
                currentPage:page,
                totalPages:totalPages,
                totalImages:totalImages,
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