## Note
- All other services, will be run through the api-gateway like it's the main door.
- It targets individual proxy which target individuals services. 
- Run the "auth-service" while running the "api-gateway"

## Steps for api-gateway folder
1. Open the terminal of this folder
2. Run "npm init -y" 
3. Install the npm packages which is needed for this folder 
=> npm i nodemon --save-dev
=> npm i cors dotenv express express-http-proxy helmet ioredis jsonwebtoken winston express-rate-limit rate-limit-redis
4. Go to "package.json" for the modification.


## Steps for code
Below steps are from video (4:19:53 - 4:47:24)
1. Go to "utils" folder and create "logger.js" and copy and paste the code from "auth-service" folder.
2. Go to "middleware" folder and create  "errorHandler.js" and copy and paste the code from "auth-service" folder.
3. Go to "server.js"

Below steps are from video (5:46:40 - )
1. Go to "middleware" folder and create "authMiddleware.js" 

## Tut video timestamp
- Setup => 2:56:54 - 3:10:30 &
- Auth-service proxy implementation in api-gateway 4:19:53 - 4:47:24 & 
- Post-service proxy implementation in api-gateway 5:46:40 - 

