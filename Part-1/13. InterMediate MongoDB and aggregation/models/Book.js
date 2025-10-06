const mongoose=require("mongoose")

const BookSchema=new mongoose.Schema({
    title:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,  // it will be linked by AuthorId
        ref:"Author"  // reference to author collection
    },

})

module.exports=mongoose.model("Book",BookSchema)