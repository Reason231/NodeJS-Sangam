
## Steps for setup
1. Open the terminal of this folder
2. Run "npm init -y" 
3. Install the npm packages which is needed for this folder 
=> npm i nodemon --save-dev
=> npm i cors dotenv express mongoose helmet jsonwebtoken winston ioredis express-rate-limit rate-limiter-flexible rate-limit-redis joi
4. Go to "package.json" for the modification.


## Steps for code
1. Go to "models" folder and create "Post.js"
2. Go to "utils" folder and create "logger.js" and copy the code from "auth-service" logger.js
3. Go to "controllers" folder and create "post-controller.js"
4. Go to "routes" folder and create "post-routes.js"
5. Go to "middleware" folder and create "authMiddleware.js" to check if the user is authenticated or not.
6. Go to "api-gateway" folder and go to "server.js" and "middleware"
7. Go to "utils" and create "validation.js"

 ## Tut video 
 (Tut video => 5:15:30 - 5:46:13 & 5:55:14 -)




