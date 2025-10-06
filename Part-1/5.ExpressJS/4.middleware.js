const express=require("express")
const app=express()

// define middleware function
const myMiddleware=(req,res,next)=>{
    console.log("This first middleware will run on every request")

    // If you comment down the next(), then the "/" and "/about" will not give any response, cause the next function will not be executed.
    next()
}

app.use(myMiddleware)

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.get("/about",(req,res)=>{
    res.send("About Page")
})

app.listen(3000,()=>{
    console.log(`Server is now running on 3000`)
})