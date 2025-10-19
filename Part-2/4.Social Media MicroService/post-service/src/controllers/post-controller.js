const Post = require('../models/Post')
const logger=require('../utils/logger')
const { publishEvent } = require('../utils/rabbitmq')
const {validateCreatePost}=require("../utils/validation")


// It searches for all keys in Redis that match the pattern "posts:*" (which means all cached pages like posts:1:10, posts:2:10, etc.)
// If such keys exist → it deletes them all (req.redisClient.del(keys)).
// So, after a new post is added, Redis no longer serves old cached data — it forces the next GET request to query fresh data from MongoDB and then re-cache it.
async function invalidatePostCache(req,input){
    const cachedKey=`post:${input}`
    await req.redisClient.del(cachedKey)

    const keys=await req.redisClient.keys("posts:*");
    if(keys.length > 0){
        await req.redisClient.del(keys)
    }
}

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
            // When the user is loggedIn, then they will be able to create the post.
            // So the the authorized user has the userInfo already, so we can retrieve the user data
            // It is done by the authMiddleware.js, we get the "req.user" from it.
            User:req.user.userId,
            content,
            mediaIds:mediaIds || []   // put mediaIds if present else empty array
        })

        await newlyCreatedPost.save()

        // ## RabbitMQ -> Publishing an even for the "search-service"
        // It will be consumed by "search-service" -> rabbitMQ
        await publishEvent('post-created',{
            postId:newlyCreatedPost._id.toString(),
            userId:newlyCreatedPost.User.toString(),
            content:newlyCreatedPost.content,
            createdAt:newlyCreatedPost.createdAt
        })


        // Whenever a new post is created, the existing cache (which contains old post data) becomes outdated.
        // So, we must delete the old cache so that next time someone calls /api/posts, the new post appears.
        await invalidatePostCache(req,newlyCreatedPost._id.toString())

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

        // setex → stands for “SET with EXpiration”.
        // It stores the value in Redis cache for a limited time (here, 300 seconds = 5 minutes)
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
        const postId=req.params.id
        const cacheKey=`post:${postId}`
         const cachedPost=await req.redisClient.get(cacheKey)  // req.redisClient got from "server.js"

        if(cachedPost){
            return res.json(JSON.parse(cachedPost))
        }

        const singlePostDetailsbyId=await Post.findById(postId)

        if(!singlePostDetailsbyId){
            return res.status(404).json({
                message:"Post not found",
                success:false
            })
        }

        await req.redisClient.setex(cachedPost,3600,JSON.stringify(singlePostDetailsbyId))

        res.json(singlePostDetailsbyId)
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
        const post=await Post.findOneAndDelete({
            _id:req.params.id,
            User:req.user.userId
        })

          if(!post){
            return res.status(404).json({
                message:"Post not found",
                success:false
            })
        }

        // RabbitMQ -> publish post for delete method
        // It will be consumed by "media-service"
        // "post-deleted" is the routing key which is required for consume in the media-service
        await publishEvent('post-deleted',{
            postId:post._id.toString(),
            userId:req.user.userId,
            mediaIds:post.mediaIds
        })

        // delete the cache data, after deleting a post, so that new data can be fetched
        await invalidatePostCache(req,req.params.id)

        res.json({
            message:"Post deleted successfully",
            success:true
        })
    }
    catch(e){
        logger.error("Error deleting post",e)
        res.status(500).json({
            success:false,
            message:"Error deleting post"
        })
    }
}

module.exports={createPost,getAllPosts,getPost,deletePost}