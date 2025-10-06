// node routes.js
const http=require("http")
const PORT=3000

const server=http.createServer((req,res)=>{
    const url = req.url

    // http://localhost:3000/
    if(url === '/'){
        res.writeHead(200,{"Content-Type":"text/plain"})
        res.end("Home page")
    }
    // http://localhost:3000/projects
    else if(url === "/projects"){
        res.writeHead(200,{"Content-Type":"text/plain"})
        res.end("Project page")
    }
    else{
        res.writeHead(404,{"Content-Type":"text/plain"})
        res.end("This page cannot be found")
    }
})

server.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})