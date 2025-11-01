const jwt=require('jsonwebtoken')
const authMiddleware=(req,res,next)=>{
    try{
        const authHeader=req.headers["authorization"]
        const token=authHeader && authHeader.split(" ")[1]

        if(!token){
            return res.status(401).json({
                success:false,
                message:"Unauthorized user!! Token required"
            })
        }

        try{
            const decodedTokenInfo=jwt.verify(token,'CLIENT')
            console.log(decodedTokenInfo)
            req.userInfo=decodedTokenInfo
            return next()
        }
        catch(e){
            if(e.name === "TokenExpiredError"){
                return res.status(401).json({
                    success:false,
                    message:"Token expired error"
                })
            }else{
                return res.status(401).json({
                    success:false,
                    message:"Invalid token"
                })
            }
        }

    }
    catch(e){
        console.log(e)
        return res.status(500).json({
            success:false,
            message:"Authentication error"
        })
    }
}

module.exports=authMiddleware