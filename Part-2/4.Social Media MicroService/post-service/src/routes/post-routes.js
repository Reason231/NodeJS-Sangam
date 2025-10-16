const express=require('express')
const {createPost}=require('../controllers/post-controller')
const {authenticateRequest}=require('../middleware/authMiddleware')

const router=express()

// Middleware -> this will tell if the user is an authenticated user or not, for getting the user Data
router.use(authenticateRequest)

router.post('/create-post',createPost)

module.exports=router