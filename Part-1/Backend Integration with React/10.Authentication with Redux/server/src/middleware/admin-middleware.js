const adminMiddleware=(req,res,next)=>{
    if(req.userInfo.role !== "admin"){
        return res.status(401).json({
            success:false,
            message:"Unauthorized user! Admin rights required"
        })
    }
    next()
}

module.exports=adminMiddleware