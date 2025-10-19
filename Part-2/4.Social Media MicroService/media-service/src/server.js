require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const mediaRoutes = require("./routes/media-routes");
const errorHandler = require("./middleware/errorHandler");
const {RateLimiterRedis} = require('rate-limiter-flexible')
const Redis=require('ioredis')
const {rateLimit}=require("express-rate-limit")
const {RedisStore} = require('rate-limit-redis')
const logger = require("./utils/logger");
const { connectToRabbitMQ, consumeEvent } = require("./utils/rabbitmq");
const { handlePostDeleted } = require("./eventHandlers/media-event-handlers");
// const { connectToRabbitMQ, consumeEvent } = require("./utils/rabbitmq");
// const { handlePostDeleted } = require("./eventHandlers/media-event-handlers");

const app = express();
const PORT = process.env.PORT || 3003;
const redisClient=new Redis(process.env.REDIS_URL)

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info("Connected to mongodb"))
  .catch((e) => logger.error("Mongo connection error", e));

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`);
  logger.info(`Request body, ${req.body}`);
  next();
});

// DDos protection and rate limiting
// Global DDos Protection -> This is a global rate limiter — it protects your entire service from being overloaded by too many requests per second from the same IP (a common symptom of DDoS or brute-force attacks).
const rateLimiter=new RateLimiterRedis({
    storeClient:redisClient,   // redisClient is created above
    keyPrefix:"middleware",
    points:10,                // 10 requests
    duration:1                // in 1 second
})

app.use((req,res,next)=>{
    // if the req is less than 10, it will go to next function, else catch.
    rateLimiter.consume(req.ip)
    .then(()=>next())
    .catch(()=>{
        logger.warn(`Rate limit exceeded for IP ${req.ip}`)
        res.status(429).json({success:false,message:"Too many requests"})
    })
})

// IP based rate limiting for sensitive endpoints
const sensitiveEndPointsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,    // 15mins
    max:100,                     // limit CRUD requests
    standardHeaders:true,      // return rate limit info in the "response" headers
    legacyHeaders:false,
    handler:(req,res)=>{
        logger.warn(`Sensitive endpoint rate limit exceeded for IP: ${req.ip}`)
        res.status(429).json({success:false,message:"Too many requests"})
    },

    // Redis store configuration
    store:new RedisStore({
        sendCommand:(...args) => redisClient.call(...args),
    })
})


// applying the "sensitiveEndPointsLimiter" function to the routes
app.use('/api/media',sensitiveEndPointsLimiter)  // if you do multiple requests, it will be blocked

app.use("/api/media",mediaRoutes)

app.use(errorHandler)

// ## Rabbit MQ
async function startServer(){
  try{
    await connectToRabbitMQ()

    // consume all the events created by post-service
    await consumeEvent('post-deleted',handlePostDeleted)

    app.listen(PORT,()=>{
        logger.info(`Media service running on port ${PORT}`)
    })
  }
  catch(e){
    logger.error(`Failed to connect to server`,e)
    process.exit(1)
  }
}

startServer()

app.listen(PORT,()=>{
    logger.info(`Media service is running on port ${PORT}`)
})


process.on("unhandledRejection",(reason,promise)=>{
    logger.error("Unhandled Rejection at",promise,"reason",reason)
})