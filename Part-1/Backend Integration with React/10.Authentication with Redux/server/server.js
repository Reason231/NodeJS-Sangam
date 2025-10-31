require('dotenv').config()
const express=require("express")
const cors=require('cors')

const connectDB=require("./src/config/db")
const authRoutes=require("./src/routes/auth-routes")
const homeRoutes=require("./src/routes/home-routes")
const adminRoutes=require('./src/routes/admin-routes')

const app=express()
const PORT=process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use("/api/auth",authRoutes)
app.use("/api/user",homeRoutes)
app.use("/api/admin",adminRoutes)

// Start server only after successful DB connection
connectDB()
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Server is running on PORT ${PORT}`)
        })
    })
    .catch((err)=>{
        console.error('Server not started due to DB connection error')
    })

