const mongoose=require('mongoose')
const MONGO_URL=process.env.MONGO_URL

const connectDB=async()=>{
    try{
        await mongoose.connect(MONGO_URL)
        console.log("MongoDB is successfully connected")
    }
    catch(e){
        console.log(e)
        throw new Error('Mongodb is unable to connect')
    }
}

module.exports=connectDB