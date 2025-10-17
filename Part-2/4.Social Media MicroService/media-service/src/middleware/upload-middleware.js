const multer=require("multer")
const path=require("path")
const fs=require("fs")


// Create uploads folder inside your project root if it doesn't exist
const uploadPath = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


// set our multer storage
// The disk storage engine gives you full control on storing files to disk.
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,uploadPath)  // the path to set the file
    },

    // sets how to name the file
    filename:function(req,file,cb){
        cb(null,

            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        )
    }
})


// multer middleware
module.exports=multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024  // 5MB file size limit
    }
})