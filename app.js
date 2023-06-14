const express = require ('express')
const path = require ('path')
const app = express()

app.use(express.static(path.join(__dirname, 'cliente')));

const http = require('http')
const server = http.createServer(app)

const {Server} = require('socket.io')
const io = new Server(server)
io.on('connection', (socket)=>{
    // console.log('Un usuario se ha conectado')
    
    socket.on('chat', (msg)=>{
        io.emit('chat', msg)
    })
})
   
app.get('/', (req,res)=>{
    // res.send('<h1>Aplicación Chat</h1>')
    // console.log(__dirname)
    res.sendFile(`${__dirname}/cliente/index.html`)
})

server.listen(3000, ()=>{
    console.log('servidor corriendo en http://localhost:3000')
})