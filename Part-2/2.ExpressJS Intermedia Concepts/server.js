require('dotenv').config()
const express=require("express")
const {configureCors}=require('./config/corsConfig')
const { requestLogger,addTimeStamp} = require('./middleware/customMiddleware')
const {globalErrorhandler}=require('./middleware/errorHandler')
const {urlVersioning} = require("./middleware/apiVersioning")
const {createBasicRateLimiter} = require('./middleware/rateLimiting')
const itemRoutes=require('./routes/item-routes')



const app=express()
const PORT=process.env.PORT || 3000

// custom Middleware
app.use(requestLogger) 
app.use(addTimeStamp)

// cors
app.use(configureCors())
// express rate limiter
app.use(createBasicRateLimiter(2,15*60*100))  // 2 requests per 15 minutes
app.use(express.json())

// api versioning
// GET -> http://localhost:3000/api/v1/items
// GET -> http://localhost:3000/api/v2/items  -> It will give u error
app.use(urlVersioning('v1'))  
app.use('/api/v1',itemRoutes)

// Global Error handler
app.use(globalErrorhandler)



app.listen(PORT,()=>{
    console.log(`Server is now running on ${PORT}`)
})

