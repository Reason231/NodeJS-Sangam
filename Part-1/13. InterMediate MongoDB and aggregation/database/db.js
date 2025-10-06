const mongoose=require("mongoose")

const connectDB = () =>{
    try{
        mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB connected successfully")
    }
    catch(e){
        console.log(e)
        
    }
}

module.exports=connectDB