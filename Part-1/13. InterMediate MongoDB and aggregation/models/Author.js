const mongoose=require("mongoose")

// Note: We need to do reference, which author wrote which book
const AuthorSchema=new mongoose.Schema({
    name:String,
    bio:String
})

module.exports=mongoose.model("Author",AuthorSchema)