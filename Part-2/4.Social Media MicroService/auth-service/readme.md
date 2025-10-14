## Steps for auth-service/identity-service folder
- Note => In this video, "auth-service" is known as "identity-service"

## Steps for setup
1. Open the terminal of this folder
2. Run "npm init -y" 
3. Install the npm packages which is needed for this folder 
=> npm i nodemon --save-dev
=> npm i cors argon2 dotenv express express-rate-limit rate-limiter-flexible rate-limit-redis helmet ioredis joi jsonwebtoken mongoose  winston 
4. Go to "package.json" for the modification.


## Npm modules explanation
1. Argon2 => We have used "Argon2" instead of "bcrypt" for authentication because it is considered as more secure. 
2. Rate-Limiter-Flexible => We have used "node-rate-limiter-flexible" for the rate-limiting => npm i rate-limiter-flexible. It is used to limit the request in a period of time.
3. Express-rate-Limit => We have used "express-rate-limit" for limiting the repeated requests and also blocking the endpoints. In short, if a user request "/register", multiple times so it will be blocked.


## Steps for code
1. Go to "models" folder and create "User.js"
2. Go to "utils" folder and create "logger.js"
3. Go to "middleware" folder and create  "errorHandler.js"
4. Go to "RefreshToken.js" under "models" folder and import it in the "auth-controller.js" 
5. Go to "utils" folder and create "validation.js" 
6. Go to "utils" folder and create "generateToken.js" 
7. Go to "controllers" folder and create "auth-controller.js"
8. Go to "routes" folder and create "auth.routes.js"
9. Go to server.js and setup all the middlewares and import routes.



