require("dotenv").config()
const express=require('express')
const connectDB=require('./database/db')
const authRoutes=require('./routes/auth-routes')

connectDB()

const app=express()
const PORT=process.env.PORT

app.use(express.json())
app.use(express.urlencoded({urlencoded:true}))

app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})