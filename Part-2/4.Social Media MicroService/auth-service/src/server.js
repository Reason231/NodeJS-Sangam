require('dotenv').config()
const mongoose=require("mongoose")
const logger=require('./utils/logger')
const express=require('express')
const helmet=require('helmet')
const { configureCors } = require('./config/corsConfig')
const {RateLimiterRedis} = require('rate-limiter-flexible')
const Redis=require('ioredis')
const {rateLimit}=require("express-rate-limit")
const {RedisStore} = require('rate-limit-redis')
const routes=require('./routes/auth.routes')
const errorHandler=require('./middleware/errorHandler')


const app=express()
const PORT=process.env.PORT

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI)
.then(()=>logger.info("Connected to mongodb"))
.catch((e)=>logger.error("Mongodb connection error",e))

const redisClient=new Redis(process.env.REDIS_URL)


// middlewares
// Helmet is designed to enhance security by setting various HTTP headers
app.use(helmet())
app.use(configureCors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req,res,next)=>{
    logger.info(`Received ${req.method} request to ${req.url}`)
    logger.info(`Request body, ${req.body}`)
    next()
})


// DDos protection and rate limiting
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
    max:50,                     // max number of requests
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
app.use('/api/auth/register',sensitiveEndPointsLimiter)  // if you do multiple requests, it will be blocked

// Main routes
app.use('/api/auth',routes)    // http://localhost:3001/api/auth/register

// error handler
app.use(errorHandler)

app.listen(PORT,()=>{
    logger.info(`Identity service running one port ${PORT}`)
})

// unhandled promise rejection
process.on('unhandledRejection',(reason,promise)=>{
    logger.error(`Unhandled Rejection at`,promise,"reason",reason)
})