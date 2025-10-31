const express=require('express')
const adminMiddleware = require('../middleware/admin-middleware')
const authMiddleware = require('../middleware/auth-middleware')
const router=express.Router()

router.get("/home",authMiddleware,adminMiddleware,(req,res)=>{
    res.status(200).json({
        success:true,
        message:"Welcome to the admin page"
    })
})

module.exports=router