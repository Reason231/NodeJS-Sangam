require('dotenv').config()
const express=require("express")
const connectDB=require("./database/db")
const bookRoutes=require("./routes/book-routes")

const app=express()
const PORT=process.env.PORT || 3000

//connect to our database
connectDB()

//middleware -> express.json()
app.use(express.json())

// routes
app.use("/api/books",bookRoutes)

app.listen(PORT,()=>{
    console.log(`Server is successfully running on ${PORT}`)
})