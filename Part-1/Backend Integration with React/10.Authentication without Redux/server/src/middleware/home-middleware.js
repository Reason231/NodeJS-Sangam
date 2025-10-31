const homeMiddleware=(req,res,next)=>{
    if(req.userInfo.role !== "user"){
        return res.status(401).json({
            message:"Unauthorized user! User rights required"
        })
    }

    next()
}

module.exports=homeMiddleware