require("dotenv").config()
const express=require("express")
const app=express()
const connectToDB=require("./database/db")
const homeRoutes=require("./routes/home-routes")
const authRoutes=require("./routes/auth-routes")
const adminRoutes=require("./routes/admin-routes")
const cookieParser=require("cookie-parser")
const uploadImageRoutes=require("./routes/image-routes")


connectToDB()

// Middleware
const PORT=3000
app.use(express.json())
app.use(cookieParser())  // must be added to read cookies
app.use(express.urlencoded({ extended: true })); // for x-www-form-urlencoded in postman



app.use("/api/home",homeRoutes)
app.use('/api/auth',authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/image",uploadImageRoutes)

app.listen(PORT,()=>{
    console.log(`Server is successfully running on ${PORT}`)
})

// 