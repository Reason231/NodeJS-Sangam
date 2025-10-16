const mongoose=require("mongoose")

const postSchema=new mongoose.Schema({
    User:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true
    },
    mediaIds:[
        {
            type:String
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
})

// It is needed because we will be having a different service for search service.
postSchema.index({content:"text"})

const Post = mongoose.model("Post",postSchema)

module.exports=Post