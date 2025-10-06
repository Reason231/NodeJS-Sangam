const express=require('express')
const path=require("path")
const { title } = require('process')

const app=express()

// set the view engine as ejs
app.set("view engine",'ejs')

// set the directory for the views
app.set('views',path.join(__dirname,'views'))  // it targets to the 'views' folder

const products=[
    {
        id:1,
        title:"Product 1"
    },
    {
        id:2,
        title:"Product 2"
    },
    {
        id:3,
        title:"Product 3"
    },
]

app.get("/",(req,res)=>{
    res.render('home',{title:"Home",products:products})
})

app.get("/about",(req,res)=>{
    res.render("about",{title:"About Page"})
})

const port=3000
app.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})