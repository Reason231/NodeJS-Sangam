const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    email:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        role:["user","admin"],
        default:"user"
    }
},
{
    timestamps:true
})

module.exports=mongoose.model("User",userSchema)