const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const PORT = process.env.PORT || 8000
const { Server } = require('socket.io')

app.use(cors())

const io = new Server(http, {
  cors: {
    origin: 'http://localhost:3000',
    mthods: ['GET','POST'],
  }
})

io.on('connection', (socket) => {
  console.log('user joined: '+socket.id);

  socket.on('join_room', (data) => {
    socket.join(data)
    console.log(`User ${socket.id} joined room ${data}`)
  })

  socket.on("send_message", (data) => {
    console.log(`data received ${data}`)
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
