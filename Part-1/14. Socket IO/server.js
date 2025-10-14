const express=require('express')
const http=require('http')
const socketIo=require("socket.io")

const app=express()

const server=http.createServer(app)


// initiate socket.io and attach this to the http server
const io=socketIo(server)

app.use(express.static("public"))  // folder where index.html contains

const users=new Set()

io.on("connection",(socket)=>{
    console.log(`A user is now connected`)

    // Data received from client
    // (i) when the user emit  from client, the server socket is on i.e. socket.on()
    // handle users when they will join the chat
    socket.on("join", (userName) => {
    users.add(userName)
    socket.userName=userName

    
    // Data sent by server
    // (ii) inform to all client/users(index.html) that a new user has joined in the chat, 
    io.emit("userJoined",userName)

    
    // Data sent by server
    // (iii) inform to clients(index.html) that how many online people are there
    // send the updated userList to all client 
    io.emit("userList",Array.from(users))
    })


    // Data received from client
    // (iv) handle incoming chat message
    socket.on("chatMessage",(message) => {
        // Data sent by server
        // (v) inform to all users that someone has messaged
        io.emit('chatMessage',message)
    })
    

    // Data sent by server
    // (vi) handle user disconnection
    socket.on("disconnect",()=>{
        console.log(`An user is disconnected`)

        users.forEach(user => {
            if(user === socket.userName){
                users.delete(user)

                io.emit('userLeft',user)

                // updating the online status
                io.emit('userList',Array.from(users))
            }
        })
    })
})

const PORT=3000
server.listen(PORT,()=>{
    console.log(`Server runs on ${PORT}`)
})