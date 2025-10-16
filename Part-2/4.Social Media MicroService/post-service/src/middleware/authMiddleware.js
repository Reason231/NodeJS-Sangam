const logger=require('../utils/logger')

const authenticateRequest=(req,res,next)=>{
    const userId=req.headers[`x-user-id`]  // getting from the api-gateway service

    if(!userId){
        logger.warn("Access attempted without user ID")
        return res.status(401).json({
            success:false,
            message:"Authentication required! Please login to continue"
        })
        
    }

    req.user={userId}
    next()
}

module.exports={authenticateRequest}