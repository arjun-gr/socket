const express = require('express')
const {Server} = require('socket.io')
const {createServer} = require("http")
const path = require('path')

const app = express();
const server = createServer(app)
const io = new Server(server, {
    connectionStateRecovery:{}
});

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
})

io.on('connection', (socket)=>{
    console.log("a user connected");

    socket.on('chat message', (data)=>{
        io.emit('chat message', {username:data.username, message:data.message})
    })
    socket.on('disconnect',()=>{
        console.log('user disconnected')
    })

    
})

server.listen(3500, ()=>{
    console.log("server started at 3500")
})