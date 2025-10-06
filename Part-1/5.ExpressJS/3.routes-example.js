const express=require("express")
const app=express()
const port=3000

// root route
app.get("./",(req,res)=>{
    res.send("Welcome to our home page")
})


app.get("/products",(req,res)=>{
    const products= [
        {id:1,label:"Product 1"},
        {id:2,label:"Product 2"},
        {id:3,label:"Product 3"},
    ]

    res.json(products)
})

// dynamic routing
app.get("/products/:productId",(req,res)=>{
    
    const productId=parseInt(req.params.productId)

    res.json(productId)
})


app.listen(port,()=>{
    console.log(`Server is successfully started in ${port}`)
})


