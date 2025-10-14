require('dotenv').config()
const express=require('express')
const Redis=require('ioredis')
const helmet=require('helmet')
const { configureCors } = require('./config/corsConfig')
const {rateLimit}=require('express-rate-limit')
const {RedisStore}=require("rate-limit-redis")
const logger=require('./utils/logger')
const proxy=require('express-http-proxy')
const errorHandler = require('./middleware/errorHandler')

const app=express()
const PORT=process.env.PORT

const redisClient=new Redis(process.env.REDIS_URL)

app.use(helmet())
app.use(configureCors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// rate limiting => Code copied from auth-service "server.js"
const ratelimitOptions=rateLimit({
    windowMs: 15 * 60 * 1000,    // 15mins
    max:100,                     // max number of requests
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

app.use(ratelimitOptions)

// Code copied from auth-service "server.js"
app.use((req,res,next)=>{
    logger.info(`Received ${req.method} request to ${req.url}`)
    logger.info(`Request body, ${req.body}`)
    next()
})


// Proxy explanation
// api-gateway -> runs on 3000 PORT -> when we hit this endpoint from api-gateway /v1/auth/register 
// auth-service -> runs on 3001 PORT -> then this endpoint of auth should be targeted /api/auth/register

const proxyOptions={
    proxyReqPathResolver:(req)=>{
        return req.originalUrl.replace(/^\/v1/,"/api")    // replacing api-gateway "/v1" to auth-service "/api"
    },

    // proxy error handler
    proxyErrorHandler:(err,res,next)=>{
        logger.error(`Proxy error: ${err.message}`)
        res.status(500).json({
            message:"Internal server error",
            error:err.message
        })
    }
}

// setting up proxy for "auth-service"
// It will target /api/auth/ by changing /v1/ to /api/
// It will also target "localhost:3001" port
app.use('/v1/auth',proxy(process.env.AUTH_SERVICE_URL,{
    ...proxyOptions,   // above function
    proxyReqOptDecorator:(proxyReqOpts,srcReq)=>{
        proxyReqOpts.headers["Content-Type"] = "application/json"
        return proxyReqOpts
    },
    userResDecorator:(proxyRes,proxyResData,userReq,userREs) => {
        logger.info(`Response received from Auth service:${proxyRes.statusCode}`)

        return proxyResData
    }
}))


app.use(errorHandler)

app.listen(PORT,()=>{
    logger.info(`API Gateway is running on port ${PORT}`)
    logger.info(`Auth Service is running on port ${process.env.AUTH_SERVICE_URL}`)
    logger.info(`Redis Url is running on port ${process.env.REDIS_URL}`)
})