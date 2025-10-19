
## Steps for setup
1. Open the terminal of this folder
2. Run "npm init -y" 
3. Install the npm packages which is needed for this folder 
=> npm i nodemon --save-dev
=> npm i cors dotenv express mongoose helmet jsonwebtoken winston ioredis express-rate-limit rate-limiter-flexible rate-limit-redis joi amqplib
4. Go to "package.json" for the modification.


## Steps for code
1. Go to "utils" folder and create "logger.js" and copy the code from "post-service" logger.js
2. Go to "middleware" folder and create "authMiddleware" and "errorHandler" and copy the code from "post-service" middleware
3. Go to "models" folder and create "Search.js"
4. Go to "server.js"
5. Go to "utils" and create "RabbitMQ" and copy the code from "media-service"
6. Go to "controllers" folder and create "search-controller.js"
7. Go to "routes" folder and create "search-routes.js"
8. Go to "post-service" -> "controllers" -> "post-controllers" -> createPost function
9. Go to "src" and create "eventHandler" folder
10. Go to "api-gateway" folder and go to "server.js" for proxy setup


 ## Tut video 
 (Tut video => 8:05:27 - 8:50:15)

## Output Test
- 8:31:00 & 8:41:00
- When you create a new post, then that post will be added automatically to the "Search" collection of db
- [!Alt](./Output.png)



