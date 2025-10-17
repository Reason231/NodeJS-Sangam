const Post = require('../models/Post')
const logger=require('../utils/logger')
const {validateCreatePost}=require("../utils/validation")

const createPost=async(req,res)=>{
    logger.info("Create post endpoint hit")
    try{
           // 1. validate the schema
                const {error}=validateCreatePost(req.body)
                if(error){
                    logger.warn("Validation error",error.details[0].message)
                    return res.status(400).json({
                        success:false,
                        message:error.details[0].message
                    })
                }
        const {content,mediaIds} = req.body
        const newlyCreatedPost=new Post({
            // when the user is loggedIn, then they will be able to create the post.
            // so the the authorized user has the userInfo already, so we can retrive the user data
            // It is done by the authMiddleware.js, we get the "req.user" from it.
            User:req.user.userId,
            content,
            mediaIds:mediaIds || []   // put mediaIds if present else empty array
        })

        await newlyCreatedPost.save()

        logger.info("Post created successfully",newlyCreatedPost)
        res.status(201).json({
            success:true,
            message:"Post created successfully"
        })
    }
    catch(e){
        logger.error("Error creating post",e)
        res.status(500).json({
            success:false,
            message:"Error creating post"
        })
    }
}

const getAllPosts=async(req,res)=>{
    try{
        // Pagination
        const page=parseInt(req.query.page)  || 1;
        const limit=parseInt(req.query.limit) || 10
        const startIndex=(page-1)*limit;


        const cacheKey=`posts:${page}:${limit}`
        const cachedPosts=await req.redisClient.get(cacheKey)  // req.redisClient got from "server.js"

        if(cachedPosts){
            return res.json(JSON.parse(cachedPosts))
        }

        const posts=await Post.find({}).sort({createdAt:-1}).skip(startIndex).limit(limit)

        const totalNoOfPosts=await Post.countDocuments()

        const result={
            posts,
            currentPage:page,
            totalPages:Math.ceil(totalNoOfPosts/limit),
            totalPosts:totalNoOfPosts
        }

        // save yours posts in redis cache
        await req.redisClient.setex(cacheKey,300,JSON.stringify(result))

        res.json(result)
    }
    catch(e){
        logger.error("Error fetching posts",e)
        res.status(500).json({
            success:false,
            message:"Error fetching posts"
        })
    }
}


const getPost=async(req,res)=>{
    try{

    }
    catch(e){
        logger.error("Error fetching post by ID",e)
        res.status(500).json({
            success:false,
            message:"Error fetching post by ID"
        })
    }
}

const deletePost=async(req,res)=>{
    try{

    }
    catch(e){
        logger.error("Error deleting post",e)
        res.status(500).json({
            success:false,
            message:"Error deleting post"
        })
    }
}

module.exports={createPost,getAllPosts}