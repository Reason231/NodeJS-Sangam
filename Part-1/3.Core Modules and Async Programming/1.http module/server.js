// creating server
// node server.js
const http=require("http")
const PORT=3000

const server=http.createServer((req,res)=>{
    console.log("req",res)
    res.writeHead(200,{"Content-Type":"text/plain"})
    res.end("Hello nodeJS from HTTP module")
})

server.listen(PORT,"localhost",()=>{
    console.log(`Server is listening to port ${PORT}`)
})