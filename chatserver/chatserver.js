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
  res.send('Server is up and running')
})

app.get('/hello', (req, res) => {
  res.send('hello')
})


http.listen(PORT, () => {
  console.log(`Listening to ${PORT}`)
})
