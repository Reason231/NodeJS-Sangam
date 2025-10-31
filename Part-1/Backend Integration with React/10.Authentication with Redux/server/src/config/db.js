const mongoose=require("mongoose")
const dbURL=process.env.MONGODB_URI

const connectDB=async()=>{
    try{
        if(!dbURL){
            throw new Error('MONGODB_URI is not set in environment')
        }

        // include recommended connection options and a reasonable server selection timeout
        await mongoose.connect(dbURL)
        console.log(`Mongodb connected successfully`)
    }
    catch(e){
        console.error('Failed to connect to MongoDB:', e.message || e)
        // rethrow so callers can decide how to handle startup failure
        throw e
    }
}

module.exports=connectDB