const express=require('express')
require("dotenv").config()
const mongoose=require("mongoose")
const connectDB=require("./database/db")
const productRoutes=require("./routes/product-routes")
const bookRoutes = require("./routes/book-routes");


const app=express()
const PORT=process.env.PORT

connectDB()
app.use(express.json())
app.use("/products",productRoutes)
app.use("/reference", bookRoutes);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})