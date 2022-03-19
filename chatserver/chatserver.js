const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT || 8000
const { Server } = require('socket.io')

app.use(cors())

const io = new Server(http, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    mthods: ['GET','POST'],
  }
})

io.on('connection', (socket) => {
  console.log('user joined: '+socket.id);

  socket.on('join room', (data) => {
    socket.join(data)
    console.log(`User ${socket.id} joined room ${data}`)
  })

  socket.on("send_message", (data) => {
    console.log(`msg '${data.msg}' received from ${data.from}, room ${data.room}`)
    socket.to(data.room).emit("received_message", data)
    console.log(`sent msg '${data.msg}' from ${data.from} to room ${data.room}`);
  })

  socket.on('disconnect', () => {
    console.log('user left '+socket.id)
  })
})

app.get('/', (req, res) => {
  res.send('Server is up and running + cors origin = '+process.env.CORS_ORIGIN)
})

app.get('/hello', (req, res) => {
  res.send('hello')
})


http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})
