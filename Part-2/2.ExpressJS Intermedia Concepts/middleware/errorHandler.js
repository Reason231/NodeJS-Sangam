// custom error class
// Error is the default one from the express
class APIError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
        this.name=`APIError`   // set the error type to API Error
    }
}

const asyncHandler = (fn) => (req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next)  // we are going to catch the error, and giving to next function
}

const globalErrorhandler = (err,req,res,next)=>{
    console.error(err.stack)   // log the error stack


    // api error
    if(err instanceof APIError){
        return res.status(err.statusCode).json({
            status:"Error",
            message:err.message
        })
    }

    // handle mongoose validation
    else if (err.name === "validationError"){
        return res.status(400).json({
            status:"Error",
            message:"Validation Error"
        })
    }

    // unexpected error
    else {
        return res.status(500).json({
            status:"Error",
            message:"An unexpected error occurred"
        })
    }
}

module.exports = {APIError,asyncHandler,globalErrorhandler}