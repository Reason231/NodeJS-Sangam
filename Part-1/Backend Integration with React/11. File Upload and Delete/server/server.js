require('dotenv').config()
const express=require('express')
const cors=require('cors')
const connectDB=require('./database/db')
const authRoutes=require('./routes/auth-routes')


const app=express()
const PORT=process.env.PORT


connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
})