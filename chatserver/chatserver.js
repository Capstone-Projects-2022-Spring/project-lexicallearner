require('dotenv').config()

const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const PORT = process.env.PORT || 8000
const { Server } = require('socket.io')

app.use(cors())

const io = new Server(http, {
  cors: {
    origin: process.env.SOCKET_CHATSERVER,
    mthods: ['GET','POST'],
  }
})

io.on('connection', (socket) => {
  console.log('user joined: '+socket.id);

  //join room 
  socket.on('join room', (data) => {
    socket.join(data)
    console.log(`User ${socket.id} joined room ${data}`)
  })

  //receive message from 'send message'
  socket.on("send_message", (data) => {
    console.log(`msg '${data.msg}' received from ${data.from}, room ${data.room}`)
    socket.to(data.room).emit("received_message", data)
  })

  socket.on('disconnect', () => {
    console.log('user left '+socket.id)
  })
})

app.get('/', (req, res) => {
  res.send('Server is up and running')
})

http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})
