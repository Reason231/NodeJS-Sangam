const mongoose=require('mongoose')
const dbURL=process.env.MONGODB_URI

const connectDB=async()=>{
    try{
        await mongoose.connect(dbURL)
        console.log(`Mongodb connected successfully`)
    }
    catch(e){
        console.log(`Error connecting db`,e)
    }
}

module.exports=connectDB