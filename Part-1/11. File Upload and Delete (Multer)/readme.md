## Installation
- npm i express mongoose dotenv jsonwebtoken bcryptjs multer cloudinary joi

## File Upload and Fetching
- Tut video => 06:02:12 - 06:47:30

## File Deleting 
- Tut video => 7:00:50 - 7:13:30

## Multer
- It is used for "form-data" in the postman.


## Steps of code
1. Create "image-model.js" file
2. Go to the cloudinary website => 
- https://console.cloudinary.com/app/c-ce0b1deaa817fbf1c372eed9d1f226/home/dashboard
- cloud_name => dslcsrhit
- API Key => 613931827146359
- API Secret => y9V-pEIS-UjU5eRpGrPfJuP31Ck
3. Create "config" folder and inside it "config.js"
4. Create "helpers" folder and inside it "cloudinaryHelper.js"
5. Create "image-controller.js"
6. Create "upload-middleware.js" => multer
7. Create "image-routes.js"

## Note for "upload" folder
- delete the file from localStorage (from upload folder) after uploading to the cloudinary
- There won't be any "images" in the upload folder if you write the below code.
- Code => fs.unlinkSync(req.file.path)
