const rateLimit=require('express-rate-limit')

// maxRequests -> max api requests user can do within a period of time 
const createBasicRateLimiter = (maxRequests,time) =>{
    return rateLimit({
        max:maxRequests,   // max number of requests
        windowMs: time,
        message:"Too many requests, please try again later",
        standardHeaders:true,  // return rate limit info in the "response" headers
        legacyHeaders:false
    })
}

module.exports = {createBasicRateLimiter}