const express=require("express")
const app=express()

// application level setting
app.set('view engine','ejs')  // setting ejs


// routing
app.get("/",(req,res)=>{
    res.send("Home Page")
})

// error handling middleware
app.use((err,req,res,next) => {
    console.log(err.stack)
    res.status(500).send("Something went wrong")
})


// Middleware function to access the public files
app.use(express.static("public"))