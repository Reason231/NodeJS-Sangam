const logger=require('../utils/logger')

const authenticateRequest=(req,res,next)=>{
    // x-user-id helps to check whether the user is authenticated or not
    // only authenticated user can access the postService for CRUD 
    // getting from the "api-gateway service" folder "server.js"
    const userId=req.headers["x-user-id"] 

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