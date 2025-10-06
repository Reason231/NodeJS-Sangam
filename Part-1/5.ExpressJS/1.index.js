// creating express server
const express=require("express")
const app=express()
const port=3000

// HTTP methods
app.get("/",(req,res)=>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`Server is successfully started in ${port}`)
})