## Steps for setup
1. Open the terminal of this folder
2. Run "npm init -y" 
3. Install the npm packages which is needed for this folder 
=> npm i nodemon --save-dev
=> npm i cloudinary multer mongoose express cors helmet winston rate-limiter-flexible ioredis express-rate-limit rate-limit-redis
4. Go to "package.json" for the modification.


## Steps for code
1. Go to "utils" folder and create "logger.js" and copy the code from "auth-service" -> logger.js
2. Go to "middleware" folder and create "authMiddleware.js" and "errorHandler.js" and copy the code from the "post-service" -> authMiddleware and errorHandler
3. Go to "models" folder and create "Media.js"
4. Go to "utils" folder and create "cloudinary.js"
5. Go to "controllers" folder and create "media-controller.js"
6. Go to "routes" folder and create "media-routes.js"
7. Go to "server.js" file
8. Go to "api-gateway" folder and go to "server.js" and "middleware"

 ## Tut video 
 (Tut video => 6:28:00 - 7:16:19)

 ## Need to setup header in postman for uploading image
 [!Alt](./1.png)





